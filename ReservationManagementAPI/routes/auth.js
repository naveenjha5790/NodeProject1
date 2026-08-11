const {register,login,profile}=require('../controllers/auth');
const {auth}=require('../middleware/authentication');
const express=require('express');
const router=express.Router();
router.post('/register',register);
router.post('/login',login);
router.route('/profile').get(auth,profile);
module.exports=router;