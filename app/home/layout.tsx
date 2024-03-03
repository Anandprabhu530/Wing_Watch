import Link from 'next/link'

const Homelayout = ({ children }) => {
  return (
    <div className="flex w-full h-screen scrollbar overflow-y-auto">
      <div className='basis-2/6'></div>
      <div className='basis-3/6'>
        <div className='flex w-full'>
          <div className="basis-1/3">
            <div className="flex flex-col pt-10 items-center gap-6 fixed pl-16">
              <div className='text-xl font-semibold'>Wing Watch</div>
              <Link href="/home">Home</Link>
              <Link href="/id">Profile</Link>
              <Link href="/id/settings">Settings</Link>
              <Link href="/home/post">New Post</Link>
            </div>
          </div>
          <div className="basis-2/3  ">
            <div>{children}</div>
          </div>
        </div>
      </div>
      <div className='basis-2/6'></div>  
    </div>
  );
};

export default Homelayout;
