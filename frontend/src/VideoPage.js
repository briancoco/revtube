import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import VideoSidebar from './VideoSidebar';
import Comments from './Comments';
import {BiCaretRightSquare} from 'react-icons/bi';
import {BsHeartFill, BsHeart, BsFillChatRightTextFill} from 'react-icons/bs';

const VideoPage = () => {

  const {id} = useParams();
  const [videoId, setVideoId] = useState(id);
  const [sidebar, setSidebar] = useState([]);
  const [video, setVideo] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {

    const getVideo = async () => {
      try {
        let response = await fetch(`/api/videos/${videoId}`);
  
        if(!response.ok) {
          throw new Error('Video not found');
        }
  
        response = await response.json();
  
        return response.video;
  
      } catch (error) {
        console.log(error.message);
      }
  
      
  
    }
  
    const getSidebarVideos = async () => {
      let response = await fetch('/api/videos');
      response = await response.json();
      response.videos = response.videos.filter((video) => video._id !== videoId);
      return response.videos;
    };

    const setup = async () => {
      const sidebarVids = await getSidebarVideos();
      const videoInfo = await getVideo();
      setSidebar(sidebarVids);
      setVideo(videoInfo);
      setLikes(videoInfo.likes);
      setLiked(videoInfo.liked);
    }
    setup();
  }, [videoId])

  const handleLikes = async () => {
    const response = await fetch(`/api/videos/likes/${videoId}`, {
      method: 'POST'
    });
    if(!response.ok) {
      throw new Error('Something went wrong');
    } else {
      setLiked(!liked);
      if(liked) {
        setLikes(likes - 1);
      } else {
        setLikes(likes + 1);
      }
    }
  }


  return (
    <div className='VideoPage'>
      <video className='video-player' width='950px' muted autoPlay controls src={`/api/videos/stream/${id}`}></video>
      

      <div className='video-bottom'>
        <div className='video-info'>
          <div className='video-header'>
            <h1>{video ? video.name : ''}</h1>
            <h5>4 years ago</h5>
            <div className='video-user'>
              <img className='profile-icon' alt='' src={video ? video.createdBy.pfp : ''}></img>
              <span className='video-user-name'>{video ? video.createdBy.username : ''}</span>
            </div>
          </div>
          <section className='video-stats'>
            <span className='video-stat'>
              <BiCaretRightSquare size={'20px'}/>
              <span>164</span>
            </span>
            <span className='video-stat'>
              <button className='like-button' onClick={handleLikes}>
                {liked ? <BsHeartFill size={'20px'} /> : <BsHeart size={'20px'} />}
              </button>
              <span>{likes}</span>
              
            </span>

            <span className='video-stat'>
              <BsFillChatRightTextFill size={'20px'} style={{paddingRight:'5px'}}/>
              <span>{comments.length}</span>
              
            </span>
          </section>
          <p>
           { video ? video.description : ''}
          </p>
          <Comments videoId={id} comments={comments} setComments={setComments}/>
        </div>
        <div className='video-sidebar'>
          {sidebar.map((video) => <VideoSidebar 
            name={video.name}
            key={video._id}
            id={video._id}
            thumbnail={video.thumbnail}
            setVideoId={setVideoId}
          />)}

        </div>

      </div>

    </div>
  )
}

export default VideoPage