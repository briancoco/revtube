import React from 'react'
import {FcClapperboard, FcBusinessman, FcStart} from 'react-icons/fc';
import {Link} from 'react-router-dom';
const Header = () => {
  return (
    <div className='Header'>
      <Link to='/' style={{textDecoration: 'none', color: 'black'}}>
        <header className='revtube-icon'>
          <FcStart size='30px'/>
          <h1>RevTube</h1>
        </header>
      </Link>
      <nav className='navbar'>
        <Link to='/upload'><FcClapperboard size='25px'/></Link>
        <Link to='/login'><FcBusinessman size='25px'/></Link>
      </nav>
    </div>
  )
}

export default Header