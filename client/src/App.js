import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import CreateRoom from './admin/CreateRoom';
import { ToastContainer } from "react-toastify";
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

function App() {
  return (
    <div className='px-2'>
      <ToastContainer position="bottom-center" limit={1} />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/rooms' element={<Rooms />} />
        <Route path='/rooms/:id' element={<RoomDetail />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/admin/createRoom' element={ <CreateRoom />} />
      </Routes>
    </div>
  );
}

export default App;
