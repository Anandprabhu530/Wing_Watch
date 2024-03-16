'use client'

import axios from 'axios';
import React, { useState } from 'react';

const Post = () => {
  const [data,setData] = useState({})
    
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    const {BirdName,Description,Location,img} = data
    console.log(img)
    formData.append('name', BirdName)
    formData.append('description',Description)
    formData.append('location',Location)
    formData.append('url',img)
    const username = localStorage.getItem('username')
    formData.append('Username', username);
    console.log(formData)
    const response = await axios.post('http://localhost:8080/post', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
    console.log(response)
  }

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setData((prev)=>({...prev,[event.target.name]:event.target.value}))
  }

  return (
    <div className='border-l-2 border-white'>
      <form className="flex flex-col p-8 w-full" onSubmit={handleSubmit}>
        <div>
          <div className="text-2xl pb-4 font-medium">Name of the Bird:</div>
          <input name="BirdName" onChange={handleChange} className="border border-white bg-transparent rounded-md w-full outline-none mb-6 text-xl p-2" />
        </div>
        <div>
          <div className="text-2xl pb-4 font-medium">Location:</div>
          <input name="Location" onChange={handleChange} className="border border-white bg-transparent rounded-md w-full outline-none mb-6 text-xl p-2" />
        </div>
        <div>
          <div className="text-2xl pb-4 font-medium">Description:</div>
          <textarea name="Description" onChange={handleChange} className="border border-white h-[225px] resize-none bg-transparent rounded-md w-full outline-none mb-6 text-xl p-2" />
        </div>
        <div>
          <div className="text-2xl pb-4 font-medium">Image:</div>
            <div className="w-full flex">
            <input
            className="border border-white bg-transparent rounded-md w-full outline-none mb-6 text-xl p-2"
              onChange={handleChange}
              id="img"
              name="img"
            />
          </div>
        </div>
        <div className="pt-4 flex w-full justify-center items-center "> 
          <button className="px-4 py-2 bg-[#0000FF] rounded-xl" onClick={handleSubmit}>POST</button>
        </div>
      </form>
    </div>
  );
};

export default Post;
