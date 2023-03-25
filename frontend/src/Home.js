import React from 'react'
import Video from './Video';
import {useEffect, useState} from 'react';

const Home = () => {
  //make request to backend to get the list of videos
  //and then map through the array result populating the
  //Home page with Video components
  const [videos, setVideos] = useState([]);


  const getVideos = async () => {
    //make a call to the backend route /api/videos
    //method: get
    let response = await fetch('/api/videos');
    response = await response.json();
    setVideos(response.videos);
  }

  useEffect(() => {
    getVideos();
  }, [])

  
  return (
    <div className='Home'>
      {videos.map((video) => 
      <Video 
        key={video._id} 
        name={video.name}
        id={video._id}
        thumbnail={video.thumbnail}
        username={video.createdBy.username}
        pfp={video.createdBy.pfp}
        
      />)}
    </div>
  )
}

export default Home