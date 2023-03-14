const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');
const statusCodes = require('http-status-codes');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        throw new CustomAPIError('Please provide token', statusCodes.BAD_REQUEST);
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if(!payload) {
        throw new CustomAPIError('Invalid token', statusCodes.UNAUTHORIZED);
    }

    req.user = payload;
    next();
}

module.exports = authMiddleware;