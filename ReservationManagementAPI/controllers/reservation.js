const { StatusCodes } = require('http-status-codes');
const mongoose=require('mongoose')
const Reservation=require('../models/reservation');
const { BadRequestError, notFoundError } = require('../errors');
const Resource = require('../models/Resource');
const notFound = require('../middleware/not-found');



const getAllReservation=async (req,res)=>{
  const {userId,role}=req.user;
    let query={};
    if (role.toLowerCase() !== 'admin') {
        query.userId=new mongoose.Types.ObjectId(userId);
    }
    const reservation=await Reservation.find(query)
    .sort('-createdAt')
    .populate('resourceId','name resourceType location');
    res.status(StatusCodes.OK).json({
        role,
        count:reservation.length,
        reservation
    });
};
const createReservation= async (req,res)=>{
    //req.body.userId=req.user.userId;
    const {resourceId}=req.params;
    req.body.userId = new mongoose.Types.ObjectId(req.user.userId);
        req.body.resourceId = new mongoose.Types.ObjectId(resourceId); 
    const exists=await Resource.findById(resourceId);
    if (!exists){
        throw new notFoundError("The resource with given id doesn't exist");
    }
    const {startTime,endTime}=req.body;
    const overlap= await Reservation.findOne({
        resourceId,
        status:{$ne:'Cancelled'},
        $or:[
            {startTime:{$gte:new Date(startTime),
                $lt:new Date(endTime)
            }},
        {endTime:{$gt: new Date(startTime), $lte:new Date(endTime)}}  ,
        {startTime:{$lte:new Date(startTime)},endTime:{$gte:new Date(endTime)}}
        ]
    });
    if (overlap){
        throw new BadRequestError("The start time must be before end time")
    }

    const reservation=await Reservation.create(req.body);
    res.status(StatusCodes.CREATED).json({reservation});
};
const deleteReservation=async (req,res)=>{
    const {
        user:{userId,role},
        params:{id:reservationId}}=req;
        let query={_id:reservationId};
        if (role!='Admin'){
            query.userId=userId
        }
        const reservation=await Reservation.findOneAndDelete(query);


    if (!reservation ){
        throw new BadRequestError("Reservations with the given Id doesn't exist");
    }
    res.status(StatusCodes.OK).json({msg:`Reservation successfully deleted by ${role}`,reservation});
}
const approveReservationRequest = async (req, res) => {
    try {
        const { id } = req.params;

        // Locate target document asset and change status to confirmed
        const updatedReservation = await Reservation.findByIdAndUpdate(
            id,
            { status: "Confirmed" },
            { new: true } 
        );

        if (!updatedReservation) {
            return res.status(404).json({ message: "Reservation entry target not found" });
        }

        res.status(200).json({ msg: "Reservation successfully confirmed by Admin", updatedReservation });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};

module.exports={
    getAllReservation,
    createReservation,
    deleteReservation,
    approveReservationRequest
}
