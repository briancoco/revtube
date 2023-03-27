import React from 'react'
import {Link} from 'react-router-dom';
const Video = ({name, id, thumbnail, username, pfp}) => {

  //add onClick event listener to video
  //when clicked, it will hit the /api/videos/views/id route
  //which will increment the views of the video

  return (
    <div className='Video' >
      <Link to={`/${id}`}><img className='thumbnail' src={thumbnail} alt={name}></img></Link>
      <div className='video-mini-header'>
        <img className='profile-icon' alt={name} src={pfp}></img>
        <div>
          <h5 className='video-mini-name'>{name}</h5>
          <p className='video-mini-author'>{username}</p>
        </div>
      </div>
    </div>
  )
}

export default Video