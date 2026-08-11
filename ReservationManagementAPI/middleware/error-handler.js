const {CustomAPIError}=require('../errors');
const {StatusCodes,INTERNAL_SERVER_ERROR}=require('http-status-codes');
const errorhandlerMiddleware=(err,req,res,next)=>{
    let customError={
        statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        errors:err.errors||{general:err.message|| "Something went wrong try again later"
    }
    }
    if (err.name==='Validationerror'){
        const errorPairs={};
        Object.keys(err.errors).forEach((field)=>{
            errorPairs[field]=err.errors[field].message;
        });
        customError.errors=errorPairs;
        customError.statusCode=StatusCodes.BAD_REQUEST;
    }
    if (err.code && err.code===11000){
        customError.errors={[fieldName]:`${fieldName} already exists`};
        customError.statusCode=StatusCodes.BAD_REQUEST;
    }
    if (err.name==='castError'){
        customError.errors={[err.path]:`Invalid format for id: ${err.value}`};
        customError.statusCode=StatusCodes.NOT_FOUND;
    }
    return res.status(customError.statusCode).json({errors:customError.errors})
}   
module.exports=errorhandlerMiddleware;