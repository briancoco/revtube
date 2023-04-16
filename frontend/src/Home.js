import React from 'react'
import Video from './Video';
import {useEffect, useState} from 'react';
import loadingImg from './assets/loading.gif';
import errorImg from './assets/error.gif';

const Home = () => {
  //make request to backend to get the list of videos
  //and then map through the array result populating the
  //Home page with Video components
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);


  const getVideos = async () => {
    //make a call to the backend route /api/videos
    //method: get
    try {
      let response = await fetch('/api/videos');
      if(response.ok) {
        response = await response.json();
        setVideos(response.videos);
      } else {
        throw new Error('Problem fetching videos');
      }

    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    getVideos();
  }, [])

  
  return (
    <div className='Home'>
      {videos.length === 0 && !error && <div className='system-message-profile'><img src={loadingImg} className='loading-img' alt=''></img></div>}
      {videos.length === 0 && error && 
        <div className='system-message-profile'>
          <img src={errorImg} alt='' className='loading-img'></img>
          <p className='error-msg'>Error, please try again.</p>
        </div>
      }
  
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