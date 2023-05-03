import React, { useEffect, useState } from 'react'
import { BiCheckCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(5);
  
  useEffect(() => {
    const redirect = counter>0 && setInterval(() => {
      setCounter(counter-1);
    }, 1000);
    counter === 0 && navigate('/');
    return () => clearInterval(redirect);
  },[counter, navigate]);
  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen'>
        <BiCheckCircle className='text-green-500 text-7xl'/>
        <h5 className='text-3xl'>Your payment was successful</h5>
        <p className='text-slate-700 my-3'>Thank you for your payment. We will be in contact with more details shortly.</p>
        <h6 className='text-slate-700'>Redirect to the homepage in {counter} second.</h6>
    </div>
  )
}

export default Success