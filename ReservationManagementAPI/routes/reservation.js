const {auth, authorizeRoles}=require('../middleware/authentication');
const {
    getAllReservation,
    createReservation,
    deleteReservation
}=require('../controllers/reservation');
const express=require('express');
const router=express.Router();
router.route('/').get(auth,getAllReservation);
router.route('/:resourceId').post(auth,authorizeRoles('User'),createReservation);
router.route('/:id').delete(auth,deleteReservation);
module.exports=router;
