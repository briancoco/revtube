const express = require('express');
const router = express.Router();
const {
    uploadVideo,
    streamVideo
} = require('../controllers/videoController');
//so router acts as an extension of our web server
//it allows us to define routes in a seperate file
//and inside our main express app, we use it as middleware

router.post('/upload', uploadVideo);
router.get('/:file', streamVideo);

module.exports = router;