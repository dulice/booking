import React from 'react'
import { images } from '../data/sponsorImages'
const Sponsorship = () => {
  return (
    <div className='my-10 max-w-5xl mx-auto'>
        <ul className='flex justify-between'>
            {images.map(image => (
                <li key={image.id}>
                    <img src={image.image} alt="" />
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Sponsorship