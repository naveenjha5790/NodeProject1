const mongoose=require('mongoose');
const resourceSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide the resource name"],
        maxlength:[100,"Name can't have more than 100 words"]
    },
    resourceType:{
        type:String,
        enum:{
            values:['Room',"Hall","Slots","Equipment"],
            message:'{VALUE} is not suitable'
        }
    },
    capacity:{
        type:Number,
        required:[true,"Please provide the capacity"],
        min:[1,"Atleast having 1 capacity is necessary"]
    },
    location:{
        type:String,
        trim:true,
        required:function(){
            return this.type==='Room' || this.type==='Hall'
        }
    },
    pricePerUnit:{
        type:Number,
        default:0,
        min:[0,"Price can't be nagative"]
    },
    pricingType:{
        type:String,
        enum:['Hourly','Daily','Fixed'],
        default:'Hourly'
    },
    isActive:{
        type:Boolean,
        default:true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
    }},
    {timestamps:true

});
module.exports=mongoose.model('Resource',resourceSchema);