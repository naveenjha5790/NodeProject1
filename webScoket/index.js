const http=require("http");
const express=require("express");
const app=express();
const path=require("path");
const {Server}=require("socket.io")
const server=http.createServer(app);
const io=new Server(server);
io.on('connection',(socket)=>{
    socket.on('messages',(message)=>{
        io.emit("messages",message);
    console.log("A new user message",message);})
})
app.use(express.static(path.resolve("./public")));
/*app.get('/',(req,res)=>{
    res.send("This is me");
})*/
server.listen(9000,()=>{
    console.log("Server started ");
})