import React from 'react'

const Comment = ({username, pfp, content}) => {
  return (
    <div className='Comment'>
            <div className='comment-header'>
                <img className='profile-icon' alt='' src={pfp}></img>
                <span className='video-user-name'>{username}</span>
            </div>
            <p className='comment-content'>{content}</p>
    </div>
  )
}

export default Comment