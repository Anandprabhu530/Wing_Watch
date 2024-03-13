"use client"

import { useEffect } from "react"
import { sampledata } from "../_components/data"


const Profile = () =>{
    useEffect(()=>{
        const res = async() => await fetch("https://localhost:8080/fetch_profile_data",{
      method: "POST",
      body: JSON.stringify()
    })
    },[])
    return(
        <div className="w-full h-screen p-10">
            <div className="flex flex-col gap-4">
            <div className="font-semibold text-xl">UserName here</div>
            <div>Total posts : {sampledata.length}</div>
            <div className="grid grid-cols-2 gap-4">{sampledata.map((solodata)=>{return(
                <img className="object-cover border border-white rounded-xl" src={solodata.ImageUrl} key={solodata.ImageUrl}/>
            )})}
            </div>
            </div>
        </div>
    )
}

export default Profile