import React from 'react'
import {FcAddImage, FcVideoFile} from 'react-icons/fc'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import successImg from './assets/success.gif';
import errorImg from './assets/error.gif';

//implement redirection using useTimeout();


const UploadPage = ({navigate}) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = async (e) => {
    //calls uploadVideo
    //calls uploadImage
    //then if both are uploaded sucessfully, calls backend route /api/videos
    //and creates new video document onto database

    //whenever the client wants to stream a video
    //they make a request to /api/videos/stream/:id
    //given the id of the video document
    //we can validate that the video exists on our server
    //then send back the video in partions

    e.preventDefault();
    
    try {
      const videoName = await uploadVideo();
      const imagePath = await uploadImage();

      const createVideo = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          description: description,
          thumbnail: imagePath,
          fileName: videoName
        })

      })

      if(!createVideo.ok) {
        throw new Error('Video not created sucessfully');
      }
      setUploaded(true);
    } catch (error) {
      setError(error.message);
      console.log('Video not created successfully');
    }

    


  }

  const uploadVideo = async () => {
    //creates form data for the given video
    //calls a fetch request to the backend route /api/videos/upload
    //wrap fetch request in try/catch
    //if error, set state of file to null
    //if good, return file name

    const video = new FormData();
    video.append('video', file);

    const response = await fetch('/api/videos/upload', {
      method: 'POST',
      body: video
    });

    if(!response.ok) {
      throw new Error('File upload not successful');
    }

    return file.name;

  };

  const uploadImage = async () => {
    //creates form data for the given image
    //calls fetch request to backend route /api/videos/upload/image
    //wrap in try/catch
    //if success, deserialize response, and return image file path

    const imageData = new FormData();
    imageData.append('image', image);

    let response = await fetch('/api/videos/upload/image', {
      method: 'POST',
      body: imageData
    });

    if(!response.ok) {
      throw new Error('File upload not successful');
    }

    response = await response.json();

    return response.msg;


  }

  const handleVideoFile = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  }

  const handleImageFile = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  }



  return (
    <div className='UploadPage'>

      {uploaded && !error && 
        <div className='system-message-profile'>
          <img src={successImg} alt='' className='loading-img'></img>
          <p className='error-msg'>Video uploaded</p>
          <Link to='/' style={{color: 'lightblue'}}>Return Home</Link>
        </div>
      }

      {!uploaded && error &&  
        <div className='system-message-profile'>
          <img src={errorImg} alt='' className='loading-img'></img>
          <p className='error-msg'>Problem uploading, please refresh and try again.</p>
        </div>
      }
        

        { !uploaded && !error &&
          <form className='upload-form' onSubmit={handleUpload}>
              <label htmlFor='upload-name'>Name</label>
              <input id='upload-name' type='text' required value={name} onChange={(e) => setName(e.target.value)}></input>

              <label htmlFor='upload-description'>Description</label>
              <textarea id='upload-description' type='text' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

              <section className='upload-field'>
                <FcVideoFile />
                <label htmlFor='upload-video'>Choose Video</label>
                <input id='upload-video' type='file' required onChange={handleVideoFile}></input>
              </section>

              <section className='upload-field'>
                <FcAddImage />
                <label htmlFor='upload-thumbnail'>Choose Image</label>
                <input id='upload-thumbnail' type='file' required onChange={handleImageFile}></input>
              </section>

              <button className='submit-btn' type='submit'>Submit</button>
          </form>
        }
    </div>
  )
}

export default UploadPage