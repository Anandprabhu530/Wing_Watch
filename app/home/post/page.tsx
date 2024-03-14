'use client'

import axios from 'axios';
import React, { useState } from 'react';
// import Image from "next/image";
// import bird from "../../../bird.jpg";

// type Data = {
//   BirdName : string | null
//   Location : string |null
//   Description : string | null
// }

// const Validatedata = (data:Data) =>{
//   if(data.BirdName==="" || data.Location===""||data.Description===""){
//     console.log("Null value dont submit")
//   }
// }

// const Post = () => {
//   const [inputimage, setInputimage] = useState(null)
//   const [data,setData] = useState({BirdName :"",
//   Location : "",
//   Description : ""
//   })

//   const handleSubmit = async (event:React.FormEvent) => {
//     event.preventDefault();
//     Validatedata(data)
//     const res = await fetch("http://localhost:8080/post",{
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     console.log(res)
//   }

//   const handleChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
//     setData((prev)=>({...prev,[event.target.name]:event.target.value}))
//   }

//   return (
//     <div>
//       <form className="flex flex-col p-8 w-full" onSubmit={handleSubmit}>
//         <div>
//           <div className="text-2xl pb-4 font-medium">Name of the Bird:</div>
//           <input name="BirdName" onChange={handleChange} className="border border-white bg-transparent rounded-md w-full outline-none mb-6 text-xl p-2" />
//         </div>
//         <div>
//           <div className="text-2xl pb-4 font-medium">Location:</div>
//           <input name="Location" onChange={handleChange} className="border border-white bg-transparent rounded-md w-full outline-none mb-6 text-xl p-2" />
//         </div>
//         <div>
//           <div className="text-2xl pb-4 font-medium">Description:</div>
//           <textarea name="Description" onChange={handleChange} className="border border-white h-[225px] resize-none bg-transparent rounded-md w-full outline-none mb-6 text-xl p-2" />
//         </div>
//         <div>
//           <div className="text-2xl pb-4 font-medium">Image:</div>
//             <div className="w-full h-full flex justify-center items-center border border-white cursor-pointer">
//             <input
//               type="file"
//               id="img"
//               name="img"
//               accept="image/*"
//               className="pl-32 h-full"
//             />
//             {inputimage ? <img src={Image} alt="Bird_Image"/>:<Image src={bird} alt="Bird_Image" className="w-[200px] "/>}
//           </div>
//         </div>
//         <div className="pt-4 flex w-full justify-center items-center "> 
//           <button className="px-4 py-2 bg-[#0000FF] rounded-xl">POST</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Post;
const Post = () => {
  const [file,setfile] = useState(null)
  
  const handlechange = (event) =>{
    setfile(event?.target.files[0])
  }

  const handleSubmit = async(event) =>{
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handlechange}/>
      </form>
    </div>
  )
}

export default Post