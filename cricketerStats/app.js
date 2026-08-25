globalThis.crypto = require('crypto');
require('dotenv').config();
const express=require('express');
const cors=require('cors');
const work=require('./routes/work');
const notFound=require('./middleware/notFound');
const app=express();
const connectDB=require('./db/connect');
const port=process.env.PORT || 5000
app.use(cors());
app.use(express.json())
app.use('/',work);
app.use('/api/cricket',work);
app.use(notFound);
//app.listen(5000,console.log("Somehow its running"));
const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log('Somehow its still running'));
    }catch (err){
        console.log(err);
    }

}
start();

