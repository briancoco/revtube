
import {Route, Routes} from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import VideoPage from './VideoPage';
import UploadPage from './UploadPage';

function App() {
  return (
    <div className="App">
      


      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=':id' element={<VideoPage />} />
          <Route path='upload' element={<UploadPage />} />
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
