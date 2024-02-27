const Profile = () =>{
    return(
        <div className="border border-white w-full h-screen p-10">
            <div className="flex flex-col gap-4">
            <div className="font-semibold text-xl">UserName here</div>
            <div>Total posts : 34</div>
            <div className="grid grid-cols-2 gap-4">
                <div className="border border-white">Hello World</div>
                <div className="border border-white">Hello World</div>
                <div className="border border-white">Hello World</div>
                <div className="border border-white">Hello World</div>
                <div className="border border-white">Hello World</div>
            </div>
            </div>
        </div>
    )
}

export default Profile