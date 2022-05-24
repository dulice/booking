import React from 'react'
import { CgGym } from 'react-icons/cg'
import { IoFastFoodSharp } from 'react-icons/io5'
import { MdSpa, MdPool, MdHeadsetMic } from 'react-icons/md'
import { FaUmbrellaBeach } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Services = () => {
  return (
    <div className='mt-10 relative'>
      <Link to='/admin/createRoom'>Create</Link>
        <img src="https://d1el5jddkxvjyd.cloudfront.net/viceroyhotelsandresorts.com-2109743334/cms/cache/v2/5f3edc7b9b603.jpg/1920x864/fit/80/299233eaf8eb42561189da7ebbe252a8.jpg" alt="" className='offer-img w-full' />
        <div className='max-w-md bg-blue-500 p-10 rounded-sm absolute right-20 -inset-y-10 text-white leading-8 '>
            <div className="w-12 h-1 bg-white rounded-full my-3"></div>
            <p className="text-2xl mb-5">Our Services</p>
            <p className='text-sm leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quis dignissimos alias nam dolorem aspernatur mollitia ipsa animi ullam reprehenderit, vel, corporis debitis dolor perferendis quos illum. Voluptatibus, quos sit.</p>
            <ul>
                <li> <CgGym/> Gym & Yoga</li>
                <li> <IoFastFoodSharp/> Breakfast</li>
                <li> <MdSpa/> Spa & Massage</li>
                <li> <FaUmbrellaBeach/> Beach</li>
                <li> <MdPool/> Swimming Pool</li>
                <li> <MdHeadsetMic /> Karaoke Room</li>
            </ul>
        </div>
    </div>
  )
}

export default Services