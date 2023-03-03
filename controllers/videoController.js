const statusCodes = require('http-status-codes');
const path = require('path');
const fs = require('fs');
const util = require('util');

const readStatsPromise = util.promisify(fs.stat);

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

    const {file:fileName} = req.params;
    if(!fileName) {
        throw new Error('Please provide video file');
    }
    //TO-DO check video file exists against DB

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


module.exports = {
    uploadVideo,
    streamVideo
}