const http= require('http');

const server  = http.createServer((req,res)=>{
    if(req.url==='/poll'){
        setTimeout(() => {
            res.writeHead(200,{contentType:'application/json'});
            res.end(JSON.stringify({message: `hello at ${new Date().toISOString()}`}));
        }, 3000);
    }else{
        res.writeHead(200);
        res.end(JSON.stringify({message:'Welcome to long polling server'}));
    }
})

server.listen(8080,()=>{
    console.log('Server is running on port 3000');
})