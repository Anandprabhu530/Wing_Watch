import Image from "next/image";
import sign_in_backgroud from "../../sign_in_backgroud.jpg";
import Link from "next/link";

const Sign_In = () => {
  return (
    <div className="w-full h-screen flex overflow-hidden">
      <div className="basis-1/2">
        <Image
          src={sign_in_backgroud}
          alt="BirdImage"
          width={700}
          height={700}
          loading="lazy"
        />
      </div>
      <div className="basis-1/2 pt-10">
        <div className="text-3xl w-[70%] pb-10 leading-relaxed">
          Birds evolved from dinosaurs around 150 million years ago, making them
          living dinosaurs!
        </div>
        <div className="w-fit rounded-xl p-10 flex flex-col justify-center border-2 border-white">
          <div className="flex w-fit justify-center text-4xl flex-col font-bold text-center pb-10">
            Unlock the World of <span className="pt-2">Wings</span>
          </div>
          <form className="flex flex-col">
            <div>
              <div className="text-xl pb-2">Email Id:</div>
              <input
                className="w-full bg-transparent border-b-2 text-white text-xl outline-none pb-2"
                type="email"
              />
            </div>
            <div>
              <div className="text-xl pb-2 pt-6">Password:</div>
              <input
                className="w-full bg-transparent border-b-2 text-white text-xl outline-none pb-2"
                type="password"
              />
            </div>
            <div className=" w-full flex justify-center pt-6">
                <button className="rounded-xl bg-[#0000FF] text-white text-xl px-8 py-2 ">
                Login
              </button>
            </div>
            <Link href="/sign_up" className="pt-4 text-blue-400">Create an account</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_In;
