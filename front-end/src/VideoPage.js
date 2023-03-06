import React from 'react'
import { useParams } from 'react-router-dom';
const VideoPage = () => {

  const {id} = useParams();


  return (
    <div className='VideoPage'>
      <video className='video-player' width='750px' muted autoPlay controls src={`/api/videos/stream/${id}`}></video>
      <div>
        <h1>Fish with Legs</h1>
        <h5>4 years ago</h5>
      </div>
      <p>
        This is an awesome video
      </p>
    </div>
  )
}

export default VideoPage