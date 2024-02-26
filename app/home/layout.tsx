import Link from 'next/link'

const Homelayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-[50%] mx-auto h-screen flex">
        <div className="basis-1/3 overflow-hidden">
          <div className="flex flex-col pt-10 items-center gap-6">
            <Link href="/home">Home</Link>
            <div>Profile</div>
            <div>Settings</div>
            <div>Search</div>
            <Link href="/home/post">New Post</Link>
          </div>
        </div>
        <div className="basis-2/3 overflow-auto">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Homelayout;
