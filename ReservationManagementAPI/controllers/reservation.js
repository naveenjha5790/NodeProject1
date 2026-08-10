const Reservation=require('../models/reservation');



const getAllReservation=async (req,res)=>{
    const {userId}=req.user;
    const reservation=await Reservation.find({userId});
    res.status(200).json({reservation,cont:reservation.length})
};
const createReservation= async (req,res)=>{
    req.body.userId=req.user.userId;
    req.body.resourceId=req.params.resourceId;
    const reservation=await Reservation.create(req.body);
    res.status(200).json({reservation});
};
const deleteReservation=async (req,res)=>{
    const {
        user:{userId},
        params:{id:reservationId}}=req;
        const reservation=await Reservation.findOneAndDelete({_id:reservationId,
            userId})

    if (!reservation){
        return res.status(404).json({msg:"Reservation with the id doesn't exist"});
    }
    res.status(200).json({reservation});
}
module.exports={
    getAllReservation,
    createReservation,
    deleteReservation
}
