const CustomAPIError=require('./custom-api');
const BadRequestError=require('./bad-request');
const notFoundError=require('./notFound');
const Unauthenticatederror=require('./unauthenticated');

module.exports={
    CustomAPIError,
    BadRequestError,
    Unauthenticatederror,
    notFoundError
};