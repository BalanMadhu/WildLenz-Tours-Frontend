import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Component/login';
import { Registration } from './Component/Registration';
import { TouristPlaces } from './Component/TouristPlaces';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/touristPlace' element={<TouristPlaces />} />
         


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
