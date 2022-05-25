import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Room = (props) => {
    const { room } = props
  return (
    <>
        <img src={room.image[0]} alt="" className='h-4/6 w-full hover:scale-105 duration-500'/>
        <Link to={`/rooms/${room._id}`}>
          <p className='capitalize hover:text-blue-500 font-bold mt-3'>{room.name}</p>
        </Link>
        <p className='my-3'>Starting From <span className='font-bold text-blue-600'> ${room.price} </span></p>
        <Rating rating={room.rating} numReviews={room.numReviews} />
    </>
  )
}

export default Room