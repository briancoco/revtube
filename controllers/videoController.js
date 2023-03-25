const statusCodes = require('http-status-codes');
const path = require('path');
const fs = require('fs');
const util = require('util');
const readStatsPromise = util.promisify(fs.stat);
const Video = require('../model/video');
const CustomAPIError = require('../errors/custom-error');
const User = require('../model/user');

const createVideo = async (req, res) => {
    //user passes in video info through req body
    //and we use the req body to create video document on DB
    
    //extract fileName property from req.body
    //if no fileName provided throw error
    //otherwise use fs module to check if file exists
    //if it doesn't, throw error
    
    //create video document
    //send back 201 response
    
    const {fileName} = req.body;
    console.log(fileName);
    if(!fileName) {
        throw new CustomAPIError('Please provide file name', statusCodes.BAD_REQUEST);
    } 
    
    await readStatsPromise(`public/videos/${fileName}`); //attemps to get access video
    //if it doesn't exist then we'll get an error and our errorHandler middleware will run
    //TO-DO make this error customizable want 400 status code and custom msg

    req.body.createdBy = req.user.userId;
    const video = await Video.create(req.body);
    res.status(statusCodes.CREATED).json({msg: 'Video created successfully!', video});
}

const getVideos = async (req, res) => {
    //gets info of videos stored on our server
    let videos = await Video.find({});
    await Video.populate(videos, {
        path: 'createdBy',
        select: 'username pfp'
    });


    //TO-DO add different querying functionalities
    res.status(statusCodes.OK).json({videos});

}

const getVideo = async (req, res) => {
    //gets info of a single video
    //first get id from route param
    //and perform query on DB

    //determine if user is logged in
    //determine if user liked the video
    //determine and send back number of likes



    const {id} = req.params;
    let liked = false;

    //TODO TOMORROW
    let video = await Video.findOne({_id:id});
    await video.populate({
        path: 'createdBy',
        select: 'username pfp'
    });

    if(req.user && video.likes.includes(req.user.userId)) {
        liked = true;
    }

    let response = {
        name: video.name,
        description: video.description,
        liked,
        likes: video.likes.length,
        createdBy: video.createdBy,
        views: video.views,
    }

    res.status(statusCodes.OK).json({video: response});
}

const deleteVideo = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findOneAndDelete({_id:id});

    res.status(statusCodes.OK).json({video});
}

const updateVideo = async (req, res) => {
    //need to add user roles
    //only admins or user who created the video can update it
    //if user is neither admin or owner, they can only add views or likes

    const {id} = req.params;
    const video = await Video.findOneAndUpdate({_id:id}, req.body, {
        new: true,
        runValidators: true
    });

    res.status(statusCodes.OK).json({video});
}

const updateVideoLikes = async (req, res) => {
    const {id} = req.params;
    const {userId} = req.user;

    //perform query on DB to get video
    //check if user already liked the video
    //if yes, remove id from array, otherwise add it
    //send back 200 status

    const video = await Video.findOne({_id: id});
    if(!video) {
        throw new CustomAPIError('Video does not exist', statusCodes.NOT_FOUND);
    }

    const userLikedVideo = video.likes.includes(userId);
    if(userLikedVideo) {
        video.likes = video.likes.filter(like => like != userId);
    } else {
        video.likes.push(userId);
    }  

    await video.save();
    res.status(statusCodes.OK).json({video});   

}

const updateVideoViews = async (req, res) => {
    //increments view count of video by 1
    //adds videoId to user watched array, if video is not already in it
    //get videoId from route param
    //perform query on DB for the video
    //increment views by 1
    //check if user is logged in
    //if yes, perform query on DB to get user
    //check if video is already in user watched array
    //if no, add it

    const {id} = req.params;
    const video = await Video.findOne({_id: id});

    if(!video) {
        throw new CustomAPIError('Video does not exist', statusCodes.NOT_FOUND);
    }

    if(req.user) {
        const user = await User.findOne({_id: req.user.userId});
        if(!user.watched.includes(id)) {
            video.views += 1;
            user.watched.push(id);
            await user.save();
            await video.save();
        }
    }

    res.status(statusCodes.OK).json({video});

}

const uploadVideo = async (req, res) => {
    //get video file from req.files
    //validate video file
    //move video file to correct directory
    //return back video file's name

    const video = req.files.video;
    if(!video) {
        throw new Error('please provide video');
    } else if(video.mimetype != 'video/mp4') {
        throw new Error('uploaded file is not a video');
    }

    const filePath = path.join(__dirname, '../public/videos', video.name);
    video.mv(filePath);

    res.status(statusCodes.CREATED).json({msg: 'Video successfully uploaded!'})
}

const streamVideo = async (req, res) => {
    //looks for header defining range
    //range header syntax: bytes=<start>-<end>
    //each time we want to send 1mb of the video 
    //1. check for range and fileName route param
    //2. parse range header for the starting byte
    //3. calculate ending byte 
    //4. define headers on res obj using writeHead
    //5. create a readStream to get contents of the desired video file
    //6. pipe the read stream to the write stream(res obj)

    const range = req.headers.range;
    if(!range) {
        throw new Error('Please provide range');
    }

    const {id} = req.params;
    const video = await Video.findOne({_id: id});
    if(!video) {
        throw new CustomAPIError("Video does not exist", statusCodes.NOT_FOUND);
    }
    
    const fileName = video.fileName;
    if(!fileName) {
        throw new Error('Please provide video file');
    }

    let videoSize = await readStatsPromise(`public/videos/${fileName}`);
    videoSize = videoSize.size;
    const CHUNK_SIZE = 10**6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1)

    const contentLength = end - start + 1;

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": 'bytes',
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }

    res.writeHead(statusCodes.PARTIAL_CONTENT, headers);
    const videoStream = fs.createReadStream(`public/videos/${fileName}`, {
        start, 
        end
    });
    videoStream.pipe(res);
    
}

const uploadImage = (req, res) => {
    const image = req.files.image;
    if(!image) {
        throw new CustomAPIError('Please provide image', statusCodes.BAD_REQUEST);
    }

    //validate the image file
    if(!image.mimetype.includes('image')) {
        throw new CustomAPIError('Not an image file', statusCodes.BAD_REQUEST);
    }

    //move image file to static assets folder
    const filePath = path.join(__dirname, '../public/images', image.name);
    image.mv(filePath);

    res.status(statusCodes.CREATED).json({msg:`/images/${image.name}`});
}

module.exports = {
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
}