'use client'

import Image from "next/image";
import sign_in_backgroud from "../../sign_in_backgroud.jpg";
import Link from "next/link";
import { useState } from "react";
import { redirect } from 'next/navigation'
import axios from "axios";
const Sign_up = () => {
  const [formData, setFormData] = useState({})

  const handlesubmit = async() =>{
    const {Username, Password} = formData
    const res = await axios.post("http://localhost:8080/register",{
      Username,
      Password
    })  
    console.log(res)
  }

  const handleChange = (event) =>{
    setFormData((prev)=>({
      ...prev,
      [event?.target.name]:event?.target.value
    }))
  }

  return (
    <div className="w-full h-screen flex ">
      <div className="basis-1/2">
        <Image
          src={sign_in_backgroud}
          alt="BirdImage"
          width={700}
          height={700}
          loading="lazy"
        />
      </div>
      <div className="basis-1/2 pt-10">
        <div className="text-3xl w-[70%] pb-10 leading-relaxed">
          There are over 10,000 known bird species in the world, found in every
          habitat imaginable.
        </div>
        <div className="w-fit rounded-xl px-10 pt-10 pb-6 flex flex-col justify-center border-2 border-white">
          <div className="flex w-fit justify-center text-4xl flex-col font-bold text-center pb-10">
            Unlock the World of <span className="pt-2">Wings</span>
          </div>
          <form className="flex flex-col">
            <div>
              <div className="text-xl pb-2 ">Email Id:</div>
              <input
                className="w-full bg-transparent border-b-2 text-white text-xl outline-none pb-2"
                type="email"
                onChange={handleChange}
                name="Username"
              />
            </div>
            <div>
              <div className="text-xl pb-2 pt-6">Password:</div>
              <input
                className="w-full bg-transparent border-b-2 text-white text-xl outline-none pb-2"
                type="password"
                onChange={handleChange}
                name="Password"
              />
            </div>
            <div className=" w-full flex justify-center pt-8">
              <button className="rounded-xl bg-[#0000FF] text-white text-xl px-8 py-2" onClick={handlesubmit}>
                Let's Flock Together !
              </button>
            </div>
            <Link href="/sign_in" className="pt-4 text-blue">Alredy have an account</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_up;
