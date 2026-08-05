globalThis.crypto = require('crypto');
require('dotenv').config()
const connectDB=require('./db/connect');
const work=require('./model/work');
const jsonCric=require('./cricketer.json');
const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        const uploadPromises=jsonCric.map((item)=>{
            work.findOneAndUpdate(
                { name: item.name }, 
                { $setOnInsert: item }, 
                   {upsert: true,     
                    new: true 
                }
            )
        });
        await Promise.all(uploadPromises);

        console.log('Database synced! Only new items were added.');
        process.exit(0);
    }
    catch (error){
        console.log(error);
        process.exit(1);
    }
}
start();