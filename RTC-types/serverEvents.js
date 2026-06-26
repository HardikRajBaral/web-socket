const http = require('http')

const server = http.createServer((req,res)=>{
    if(req.url==='/events'){
        res.writeHead(200,{
            'Content-Type':'text/event-stream',
            'Cache-Control':'no-cache',
            'Connection':'keep-alive'
        })

        const interval= setInterval(()=>{
            res.write(`data: ${JSON.stringify({message:`hello at ${new Date().toISOString()}`})}\n\n`)
        }, 2000)
        req.on('close',()=>{
            clearInterval(interval)
            res.end(JSON.stringify({message:'Connection closed'}))
        })
    }else{
        res.writeHead(200)
        res.end(JSON.stringify({message:'Welcome to server-sent events server'}))
    }
})
server.listen(8080,()=>{
    console.log('Server is running on port 8080')
})