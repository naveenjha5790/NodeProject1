const {auth}=require('../middleware/authentication');
const {
    getAllReservation,
    createReservation,
    deleteReservation
}=require('../controllers/reservation');
const express=require('express');
const router=express.Router();
router.route('/:resourceId').get(auth,getAllReservation).post(auth,createReservation);
router.route('/:id').delete(auth,deleteReservation);
module.exports=router;
