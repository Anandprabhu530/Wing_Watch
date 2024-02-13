import Image from "next/image";
import sign_in_backgroud from "../../sign_in_backgroud.jpg";

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
      <div className="basis-1/2 pt-20">
        <div className="text-4xl w-[70%] pb-20 leading-relaxed">
          Birds evolved from dinosaurs around 150 million years ago, making them
          living dinosaurs!
        </div>
        <div className="w-fit rounded-xl p-10 flex flex-col justify-center border-2 border-white">
          <div className="flex w-fit justify-center text-4xl flex-col font-bold text-center pb-10">
            Unlock the World of <span className="pt-2">Wings</span>
          </div>
          <form className="flex flex-col gap-10">
            <div>
              <div className="text-xl pb-2">Email Id:</div>
              <input
                className="w-full bg-transparent border-b-2 text-white text-xl outline-none pb-2"
                type="email"
              />
            </div>
            <div>
              <div className="text-xl pb-2">Password:</div>
              <input
                className="w-full bg-transparent border-b-2 text-white text-xl outline-none pb-2"
                type="password"
              />
            </div>
            <div className=" w-full flex justify-center">
              <div className="border-2 rounded-xl bg-white text-black text-xl font-bold px-8 py-2 border-white">
                Login
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_In;
