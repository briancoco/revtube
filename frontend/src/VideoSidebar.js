import React from 'react'
import { Link } from 'react-router-dom'
const VideoSidebar = ({name, id, thumbnail, setVideoId}) => {

  return (
    <div className='VideoSidebar'>
        <Link to={`/${id}`}><img className='thumbnail-sidebar' src= {thumbnail} alt='' onClick={() => setVideoId(id)}></img></Link>
        <div className='video-mini-header'>
            <div>
                <h5 className='video-mini-name-sidebar'>{name}</h5>
                <p className='video-mini-author-sidebar'>brian nguyen</p>
            </div>
        </div>
    </div>
  )
}

export default VideoSidebar