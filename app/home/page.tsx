const Home = () => {
  return (
    <div>
      <div className="border-2 p-4 border-white h-full">
        <div className="flex flex-col p-4 border-2 border-red-400">
          <div className="flex justify-between">
            <div>Bird Name:</div>
            <div>Location:</div>
          </div>
          <div>Post</div>
          <div className="flex flex-col">
            <div>Created By ~~</div>
            <div>No of Wings</div>
            <div>Description</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
