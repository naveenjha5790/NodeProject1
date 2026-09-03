const mongoose=require('mongoose');

const reservationScehema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,'please provide user id']
    },
    resourceId:{
        type:mongoose.Schema.ObjectId,
        ref:'Resource',
        required:[true,"A valid resourceId link path is mandatory to place reservations"]
    },
    startTime:{
        type:Date,
        required:[true,"Please give the startTime"],
        validate:{
            validator:function (value){
                return value >= new Date()
            },
            message:"Start time can't be in past"
        }
    },
    endTime:{
        type:Date,
        require:[true,"Please provide the end time"],
        validate:{
            validator:function (value){
                return value>this.startTime;
            },
            message:"End time must be after start time"
        }
    },
    status:{
        type:String,
        enum:{
            values:["Confirmed","Cancelled","Pending","Admin Request Pending"],
            message:'{VALUE} is not a valid input for this'
        },
        default:'Confirmed'
    }
,
    notes:{
        type: String,
        trim: true,
        default: ""
    },
},
{
    timestamps:true
})
module.exports=mongoose.model('Reservations',reservationScehema);