import React from 'react'
import { Link } from 'react-router-dom'
import InfoImg from '../images/info-img.png'

const Welcome = () => {
  return (
    <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-6">
                <img src={InfoImg} alt="" />
            </div>
            <div className="col-span-12 sm:col-span-6 ml-5">
                <p className="text-2xl mb-3">Welcome To Grace Hotel</p>
                <p className='ml-5 mb-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint error quod odio eius et molestias cupiditate adipisci eos recusandae culpa aliquid earum distinctio accusamus fugiat impedit, corrupti odit harum possimus?</p>
                <Link to='/rooms'>
                  <button className='ml-5 px-3 py-2 rounded-full text-white bg-[#ba936f] hover:bg-[#ba936f]/90 active:bg-[#ba936f]/80'>See More</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Welcome