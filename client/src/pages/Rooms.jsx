import React, { useEffect, useReducer } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import Room from '../components/Room';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true};

    case "FETCH_SUCCESS":
      return { ...state, loading: false, rooms: action.payload}

    case "FETCH_FAIL":
        return { ...state, loading: false, error: action.payload};

    default:
      return state;
  }
}
const Rooms = () => {
  const [{loading, error, rooms}, dispatch] = useReducer(Reducer, {
    loading: true,
    error: '',
    rooms: []
  })
  useEffect(() => {
    const fetchRooms = async () => {
      dispatch({type: "FETCH_REQUEST"});
      try{
        const { data } = await  axios.get(`${process.env.REACT_APP_API_URL}/api/rooms`);
        dispatch({type: "FETCH_SUCCESS", payload: data});
        // console.log(data);
      } catch (err) {
        dispatch({type: "FETCH_FAIL", payload: err.message});
        toast.error(error);
      }
    }
    fetchRooms();
  },[error]);

  return (
    <div className="max-w-5xl mx-auto my-10 px-2">
      <Helmet>
        <title>Rooms</title>
      </Helmet>
      <nav className="bg-grey-light rounded-md w-full my-5">
            <ol className="list-reset flex">
                <li><Link to='/' className="text-blue-600 hover:text-blue-700">Home</Link></li>
                <li><span className="text-gray-500 mx-2">/</span></li>
                <li className="text-gray-500">Rooms</li>
            </ol>
        </nav>
      <div className='flex justify-between items-center mb-5'>
        <p className='text-3xl capitalize'>Rooms and Suits</p>
      </div>
        {loading ? <div>Loading...</div>
        :       
        <div className="grid grid-cols-12 gap-6 ">
            {rooms.map(room => (
              <div className="col-span-12 sm:col-span-4 shadow-lg border border-slate-300 rounded-md p-3" key={room._id}>
                <Room room={room} />
              </div>
            ))}
        </div>
        }
    </div>
  )
}

export default Rooms