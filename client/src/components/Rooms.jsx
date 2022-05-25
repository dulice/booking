import React, { useEffect, useReducer } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import Room from './Room';
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
        const { data } = await  axios.get('/api/rooms');
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
    <div className="max-w-5xl mx-auto my-20">
      <div className='flex justify-between items-center mb-5'>
        <p className='text-3xl capitalize'>Rooms and Suits</p>
        <Link to='/rooms'>
          <button 
            className='ml-5 px-3 py-2 rounded-full text-white bg-[#ba936f] hover:bg-[#ba936f]/90 active:bg-[#ba936f]/80'>View More</button>
        </Link>
      </div>
        {loading ? <div>Loading...</div>
        :       
        <div className="grid grid-cols-12 gap-6 ">
            {rooms.slice(rooms.length-3,rooms.length)?.map(room => (
              <div className="col-span-4 shadow-lg border border-slate-300 rounded-md p-3" key={room._id}>
                <Room room={room} />
              </div>
            ))}
        </div>
        }
    </div>
  )
}

export default Rooms