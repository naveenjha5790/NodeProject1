const {auth,authorizeRoles}=require('../middleware/authentication');
const {getAllResources 
    ,getResource
    ,createResource,
deleteResource,
updateResource}=require('../controllers/resource');
const express=require('express');
const router=express.Router();
router.route('/').get(auth,authorizeRoles('Admin'),getAllResources);
router.route('/').post(auth,authorizeRoles('Admin'),createResource);
router.route('/:id').get(auth,authorizeRoles('Admin'),getResource).delete(auth,authorizeRoles('Admin'),deleteResource).patch(auth,authorizeRoles('Admin'),updateResource);
module.exports=router;

