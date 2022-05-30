import React from 'react'
import ReactLoading from 'react-loading'
const Loading = () => {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
        <ReactLoading type="bubbles" color="gray" />
    </div>
  )
}

export default Loading