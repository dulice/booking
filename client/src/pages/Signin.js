import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Store } from '../context/Store';

const Signin = () => {
    const {dispatch: ctxDispatch} = useContext(Store);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/users/signin', {
                email,
                password
            });
            ctxDispatch({type: "USER_SINGIN", payload: data});
            localStorage.setItem('userInfo', JSON.stringify(data));
            window.location.replace('/');
        } catch (err) {
            toast.error(err.message);
        }
    }

  return (
    <div className='flex justify-center h-screen items-center'>
        
        <div className='border border-gray-300 rounded-md p-5 shadow-sm'>
            <p className='font-bold text-3xl text-blue-600 mb-5'>SIGN IN</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" className='mt-5'>Email:</label>
                <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" 
                    id="email"
                    placeholder='Email' 
                    className='px-3 py-2 rounded-md text-black border border-blue-500 focus:outline-none focus:border-2 block mb-5 mt-2 w-80'/>

                <label htmlFor="password" className='mt-5'>Password:</label>
                <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" 
                    placeholder='Password' 
                    id="password"
                    className='px-3 py-2 rounded-md text-black border border-blue-500 focus:outline-none focus:border-2 block mb-5 mt-2 w-80'/>

                <button 
                type='submit'
                className='my-5 px-3 py-2 rounded-full text-white bg-[#ba936f] hover:bg-[#ba936f]/90 active:bg-[#ba936f]/80 block'>SING IN</button>
                <p>
                    Don't have an account?
                    <Link to='/signup' className='text-blue-500'>Sign up</Link>
                </p>
            </form>
        </div>
    </div>
  )
}

export default Signin