const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const {BadRequestError,Unauthenticatederror}=require('../errors');
const {StatusCodes}=require('http-status-codes')
const register=async (req,res)=>{
    const user=await User.create({...req.body});
    const token=user.createJWT();
    res.status(StatusCodes.CREATED).json({user:{name:user.name},token});
}
const login=async (req,res)=>{
    const {email,password}=req.body;
    if (!email || !password){
        throw new BadRequestError("Please provide email and password")
    }
    const user=await User.findOne({email});
    if (!user){
        throw new Unauthenticatederror("Invalid unauthentication");
    }
    const isPasswordCorrect=await user.comparePassword(password);
    if (!isPasswordCorrect){
        throw new Unauthenticatederror("Wrong password, please try again");
    }
    const token=user.createJWT();
    res.status(StatusCodes.OK).json({user:{name:user.name},token})
};
const profile=async (req,res)=>{
    const myProfile=await User.findById(req.user.userId).select('-password');
    if (!myProfile){
        throw new Unauthenticatederror("Please login first");
    };
    res.status(StatusCodes.OK).json({myProfile})
}
module.exports={
    register,
    login,
    profile
}