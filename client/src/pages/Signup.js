import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Store } from '../context/Store';

const Signup = () => {
    const navigate = useNavigate();
    const {dispatch: ctxDispatch} = useContext(Store);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword) return toast.error("Password do not match!");
        try {
            const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/signup`, {
                name,
                email,
                password
            });
            console.log(data);
            ctxDispatch({type: "USER_SINGIN", payload: data});
            navigate('/signin');
        } catch (err) {
            toast.error(err.response.data);
        }
    }

  return (
    <div className='flex justify-center h-screen items-center bg-no-repeat bg-bottom bg-cover' style={{background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://s7d2.scene7.com/is/image/ritzcarlton/Arts%20hotel%20-%20april%202018%2002?$XlargeViewport100pct$)'}}>
        <div className='border border-gray-300 rounded-md p-5 shadow-sm bg-white'>
            <p className='font-bold text-3xl text-blue-600 mb-5'>SIGN UP</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" className='mt-5'>Name:</label>
                <input 
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    type="text" 
                    placeholder='Name' 
                    id='name' 
                    className='px-3 py-2 rounded-md text-black border border-blue-500 focus:outline-none focus:border-2 block mb-5 mt-2 w-80'/>

                <label htmlFor="email" className='mt-5'>Email:</label>
                <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" 
                    placeholder='Email' 
                    id='email' 
                    className='px-3 py-2 rounded-md text-black border border-blue-500 focus:outline-none focus:border-2 block mb-5 mt-2 w-80'/>

                <label htmlFor="password" className='mt-5'>Password:</label>
                <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" 
                    placeholder='Password' 
                    id='password' 
                    className='px-3 py-2 rounded-md text-black border border-blue-500 focus:outline-none focus:border-2 block mb-5 mt-2 w-80'/>

                <label htmlFor="confirm-password" className='mt-5'>Confirm Password:</label>
                <input 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password" 
                    placeholder='Confirm Password' 
                    id='confirm-password' 
                    className='px-3 py-2 rounded-md text-black border border-blue-500 focus:outline-none focus:border-2 block mb-5 mt-2 w-80'/>

                <button 
                type='submit'
                className='my-5 px-3 py-2 rounded-full text-white bg-[#ba936f] hover:bg-[#ba936f]/90 active:bg-[#ba936f]/80 block'>SING UP</button>
                <p>
                    Already have an account?
                    <Link to='/signin' className='text-blue-500'>Sign in</Link>
                </p>
            </form>
        </div>
    </div>
  )
}

export default Signup