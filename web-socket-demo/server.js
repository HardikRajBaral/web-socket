import {WebSocketServer,WebSocket} from 'ws';

const wss = new WebSocketServer({ port: 8080 }); // creates it own http server for handshake and only listens for handshake request on port 8080

//Connection event

wss.on('connection',(socket,req)=>{
    const ip= req.socket.remoteAddress //get client ip address

    //Message event
    socket.on('message',(rawData)=>{ 
        const messages = rawData.toString() //convert buffer to string
        console.log({rawData:rawData})

    wss.clients.forEach((client)=>{
         if(client.readyState === WebSocket.OPEN){ //check if client is connected){
            client.send(`server BoradCast: ${messages}`) //send message to all clients 
         }
    })
    })

    socket.on('error',(err)=>{
        console.error(`Error --> ${err.message} : ${ip}`)
    })
    
    socket.on('close',()=>{
        console.log(`client disconnected`)
    }) 
})

console.log(`WebSocket server is running on ws://localhost:8080`)