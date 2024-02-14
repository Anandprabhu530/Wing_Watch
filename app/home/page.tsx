const Home = () =>{
  return(
    <div className="w-[50%] mx-auto border-2 border-white h-screen flex">
      <div className="basis-1/3 border-2 border-white">
        <div className="flex flex-col pt-10 items-center gap-6">
          <div>Profile</div>
          <div>Settings</div>
          <div>Search</div>
        </div>
      </div>
      <div className="basis-2/3 border-2 border-white ">
          <div className="border-2 p-4 border-white h-full">
            <div className="flex flex-col p-4 border-2 border-red-400">
              <div className="flex justify-between">
                <div>Name</div>
                <div>Location</div>
              </div>
              <div>Post</div>
              <div className="flex flex-col">
                <div>By~~</div>
                <div>Description</div>
              </div>
            </div>
          </div>
       
      </div>
    </div>
  )
}

export default Home;