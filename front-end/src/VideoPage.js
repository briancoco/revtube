import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import VideoSidebar from './VideoSidebar';
const VideoPage = () => {

  const {id} = useParams();
  const [sidebar, setSidebar] = useState([]);

  const getSidebarVideos = async () => {
    let response = await fetch('/api/videos');
    response = await response.json();
    response.videos = response.videos.filter((video) => video._id !== id);
    setSidebar(response.videos);
  };

  useEffect(() => {
    getSidebarVideos();
  }, [])


  return (
    <div className='VideoPage'>
      <video className='video-player' width='950px' muted autoPlay controls src={`/api/videos/stream/${id}`}></video>
      

      <div className='video-bottom'>
        <div className='video-info'>
          <div>
            <h1>Fish with Legs</h1>
            <h5>4 years ago</h5>
            <div className='video-user'>
              <img className='profile-icon' alt='' src='https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0='></img>
              <span className='video-user-name'>briancoco</span>
            </div>
          </div>
          <p>
            This is an awesome video
          </p>
        </div>
        <div className='video-sidebar'>
          {sidebar.map((video) => <VideoSidebar 
            name={video.name}
            key={video._id}
            id={video._id}
            thumbnail={video.thumbnail}
          />)}

        </div>

      </div>

    </div>
  )
}

export default VideoPage