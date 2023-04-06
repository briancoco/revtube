
import {Route, Routes} from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import VideoPage from './VideoPage';
import UploadPage from './UploadPage';
import Login from './Login';
import Register from './Register';
import ProfilePage from './ProfilePage';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';

function App() {
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const handleUserInfo = async () => {
      //make a request to backend route /api/auth/me to get current user's information
      //if request is successful, update state, otherwise display error
      try {
        let response = await fetch('/api/auth/me'); 
        
        if(!response.ok) {
            throw Error('Please login first');
        }

        setUserLoggedIn(true);

      } catch (error) {
        console.log(error.message);
      }
      
    }
    handleUserInfo();
  }, [])

  return (
    <div className="App">
      


      <Routes>
        <Route path='/' element={<Layout userLoggedIn={userLoggedIn}/>}>
          <Route index element={<Home />} />
          <Route path=':id' element={<VideoPage />} />
          <Route path='upload' element={<UploadPage />} />
          <Route path='login' element={<Login navigate={navigate} setUserLoggedIn={setUserLoggedIn}/>} />
          <Route path='register' element={<Register navigate={navigate}/>} />
          <Route path='profile' element={<ProfilePage setUserLoggedIn={setUserLoggedIn} navigate={navigate}/>} />
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
