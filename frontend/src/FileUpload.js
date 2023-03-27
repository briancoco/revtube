import React, { useState } from 'react';
import { FaFileImage } from 'react-icons/fa';

function FileUpload({ user, setUser }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const handleFileChange = (event) => {
    //this function needs to set the uploaded image to the profile picture
    //and send the image to the backend to be stored in the database
    //after uploading the image to the database, we need to modify the user's data
    //to include the image url
    
    //need to add a save btn which when clicked will upload the given image file, and set the user's new pfp to the image path

    setSelectedFile(event.target.files[0]);
    if(event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = () => {
        setUser({...user, pfp: reader.result});
      };
    }
  };

  const handleFileSave = async (e) => {
    //uploads image onto DB
    //updates user data
    //resets state of selectedFile
    
    //first check if there is selectedFile
    //if no, return

    //then call backend route /api/videos/upload/image
    //create post request
    //in req.body give it form data for the given file
    //if not successful set error state 

    if(!selectedFile) return;
    const image = new FormData();
    image.append('image', selectedFile);

    try {
      let response = await fetch('/api/videos/upload/image', {
        method: 'POST',
        body: image
      })

      if(!response.ok) {
        throw new Error('Image Upload Failed');
      }

      response = await response.json();
      const imagePath = response.msg;

      //now with the image path, update the user's pfp

      let response2 = await fetch('/api/auth/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({pfp: imagePath})

      })

      if(!response2.ok) {
        throw new Error('Profile Failed to Save');
      }


    } catch (error) {
      console.log(error);
      setError(error.message);
    }

  }

  return (
    <div className='image-upload-wrapper'>
        <input type="file" id="my-file-input" onChange={handleFileChange}/>
        <label htmlFor="my-file-input">Choose a file</label>
        <button className='save-button' onClick={handleFileSave}>save</button>
    </div>
  );
}

export default FileUpload;
