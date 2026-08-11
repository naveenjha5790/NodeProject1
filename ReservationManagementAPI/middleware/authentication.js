const User=require('../models/User');
const jwt=require('jsonwebtoken');
const {Unauthenticatederror}=require('../errors');

const auth=async (req,res,next)=>{
    const authHeader=req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        throw new Unauthenticatederror("Autnentication Invalid");
    }
    const token=authHeader.split(' ')[1];
    try {
        const payload=jwt.verify(token,process.env.JWT_SECRET);
        req.user={
            userId:payload.userId,
            name:payload.name,
            role:payload.role
        };
        next();
    }
    catch(error){
        throw new Unauthenticatederror("Authentication Invalid");

    }
}
const authorizeRoles=(...allowedRoles)=>{
    return (req,res,next)=>{
        if (!req.user || !allowedRoles.includes(req.user.role)){
            return res.status(403).json({msg:"Unauthorized, You don't have permission to access"})
        }
            next();
    }
}
module.exports={auth,authorizeRoles};