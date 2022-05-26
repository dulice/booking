import React from 'react'

const Testimonial = () => {
  return (
    <div className='my-20 relative'>
        <img src="https://www.jetsetter.com//uploads/sites/7/2018/07/2zFs3Mzm.jpeg" alt="" className='offer-img w-full' />
        <div className='max-w-md bg-blue-500 p-10 rounded-sm absolute left-20 -inset-y-10 text-white leading-8 '>
            <div className="w-12 h-1 bg-white rounded-full my-3"></div>
            <p className="">All of the Testimonial!</p>
            <p className="text-2xl mb-5">People Say!</p>
            <p className='text-sm leading-6 ml-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quis dignissimos alias nam dolorem aspernatur mollitia ipsa animi ullam reprehenderit, vel, corporis debitis dolor perferendis quos illum. Voluptatibus, quos sit.</p>
            <img src="https://media.newyorker.com/photos/5ec2d7a40fe2fbfb61a298c8/4:3/w_1808,h_1356,c_limit/Russell-NormalPeople-3.jpg" alt="" className='h-14 w-14 rounded-full ml-10 mt-5' />
        </div>
    </div>
  )
}

export default Testimonial