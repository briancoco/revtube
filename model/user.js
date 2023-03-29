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
    },
    watched: [{
        type: mongoose.Types.ObjectId,
        ref: 'videos'
    }]
})

UserSchema.pre('save', async function  () {
    //everytime we modify our userSchema, it will rehash our password :(
    //hash and salt password
    if (!this.isModified('password')) return;
    const salt = await bcryptjs.genSalt();
    this.password = await bcryptjs.hash(this.password, salt);

})

UserSchema.methods.comparePassword = async function (pass) {
    const validPassword = await bcryptjs.compare(pass, this.password);
    return validPassword
}

module.exports = mongoose.model('users', UserSchema);