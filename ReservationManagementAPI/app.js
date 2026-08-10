require('dotenv').config()
const auth1=require('./routes/auth');
const resource=require('./routes/resource');
const reservation=require('./routes/reservation');
const {auth,authorizeRoles}=require('./middleware/authentication');
const express=require('express');
const app=express();
if (!globalThis.crypto) {
  globalThis.crypto = require('node:crypto').webcrypto;
}
app.use(express.json())
const connectDB=require('./db/connect');

const port=process.env.PORT ||5000;
app.get('/',(req,res)=>{
    res.send("reservation management API is running");
})
app.use('/api/v1/auth',auth1);
app.use('/api/v1/resource',resource)
app.use('/api/v1/reservation',reservation)
const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URL);
        app.listen(port,()=>{
            console.log(`The server is running successfully on port ${port}`)
        })
    }
    catch (err){
        console.log(err)
    }
}
start();