
const cors = require('cors');
const http = require('http');

const server = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('Server is running\n');
})

const io = require('socket.io')(server,{
    cors: {
        origin: ['http://localhost:3000', 'docapp.onrender.com'],
        methods:['GET','POST'],
    },
});

io.on("connection",socket=>{
    console.log('connected');
    socket.on("send-changes",delta=>{
        socket.broadcast.emit("recieve-changes",delta);
    });
});

server.listen(5001,()=>{
    console.log('server started on 5001');
})

