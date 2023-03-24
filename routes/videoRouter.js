const express = require('express');
const router = express.Router();
const {
    uploadVideo,
    streamVideo,
    createVideo,
    getVideo,
    getVideos,
    deleteVideo,
    updateVideo,
    uploadImage,
    updateVideoLikes,
    updateVideoViews
} = require('../controllers/videoController');

const authMiddleware = require('../middleware/authMiddleware');
const userMiddleware = require('../middleware/userMiddleware');

//so router acts as an extension of our web server
//it allows us to define routes in a seperate file
//and inside our main express app, we use it as middleware

router.post('/upload', authMiddleware, uploadVideo);
router.post('/upload/image', authMiddleware, uploadImage);
router.get('/stream/:id', streamVideo);
router.post('/likes/:id', authMiddleware, updateVideoLikes);
router.post('/views/:id', userMiddleware, updateVideoViews);

router.route('/').get(getVideos).post(authMiddleware, createVideo)
router.route('/:id').get(userMiddleware, getVideo).delete(deleteVideo).patch(authMiddleware, updateVideo)


module.exports = router;