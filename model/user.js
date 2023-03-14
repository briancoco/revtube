const mongoose = require('mongoose');
const valid = require('validator');
const bcryptjs = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide username'],
        validate: {
            validator: valid.isAlphanumeric,
            message: 'Please provide alphanumeric username'
        },
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        validate: {
            validator: valid.isEmail,
            message: 'Please provide valid email address'
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 8
    },
    pfp: {
        type: String,
        default: '/images/defaultpfp.png'
    }
})

UserSchema.pre('save', async function  () {
    //hash and salt password
    const salt = await bcryptjs.genSalt();
    this.password = await bcryptjs.hash(this.password, salt);

})

UserSchema.methods.comparePassword = async function (pass) {
    return bcryptjs.compare(pass, this.password);
}

module.exports = mongoose.model('users', UserSchema);