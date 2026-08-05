const mongoose=require('mongoose');
const { isNumberObject } = require('node:util/types');
const cricSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Cricketer need a name'],
        trim:true
    }, tests:{
        type:Number,
        required:[true,'Give the number of test matches']
    },
    runs:{
        type:Number
    },
    batAvg:{
        type:Number
    }, 
    highestScore:{
        type:Number
    },
    wickets:{
        type:Number
    },
    bowlAvg:{
        type:Number
    },
    country:{
        type:String
    }
})
module.exports=mongoose.model('cricket',cricSchema);