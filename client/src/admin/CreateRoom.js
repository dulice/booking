import React, { useState } from 'react'

const CreateRoom = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [avaliblePerson, setAvaliblePerson] = useState('');
    const [area, setArea] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }
  return (
    <div className='max-w-5xl mx-auto'>
        <div className="m-3">
        <h1 className="font-bold text-3xl text-blue-700">Room</h1>
        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-6 sm:col-span-6">
              <label htmlFor="image" className='block text-grap-700 mt-3'>Image:</label>
              <input 
                value={image}
                onChange={(e) => setImage(e.target.value)}
                type="text" className="p-2 rounded-md sm:text-sm w-full border border-blue-700 outline-blue-600" id="image" placeholder='Put you image url' />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="name" className='block text-grap-700 mt-3'>Name:</label>
              <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text" 
                className="p-2 rounded-md sm:text-sm w-full border border-blue-700 outline-blue-600" 
                id="name"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="description" className='block text-grap-700 mt-3'>Description:</label>
              <input 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text" 
                className="p-2 rounded-md sm:text-sm w-full border border-blue-700 outline-blue-600" id="name" />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="price" className='block text-grap-700 mt-3'>Price:</label>
              <input 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="text" 
                className="p-2 rounded-md sm:text-sm w-full border border-blue-700 outline-blue-600" id="category" />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="countInStock" className='block text-grap-700 mt-3'>Avalible Person:</label>
              <input 
                value={avaliblePerson}
                onChange={(e) => setAvaliblePerson(e.target.value)}
                type="text" 
                className="p-2 rounded-md sm:text-sm w-full border border-blue-700 outline-blue-600" id="countInStock" />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="countInStock" className='block text-grap-700 mt-3'>Area:</label>
              <input 
                value={area}
                onChange={(e) => setArea(e.target.value)}
                type="text" 
                className="p-2 rounded-md sm:text-sm w-full border border-blue-700 outline-blue-600" id="countInStock" />
            </div>

            <div className="col-span-6 sm:col-span-6">
              <label htmlFor="des" className='block text-grap-700 mt-3'>Description:</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="des" 
                id="des" cols="30" rows="10" 
                className='p-2 rounded-md sm:text-sm w-full border border-blue-700 outline-blue-600'></textarea>
            </div>
            <button 
              type='submit'
              className='col-end-7 ml-5 px-3 py-2 rounded-full text-white bg-[#ba936f] hover:bg-[#ba936f]/90 active:bg-[#ba936f]/80'>Update</button>

          </div>

        </form>
      </div>
    </div>
  )
}

export default CreateRoom