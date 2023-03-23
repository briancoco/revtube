const jwt = require('jsonwebtoken');

const userMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return next();
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if(!payload) {
        return next();
    }

    req.user = payload;
    next();
}

module.exports = userMiddleware;