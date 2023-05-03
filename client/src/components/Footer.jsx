import React from 'react'

const Footer = () => {
  const date = new Date();
  return (
    <div className='bg-gray-300 text-center py-3'>
        <p>Copyright &copy; {date.getFullYear()} Grace.com. All rights reserved.</p>
    </div>
  )
}

export default Footer