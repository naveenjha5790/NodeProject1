const express=require("express");
const app=express();
const path=require("path");
const http=require("http");
const server=http.createServer(app);
const {Server}=require("socket.io");
const io=new Server(server);
port=process.env.PORT ||5000;
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
});
io.on('connection',(socket)=>{
    console.log("A user connected");
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    });
    socket.on('chat-message',(msg)=>{
        console.log('message',+msg);
        io.emit("chat-message",msg);
    })
});
const start=async ()=>{
    try{
        server.listen(port,()=>{
            console.log(`The server is running on port ${port}`);
        })
    }catch(err){
            console.log(err);
        }
    
}
start();
