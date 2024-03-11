
import Addblog from './pages/add-blog/blog'
import Home from './pages/home/home';
import Header from './components';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (   
      <div>
        <Header/>
        <Routes>
          <Route exact path ='/' element={<Home/>}/>
          <Route exact path ='/add-blog' element={<Addblog/>}/>
        </Routes>
      </div>
  );
}

export default App;
