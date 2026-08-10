const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide your name"],
        minlength:4,
        maxlength:50
    },
    email:{
        type:String,
        required:[true,"Please provide your email ID"],
        match:[
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
        minlength:8,
    },
    role:{
        type:String,
        enum:{
            values:['User','Admin'],
            message:'{VALUE} is not suitable'
        },
        default:'User'
    }
})
userSchema.pre('save',async function(){
    if (!this.isModified('password')) return;

    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);

})
userSchema.methods.createJWT=function(){
    return jwt.sign(
        {
            userId:this._id,
            name:this.name,
        role:this.role},
            process.env.JWT_SECRET,
            {
                expiresIn:process.env.JWT_LIFELINE,
            });
        }
userSchema.methods.comparePassword=async function(userPassword){
    const isMatch=await bcrypt.compare(userPassword,this.password);
    return isMatch;
}       
module.exports=mongoose.model('User',userSchema);