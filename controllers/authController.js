const User = require('../model/user');
const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');
const statusCodes = require('http-status-codes');

const register = async (req, res) => {
    //take the user registration info from the request body
    //and create a new user document on DB
    //we then want to create a JWT for this user 
    //and attach the token to a cookie, and send back a good response
    
    const user = await User.create(req.body);

    //create JWT
    const payload = {userId: user._id, username: user.username};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    //attach token to cookie
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        expires: new Date(Date.now() + oneDay)
    });

    res.status(statusCodes.CREATED).json({msg: 'User registered successfully'});

}

const login = async (req, res) => {
    //get email and password from req.body
    //make sure both are passed in
    //then perform query on users collection with the passed in email
    //if user does not exist, throw error
    //otherwise compare password
    //then create token and return

    const {email, password} = req.body;

    if(!email || !password) {
        throw new CustomAPIError('Please provide email and password', statusCodes.BAD_REQUEST);
    }

    const user = await User.findOne({email});
    if(!user) {
        throw new CustomAPIError('Invalid credentials', statusCodes.BAD_REQUEST);
    }

    const isValidPassword = await user.comparePassword(password);
    if(!isValidPassword) {
        throw new CustomAPIError('Invalid credentials(pass)', statusCodes.BAD_REQUEST);
    }

    //create JWT
    const payload = {userId: user._id, username: user.username};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    //attach token to cookie
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        expires: new Date(Date.now() + oneDay)
    });

    res.status(statusCodes.OK).json({msg: 'User logged in successfully'});

}

module.exports = {
    register,
    login
}