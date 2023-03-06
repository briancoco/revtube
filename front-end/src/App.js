
import {Route, Routes} from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import VideoPage from './VideoPage';
function App() {
  return (
    <div className="App">
      


      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=':id' element={<VideoPage />} />
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
