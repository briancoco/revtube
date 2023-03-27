import React from 'react'
import Video from './Video';
import FileUpload from './FileUpload';
import {useState, useEffect} from 'react';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleUserInfo = async () => {
            //make a request to backend route /api/auth/me to get current user's information
            //if request is successful, update state, otherwise display error
            try {
                let response = await fetch('/api/auth/me'); 
                
                if(!response.ok) {
                    throw Error('Please login first');
                }

                response = await response.json();
                setUser(response.user);

            } catch (error) {
                setError(error.message);
            }
            
        }
        handleUserInfo();
    }, [])
    

  return (
    <div>
        {!user && !error && <div className='system-message-profile'>Loading...</div>}
        {!user && error && <div className='system-message-profile'>Error, try again. </div>}

        {user && !error &&
            <div>
            <section className='profile-header'>
                <img className='profile-img' src={user.pfp}></img>
                <FileUpload setUser={setUser}/>
                <h1 className='profile-name'>Brian Nguyen</h1>
                <p className='profile-username'>{user.username}</p>
            </section>
        

            <section className='profile-watch-history'>
                <h2 className='profile-watch-history-title'>Watch History</h2>
                <div className='profile-watch-history-videos'>
                    <Video 
                        name={'random video'}
                        id={1}
                        thumbnail={'https://i.ytimg.com/vi/2Z4m4lnjxkY/maxresdefault.jpg'}
                        username={'briancoco'}
                        pfp={'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'}
                    />
                    <Video 
                        name={'random video'}
                        id={1}
                        thumbnail={'https://i.ytimg.com/vi/2Z4m4lnjxkY/maxresdefault.jpg'}
                        username={'briancoco'}
                        pfp={'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'}
                    />
                    <Video 
                        name={'random video'}
                        id={1}
                        thumbnail={'https://i.ytimg.com/vi/2Z4m4lnjxkY/maxresdefault.jpg'}
                        username={'briancoco'}
                        pfp={'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'}
                    />
                </div>
            </section>
            </div>
        }
        
    </div>
  )
}

export default ProfilePage