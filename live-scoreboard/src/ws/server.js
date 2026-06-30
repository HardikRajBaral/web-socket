import {WebSocket, WebSocketServer} from 'ws'
import {wsArcjet} from "../arcjet.js";

const matchSubscribers= new Map();

function subscribe(matchId,socket){
    if(!matchSubscribers.has(matchId)){
        matchSubscribers.set(matchId,new Set())
    }
    matchSubscribers.get(matchId).add(socket);
}

function unsubscribe(matchId,socket){
    const subscribers = matchSubscribers.get(matchId)
    if(!subscribers) return
    subscribers.delete(socket)
    if(subscribers.size===0){
        matchSubscribers.delete(matchId)
    }
}


function cleanupSubscribers(socket){
    for(const matchId of socket.subscriptions){
        unsubscribe(matchId,socket);
    }
}

function sendJson(socket,payload){
    if(socket.readyState !== WebSocket.OPEN) return;
    socket.send(JSON.stringify(payload))
}

function broadcastToAll(wss,payload){
    for(const client of wss.clients){
        if(client.readyState !== WebSocket.OPEN) continue
        client.send(JSON.stringify(payload))
    }
}
function broadcastToMatch( matchId,payload){
    const subscribers= matchSubscribers.get(matchId)
    if(!subscribers || subscribers.size===0) return
    const messages= JSON.stringify(payload)
    for(const client of  subscribers){
        if(client.readyState===WebSocket.OPEN){
            client.send(messages)
        }
    }
}

function handleMessages(socket,data){
    let messages
    try{
        messages= JSON.parse(data.toString())
    }catch {
        sendJson(socket,{
            type:"error",
        messages:"Invalid Json"
        })
    }
    if(messages?.type==="subscribe" && Number.isInteger(messages.matchId)){
        subscribe(messages.matchId,socket)
        socket.subscriptions.add(messages.matchId)
        sendJson(socket,{type:'subscribe',matchId:messages.matchId})
        return
    }
    if(messages?.type==="unsubscribe" && Number.isInteger(messages.matchId)){
        unsubscribe(messages.matchId,socket)
        socket.subscriptions.delete(messages.matchId)
        sendJson(socket,{type:'unsubscribe',matchId:messages.matchId})
    }
}

export function  attachWebSocketServer(server){

    const wss = new  WebSocketServer({
        noServer:true,
        path:'/ws',
        maxPayload: 1024*1024
    })

    server.on('upgrade',async (req,socket,head)=>{
        const {pathname}=new URL(req.url,`http://${req.headers.host}`);
        if(pathname !== '/ws') {
            return
        }
        if(wsArcjet){
            try {
                const decision = await wsArcjet.protect(req);
                if(decision.isDenied()){
                    if(decision.reason.isRateLimit()){
                        socket.write('HTTP/1.1 429 Too many request\r\n\r\n')
                    }else{
                        socket.write('HTTP/1.1 403 Forbidden\r\n\r\n')
                    }
                    socket.destroy();
                    return;
                }
            }catch(err){
                console.log('WS upgrade error', err)
                socket.write('HTTP/1.1 500 internal server error')
                socket.destroy();
                return
            }
        }
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit('connection', ws, req);
        });
    })

    wss.on('connection',async(socket )=>{
        socket.isAlive = true
        socket.on('pong',()=>{
            socket.isAlive= true
        })
        socket.subscriptions= new Set()
        sendJson(socket,{type:'welcome'})
        socket.on("message",(data)=>{
            handleMessages(socket,data)
        })
        socket.on("error",()=>{
            socket.terminate()
        })

        socket.on("close",()=>{
            cleanupSubscribers(socket)
        })
        socket.on('error',(err)=>{
            console.log(err)
        })
    })
    const interval= setInterval(()=>{
        wss.clients.forEach((ws)=>{
            if(ws.isAlive===false) return ws.terminate()
            ws.isAlive= false
            ws.ping()

        })
    },30000)

    wss.on('close',()=>clearInterval(interval));
    function broadCastMatchCreated(match){
        broadcastToAll(wss,{type:'match_created',data:match})
    }
    function broadcastCommentary(matchId,comment){
        broadcastToMatch( matchId, {type:'commentary',data:comment})
    }
    return {broadCastMatchCreated,broadcastCommentary }
}