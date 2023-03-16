const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
    createComment,
    getComments,
    updateComment,
    deleteComment
} = require('../controllers/commentController');

router.route('/').post(authMiddleware, createComment);

router.route('/:id').get(getComments).patch(authMiddleware, updateComment).delete(authMiddleware, deleteComment);

module.exports = router;