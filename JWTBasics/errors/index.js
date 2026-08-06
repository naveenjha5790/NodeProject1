
const CustomAPIError=require('./custom-error')
const badRequests=require('./bad-request');
const unauthenticated=require('./unauthenticated');



module.exports ={
    unauthenticated,
    CustomAPIError,
    badRequests,};
