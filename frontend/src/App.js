
import {Route, Routes} from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import VideoPage from './VideoPage';
import UploadPage from './UploadPage';
import Login from './Login';
import Register from './Register';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      


      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=':id' element={<VideoPage />} />
          <Route path='upload' element={<UploadPage />} />
          <Route path='login' element={<Login navigate={navigate}/>} />
          <Route path='register' element={<Register navigate={navigate}/>} />
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
