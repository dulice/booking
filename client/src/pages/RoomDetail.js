import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CgHome, CgSmartHomeCooker, CgSmartHomeWashMachine, CgTrack, CgSignal, CgUserList, CgEject, CgExtensionRemove } from 'react-icons/cg';

const Reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true};
  
      case "FETCH_SUCCESS":
        return { ...state, loading: false, room: action.payload}
  
      case "FETCH_FAIL":
          return { ...state, loading: false, error: action.payload};
  
      default:
        return state;
    }
  }

const RoomDetail = () => {
    const { id } = useParams();
    const [{loading, error, room}, dispatch] = useReducer(Reducer, {
        loading: true,
        error: '',
        room: {}
      })
    
      useEffect(() => {
        const fetchRooms = async () => {
          dispatch({type: "FETCH_REQUEST"});
          try{
            const { data } = await  axios.get(`/api/rooms/${id}`);
            dispatch({type: "FETCH_SUCCESS", payload: data});
            console.log(data);
          } catch (err) {
            dispatch({type: "FETCH_FAIL", payload: err.message});
            toast.error(error);
          }
        }
        fetchRooms();
      },[id, dispatch]);

  return (
    <div className='max-w-5xl mx-auto my-5'>
        {loading ? <div>Loading...</div>
        :
        <div>
          <p className='font-bold text-2xl my-5'>{room.name}</p>
          <div className="grid grid-rows-4 grid-flow-col gap-6">
            <img src={room.image[0]} alt="" className="row-span-2 rounded-md h-full" />
            <img src={room.image[1]} alt="" className="row-span-2 rounded-md h-full" />
            <img src={room.image[2]} alt="" className="row-span-4 col-span-3 rounded-md h-full" />
          </div>
          <ul className='flex justify-between my-5'>
            <li className='text-center'>
              <CgHome className='text-2xl'/>
              <p>Home</p>
            </li>
            <li className='text-center'>
              <p className='font-bold'>
                {room.area ? room.area : 110} m<sup>2</sup>
              </p>
              <p>Size</p>
            </li>
            <li className='text-center'>
              <CgSmartHomeCooker className='text-2xl'/>
              <p>Kitchen</p>
            </li>
            <li className='text-center'>
              <CgSmartHomeWashMachine className='text-2xl'/>
              <p>Washing Machine</p>
            </li>
          </ul>
          <p className='font-bold text-2xl'>{room.name}</p>
          <p className="mb-5">{room.description}</p>
          <p className="font-bold">Most Popular Faciliites</p>
          <ul className='flex'>
            <li>
              <CgTrack className="text-green-600 text-2xl ml-5 mr-1"/>
              <span>Parking</span>
            </li>
            <li>
              <CgSignal className="text-green-600 text-2xl ml-5 mr-1"/>
              <span>Wifi Free</span>
            </li>
            <li>
              <CgUserList className="text-green-600 text-2xl ml-5 mr-1"/>
              <span>Family Rooms</span>
            </li>
            <li>
              <CgEject className="text-green-600 text-2xl ml-5 mr-1"/>
              <span>No Smoking Rooms</span>
            </li>
            <li>
              <CgExtensionRemove className="text-green-600 text-2xl ml-5 mr-1"/>
              <span>Elevator</span>
            </li>
          </ul>
          <button 
              type='submit'
              className='my-5 float-right ml-5 px-3 py-2 rounded-full text-white bg-[#ba936f] hover:bg-[#ba936f]/90 active:bg-[#ba936f]/80'>Book Now</button>
        </div>
        }
    </div>
  )
}

export default RoomDetail