const statusCodes = require('http-status-codes');


const notFoundMiddleware = (req, res) => {
    res.status(statusCodes.NOT_FOUND).send('route does not exist');
}

module.exports = notFoundMiddleware;