import React from 'react'
import {Link} from 'react-router-dom';
import {useState} from 'react';
const Login = ({navigate, setUserLoggedIn}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        //http request to /api/auth/login route
        //content-type = json
        //request body = email and password
        // if successful, send user back to home page
        // otherwise display error msg
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });

            if(!response.ok) {
                throw new Error('failed to login');
            }
            
            setUserLoggedIn(true);
            navigate('/');

        } catch (error) {
            console.log(error.message);
        }
    }

  return (
    <div className='Login'>
        <form className='login-form' onSubmit={handleLogin}>
            <h2 style={{textAlign: 'center'}}>Login</h2>
            <section className='login-field'>
                <label htmlFor='email-login'>Email</label>
                <input id='email-login' required type='text' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </section>
            <section className='login-field'>
                <label htmlFor='pwd-login'>Password</label>
                <input id='pwd-login' required type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <Link to='/register' style={{alignSelf: 'center', textDecoration: 'none', color: 'navy'}}>New user? Register here!</Link>
            </section>
            <button className='submit-btn' type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Login