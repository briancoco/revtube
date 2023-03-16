const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide video name']
    },
    description: {
        type: String,
        required: [true, 'Please provide video description']
    },
    fileName: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String, 
        default: '/images/default.png'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'comments'
    }]
}, {timestamps:true});

module.exports = mongoose.model('videos', VideoSchema);