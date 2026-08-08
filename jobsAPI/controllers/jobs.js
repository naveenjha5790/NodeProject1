const Job=require('../models/Job');
const {BadRequestError,NotFoundError}=require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllJobs= async (req ,res)=>{
   const jobs=await Job.find({createdBy:req.user.userId}).sort('createdAt');
   res.status(StatusCodes.OK).json({jobs,count:jobs.length});
}
const getJob= async (req ,res)=>{
    const {
        user:{userId},
        params:{id:jobId}}=
        req;
    const job = await Job.findOne({
        _id:jobId,createdBy:userId})
    
    if (!job){
        throw new NotFoundError(`No job with given id exists`)
    }
    res.status(StatusCodes.OK).json({job})
}
const createJob= async (req ,res)=>{
    req.body.createdBy=req.user.userId;
    const job=await Job.create(req.body);
    
    res.status(StatusCodes.CREATED).json({job})

}
const deleteJob= async (req ,res)=>{
    const {
        user:{userId},
        params:{id:jobId}}=
        req;
        const job=await Job.findOneAndRemove({_id:jobId,
            createdBy:userId
        })
        if (!job){
    throw new NotFoundError("No job found to delete")
   }
   res.status(StatusCodes.OK).send();
}
const updateJob= async (req ,res)=>{
    const {
        body:{company,position},
        user:{userId},
        params:{id:jobId}}=
        req;
        if (company===' ' || position===''){
            throw new BadRequestError('Company and position can not be empty');

    }
    const job=await Job.findOneAndUpdate({
        _id:jobId,
        createdBy:userId},
        req.body,
        {new:true,runValidators:true})
   if (!job){
    throw new NotFoundError("No job found to update")
   }
   res.status(StatusCodes.OK).json({job})
}
module.exports={
    getAllJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob,
}