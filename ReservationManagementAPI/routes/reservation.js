const { auth, authorizeRoles } = require('../middleware/authentication');
const {
    getAllReservation,
    createReservation,
    deleteReservation,
    approveReservationRequest
} = require('../controllers/reservation');
const express = require('express');
const router = express.Router();

router.route('/').get(auth, getAllReservation);

router.route('/:resourceId').post(auth, authorizeRoles('User', 'Admin'), createReservation);
router.route('/:id/approve').patch(auth, authorizeRoles('Admin'), approveReservationRequest);
router.route('/:id').delete(auth, deleteReservation);

module.exports = router;
