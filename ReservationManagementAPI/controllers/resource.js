const Resource=require('../models/Resource');
const {BadRequestError,notFoundError,Unauthenticatederror}=require('../errors');
const {StatusCodes}=require('http-status-codes');
const getAllResources=async (req,res)=>{
    const resource=await Resource.find({}).sort('-createdAt')
    res.status(StatusCodes.OK).json({resource,count:resource.length});
}
const getResource=async (req,res)=>{
    const {
        params: { id: resourceId }
    } = req;

    const resource=await Resource.findOne({_id:resourceId})
    if (!resource){
        throw new notFoundError("Resource with the id doesn't exist");
    }
    res.status(StatusCodes.OK).json({resource})
}
const createResource=async (req,res)=>{
    req.body.createdBy=req.user.userId;
    const resource=await Resource.create(req.body);
    res.status(StatusCodes.CREATED).json({resource})
}
const deleteResource=async (req,res)=>{
    const {
     //   user:{userId},
        params:{id:resourceId}}=req
    const resource=await Resource.findOneAndDelete({_id:resourceId,
    
    })
    if (!resource){
        throw new notFoundError("Resource not found");
    }
    res.status(StatusCodes.OK).send("Successfully deleted");
}
const updateResource=async (req,res)=>{
    const {
        body:{name,resourceType,capacity,location,pricePerUnit,pricingType,isActive,createdBy},
        user:{userId},
        params:{id:resourceId}}=req
        if (name=== '' || resourceType===''){
            return res.status(404).send("Name and type shouldn't be empty");
        }
        const resource=await Resource.findOneAndUpdate({
            _id:resourceId},
            {name, resourceType, capacity, location, pricePerUnit, pricingType, isActive},
            req.body,
            {
                new:true,
                runValidators:true
        })
        if (!resource){
            throw new notFoundError("Resource doesn't exist");
        }
        res.status(StatusCodes.CREATED).json({resource})
    }

module.exports={
    getAllResources,
    getResource,
    createResource,
    deleteResource,
    updateResource
}
