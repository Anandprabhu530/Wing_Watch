/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useState } from "react"
import axios from "axios"

const Profile = () =>{
    const [data,setData] = useState([])
    const [user,setUser] = useState("")
    useEffect(()=>{
        const Username = localStorage.getItem('username')
        const res = async() => await axios.post("http://localhost:8080/profile",
            {Username}
        ).then((data)=>setData(data.data.data))
        res()
        setUser(Username?.slice(0,Username.indexOf('@')))
    },[])
    
    return(
        <div className="w-full h-screen p-10 ">
            <div className="flex flex-col gap-4">
            <div className="font-semibold text-xl">{user}</div>
            <div>Total posts : {data.length}</div>
            <div className="grid grid-cols-1 gap-4">
                {data.length!==0 && data.map((post)=>{
                    return(
                        <div className="p-4 h-full" key={post.Url}>
                        <div className="flex flex-col py-4 px-6 bg-[#383838] rounded-xl shadow-lg ">
                            <div className="flex justify-between">
                                <div className="text-xl py-2 font-semibold">{post.BirdName}</div>
                                <div className="flex items-center "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}     stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                <div>{post.Location}</div>
                            </div>
                        </div>
                        <img src={post.Url} className="rounded-xl"/>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 pt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"   className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                                </svg>
                                <div>{post.Wings} Wings</div>
                            </div>
                            <div>{post.Description}</div>
                        </div>
                        </div>
                    </div>
                    )
                })}
            </div>
            </div>
        </div>
    )
}

export default Profile