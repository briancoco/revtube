import React from 'react'
import {FaUserAlt} from 'react-icons/fa';
import {RiVideoAddFill} from 'react-icons/ri';
import {FcStart} from 'react-icons/fc';
import {Link} from 'react-router-dom';
const Header = ({userLoggedIn}) => {
  return (
    <div className='Header'>
      <Link to='/' style={{textDecoration: 'none', color: 'black'}}>
        <header className='revtube-icon'>
          <FcStart size='30px'/>
          <h1>RevTube</h1>
        </header>
      </Link>
      <nav className='navbar'>
        <Link to='/upload'><RiVideoAddFill size='25px' style={{color: 'black'}}/></Link>
        <Link to={userLoggedIn ? '/profile' : '/login'}><FaUserAlt size='20px' style={{color: 'black'}}/></Link>
      </nav>
    </div>
  )
}

export default Header