const Home = () => {
  return (
    
    <div>
      {sampledata.map((birds)=>{
      return(
      <div className="p-4 h-full" key={birds.ImageUrl}>
        <div className="flex flex-col py-4 px-6 bg-[#383838] rounded-xl shadow-lg ">
          <div className="flex justify-between">
            <div className="text-xl py-2 font-semibold">{birds.BirdName}</div>
            <div className="flex items-center "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}     stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <div>{birds.Location}</div>
            </div>
          </div>
          <img src={birds.ImageUrl} className="rounded-xl"/>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 pt-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"   className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
              </svg>
              <div>{birds.Wings}</div>
            </div>
            <div>Clicked By : {birds.CreatedBY}</div>
            <div>{birds.Description}</div>
          </div>
        </div>
      </div>
      )})}
    </div>
  );
};


const sampledata = [{
  BirdName:"Eagle",
  Location:"India",
  ImageUrl:"https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  CreatedBY:"Anand",
  Wings:342,
  Description:"A small Eagle photo from a riverside"
},
{
  BirdName:"Eagle",
  Location:"India",
  ImageUrl:"https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  CreatedBY:"Anand",
  Wings:342,
  Description:"A small Eagle photo from a riverside"
},
{
  BirdName:"Eagle",
  Location:"India",
  ImageUrl:"https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  CreatedBY:"Anand",
  Wings:342,
  Description:"A small Eagle photo from a riverside"
},
{
  BirdName:"Eagle",
  Location:"India",
  ImageUrl:"https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  CreatedBY:"Anand",
  Wings:342,
  Description:"A small Eagle photo from a riverside"
},
{
  BirdName:"Eagle",
  Location:"India",
  ImageUrl:"https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  CreatedBY:"Anand",
  Wings:342,
  Description:"A small Eagle photo from a riverside"
},
{
  BirdName:"Eagle",
  Location:"India",
  ImageUrl:"https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  CreatedBY:"Anand",
  Wings:342,
  Description:"A small Eagle photo from a riverside"
},
{
  BirdName:"Eagle",
  Location:"India",
  ImageUrl:"https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  CreatedBY:"Anand",
  Wings:342,
  Description:"A small Eagle photo from a riverside"
}]
export default Home;
