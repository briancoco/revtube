const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Please provide comment content'],
        maxlength: [500, 'Comment content cannot be more than 500 characters'],
        minlength: [1, 'Comment content cannot be less than 1 character']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },
    video: {
        type: mongoose.Types.ObjectId,
        ref: 'videos',
        required: true
    }
});

module.exports = mongoose.model('comments', CommentSchema);