import React from 'react'
import { toast } from 'react-toastify';

const Subscribe = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("Thanks For Your Subscribe!");
  }
  return (
    <div className='bg-blue-900 text-white text-center py-10 leading-10'>
      <p className="text-4xl">Save Time and Save Money</p>
      <p className="text-gray-300 mb-5">Sign up and we will send the best deal to you.</p>
      <form className='text-left w-80 mx-auto' onClick={handleSubscribe}>
        <input type="email" placeholder='Email' className='px-3 rounded-sm text-black focus:outline-none'/>
        <button 
              type='submit'
              className='ml-3 px-3 rounded-sm bg-blue-500 hover:bg-blue-600 active:bg-blue-400'>Subscribe</button>
        <div>
          <input type="checkbox" id='checked' />
          <label htmlFor="checked" className='ml-2'>Send me a coupon discount.</label>
        </div>
      </form>
    </div>
  )
}

export default Subscribe