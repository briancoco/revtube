const statusCodes = require('http-status-codes');
const CustomAPIError = require('../errors/custom-error');
const Comment = require('../model/comment');

const createComment = async (req, res) => {
    //takes the req.body and creates a comment document using it
    //attaches the userId to the req.body
    req.body.createdBy = req.user.userId;
    const comment = await Comment.create(req.body);

    res.status(statusCodes.CREATED).json({comment}); 
}

const getComments = async (req, res) => {
    //gets all comments for a video
    const {id} = req.params;
    const comments = await Comment.find({video: id}).populate('createdBy', 'username pfp');

    res.status(statusCodes.OK).json({comments, count: comments.length});
}

const updateComment = async (req, res) => {
    const {id:commentId} = req.params;
    const {content} = req.body;
    const {userId} = req.user;

    const comment = await Comment.findOne({_id: commentId, createdBy: userId});
    if(!comment) {
        throw new CustomAPIError('Comment not found', statusCodes.NOT_FOUND);
    }

    comment.content = content;
    await comment.save();

    res.status(statusCodes.OK).json({comment});


}

const deleteComment = async (req, res) => {
    const {id:commentId} = req.params;
    const {userId} = req.user;

    const comment = await Comment.findOne({_id: commentId, createdBy: userId});
    if(!comment) {
        throw new CustomAPIError('Comment not found', statusCodes.NOT_FOUND);
    }

    await comment.remove();

    res.status(statusCodes.OK).json({comment});

}

module.exports = {
    createComment,
    getComments,
    updateComment,
    deleteComment
}