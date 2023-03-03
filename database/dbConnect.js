const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.set('strictQuery', false);
    return mongoose.connect(process.env.MONGO_URI, {

    });
}

module.exports = connectDB;