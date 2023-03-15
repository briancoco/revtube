import React from 'react'
import {useState} from 'react';
const Register = ({navigate}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleRegister = async (e) => {
        //http request to /api/auth/login route
        //content-type = json
        //request body = email and password
        // if successful, send user back to home page
        // otherwise display error msg
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password, username})
            });

            if(!response.ok) {
                throw new Error('failed to login');
            }

            navigate('/');

        } catch (error) {
            console.log(error.message);
        }
    }

  return (
    <div className='Register'>
        <form className='login-form' onSubmit={handleRegister}>
            <h2 style={{textAlign: 'center'}}>Register</h2>
            <section className='login-field'>
                <label htmlFor='email-login'>Email</label>
                <input id='email-login' required type='text' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </section>

            <section className='login-field'>
                <label htmlFor='username-login'>Username</label>
                <input id='username-login' required type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
            </section>

            <section className='login-field'>
                <label htmlFor='pwd-login'>Password</label>
                <input id='pwd-login' required type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                
            </section>
            <button className='submit-btn' type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Register