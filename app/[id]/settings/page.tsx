const Settings = () =>{
    return(
        <div className="p-10 h-screen">
            <div className="text-xl font-semibold pb-8">Settings</div>
            <div className="flex gap-2 flex-col">
                <div >Change Username</div>
                <input className="bg-transparent border border-white outline-none text-white p-2 rounded-md"/>
                <div className="flex justify-end w-full pt-4">
                    <button className="bg-blue-400 rounded-md p-2 w-fit">Change Username</button>
                </div>
                <div>Change Password</div>
                <input className="bg-transparent border border-white outline-none text-white p-2 rounded-md"/>
                <div>Confirm Password</div>
                <input className="bg-transparent border border-white outline-none text-white p-2 rounded-md"/>
                <div className="flex justify-end w-full pt-4">
                    <button className="bg-blue-400 rounded-md p-2 w-fit">Change Password</button>
                </div>
            </div>
        </div>
    )
}

export default Settings;