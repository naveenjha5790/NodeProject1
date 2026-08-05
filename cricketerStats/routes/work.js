const express=require('express');
const router=express.Router();
const {cricAll,cricAllq,removeCricketer,updateCricketer,addCricketers}=require('../controller/work');
router.route('/').get(cricAll).post(addCricketers);
router.route('/cric').get(cricAllq).patch(updateCricketer).delete(removeCricketer);
module.exports=router;
