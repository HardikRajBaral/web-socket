const WebSocket= require('ws'); 


const server =new WebSocket.Server({port:8080});


server.on("connection",(socket)=>{
    console.log("Client connected");
    socket.send('Welcome to the WebSocket server'); 

    socket.on("message",(msg)=>{
        console.log(`Received message from client: ${msg}`)
    })
    socket.send('Message received by the server');
})

console.log("WebSocket server is running on port 8080"); 