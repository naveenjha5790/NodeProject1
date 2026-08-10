const Resource=require('../models/Resource');
const getAllResources=async (req,res)=>{
    //res.send("All Jobs");
    const resource=await Resource.find({}).sort('-createdAt')
    res.status(200).json({resource,count:resource.length});
}
const getResource=async (req,res)=>{
    //res.send("Get user resource")
    const {
        user:{userId},
        params:{id:resourceId}}=req
    const resource=await Resource.findOne({_id:resourceId,
        createdBy:userId
    })
    if (!resource){
        return res.status(402).json({msg:"No resource exist with the Id you gave"})
    }
    res.status(200).json({resource})
}
const createResource=async (req,res)=>{
    req.body.createdBy=req.user.userId;
    const resource=await Resource.create(req.body);
    res.status(200).json({resource})
}
const deleteResource=async (req,res)=>{
    const {
        user:{userId},
        params:{id:resourceId}}=req
    const resource=await Resource.findOneAndDelete({_id:resourceId,
        createdBy:userId
    })
    if (!resource){
        return res.status(404).json({msg:"No job found"});
    }
    res.status(200).send("Successfully deleted");
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
            _id:resourceId,
            createdBy:userId},
            req.body,
            {
                new:true,
                runValidators:true
        })
        if (!resource){
            return res.status(402).send("No job found to update")
        }
        res.status(200).json({resource})
    }

module.exports={
    getAllResources,
    getResource,
    createResource,
    deleteResource,
    updateResource
}
