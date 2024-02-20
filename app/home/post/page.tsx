'use client'

import { useState } from 'react';
import Image from "next/image";
import bird from "../../../bird.jpg";

const Validatedata = (data) =>{
  if(data.BirdName==="" || data.Location===""||data.Description===""){
    console.log("Null value dont submit")
  }
}

const Post = () => {
  const [inputimage, setInputimage] = useState(null);
  const [data,setData] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault();
    Validatedata(data)
    const res = await fetch("http://localhost:8080/postImages",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(res)
  }

  const handleChange = (event) =>{
    setData((prev)=>({...prev,[event.target.name]:event.target.value}))
  }

  return (
    <div>
      <form className="flex flex-col p-8 w-full border-2 border-red-400" onSubmit={handleSubmit}>
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
            <div className="w-full h-full flex justify-center items-center border border-white cursor-pointer">
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              className="pl-32 h-full"
            />
            {inputimage ? <img src={Image} alt="Bird_Image"/>:<Image src={bird} alt="Bird_Image" className="w-[200px] "/>}
          </div>
        </div>
        <div className="pt-4 flex w-full justify-center items-center "> 
          <button className="px-4 py-2 bg-[#0000FF] rounded-xl">POST</button>
        </div>
      </form>
    </div>
  );
};

export default Post;
