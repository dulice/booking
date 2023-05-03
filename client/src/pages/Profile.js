import React, { useContext, useReducer, useState } from 'react'
import { Store } from '../context/Store'
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true};
  
      case "FETCH_SUCCESS":
        return { ...state, loading: false, user: action.payload }
  
      case "FETCH_FAIL":
          return { ...state, loading: false, error: action.payload};
  
      default:
        return state;
    }
  }

const Profile = () => {
    const {state} = useContext(Store);
    const [{error,loading}, dispatch] = useReducer(Reducer,{
        loading: false,
        error: ''
    })

    const { userInfo } = state;
    const [name, setName] = useState(userInfo.name || '');
    const [email, setEmail] = useState(userInfo.email || '');
    const [password, setPassword] = useState('');
    const [confirmPasswrod, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: "FETCH_REQUIEST"});
        try{
            const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
                name,
                email,
                password
            }, {
                headers: {
                    authorization: `Bearer ${userInfo.token}`
                }
            });
            dispatch({type: "FETCH_SUCCESS", payload: data});
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Update Successfully!');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (err) {
            dispatch({type: "FETCH_FAIL", payload: err.response.data});
            toast.error(error);
        }
    }

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="m-3">
        <Helmet>
          <title>Profile Setting</title>
        </Helmet>
        <nav className="bg-grey-light rounded-md w-full my-5">
            <ol className="list-reset flex">
                <li><Link to='/' className="text-blue-600 hover:text-blue-700">Home</Link></li>
                <li><span className="text-gray-500 mx-2">/</span></li>
                <li className="text-gray-500">Profile</li>
            </ol>
        </nav>
        <h1 className="font-bold text-3xl text-blue-700">Profile Setting</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-6 gap-4">

            <div className="col-span-6">
              <label htmlFor="name" className='block text-grap-700 mt-3'>Name:</label>
              <input
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text" 
                className="p-2 rounded-md sm:text-sm w-full border border-blue-500 outline-blue-600" 
                id="name"
              />
            </div>

            <div className="col-span-6">
              <label htmlFor="email" className='block text-grap-700 mt-3'>Email:</label>
              <input
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text" 
                className="p-2 rounded-md sm:text-sm w-full border border-blue-500 outline-blue-600" id="name" />
            </div>

            <div className="col-span-6">
              <label htmlFor="password" className='block text-grap-700 mt-3'>Password:</label>
              <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text" 
                className="p-2 rounded-md sm:text-sm w-full border border-blue-500 outline-blue-600" id="category" />
            </div>

            <div className="col-span-6">
              <label htmlFor="confirm-password" className='block text-grap-700 mt-3'>Confirm Password:</label>
              <input 
                value={confirmPasswrod}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="text" 
                className="p-2 rounded-md sm:text-sm w-full border border-blue-500 outline-blue-600" id="brand" />
            </div>
            { loading 
            ? <button type="submit" className='px-3 py-2 rounded-full text-white bg-[#ba936f] hover:bg-[#ba936f]/90 active:bg-[#ba936f]/80 cursor-not-allowed'>
                Updating...
            </button>                       
            : <button type="submit" className='px-3 py-2 rounded-full text-white bg-[#ba936f] hover:bg-[#ba936f]/90 active:bg-[#ba936f]/80'>Update</button>
            }
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile