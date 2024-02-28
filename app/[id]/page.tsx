import { sampledata } from "../_components/data"

const Profile = () =>{
    return(
        <div className="border border-white w-full h-screen p-10">
            <div className="flex flex-col gap-4">
            <div className="font-semibold text-xl">UserName here</div>
            <div>Total posts : {sampledata.length}</div>
            <div className="grid grid-cols-2 gap-4">{sampledata.map((solodata)=>{return(
                <img className="object-cover border border-white" src={solodata.ImageUrl} key={solodata.ImageUrl}/>
            )})}
            </div>
            </div>
        </div>
    )
}

export default Profile