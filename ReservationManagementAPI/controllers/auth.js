const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs')
const register=async (req,res)=>{
    const user=await User.create({...req.body});
    const token=user.createJWT();
    res.status(200).json({user:{name:user.name},token});
}
const login=async (req,res)=>{
    const {email,password}=req.body;
    if (!email || !password){
        return res.status(400).json({msg:"Give email and password"})
    }
    const user=await User.findOne({email});
    if (!user){
        return res.status(404).json({msg:"Invalid User"})
    }
    const isPasswordCorrect=await user.comparePassword(password);
    if (!isPasswordCorrect){
        return res.status(402).json({msg:"Invalid Password"})
    }
    const token=user.createJWT();
    res.status(200).json({user:{name:user.name},token})
}
//const viewProfile=async 
module.exports={
    register,
    login
}