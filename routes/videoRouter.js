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
    uploadImage
} = require('../controllers/videoController');
//so router acts as an extension of our web server
//it allows us to define routes in a seperate file
//and inside our main express app, we use it as middleware

router.post('/upload', uploadVideo);
router.post('/upload/image', uploadImage);
router.get('/stream/:id', streamVideo);

router.route('/').get(getVideos).post(createVideo)
router.route('/:id').get(getVideo).delete(deleteVideo).patch(updateVideo)


module.exports = router;