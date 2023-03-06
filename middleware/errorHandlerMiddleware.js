const statusCodes = require('http-status-codes');
const CustomAPIError = require('../errors/custom-error');
const errorHandlerMiddleware = (err, req, res, next) => {
    //when an error is thrown in any of our controllers
    //call execution goes to this middleware function thru the
    //express-async-errors package

    //here we send back a proper error response
    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({
            msg: err.message
        });
    }

    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        msg: err.message
    });
}

module.exports = errorHandlerMiddleware;