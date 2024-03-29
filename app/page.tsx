import Image from "next/image";
import bird from "../app/bird.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-poppins">
      <div className="h-screen overflow-hidden">
        <div className="flex z-10">
          <Image
            src={bird}
            alt="BirdImage"
            width={1000}
            height={1000}
            loading="lazy"
          />
          <div className="h-screen w-full from-[#2c2c2c] bg-gradient-to-l  flex items-center text-transparent text-[180px] absolute pl-32 customhometext">
            Enter the<br></br> birds
            <span className="text-white absolute right-[220px] top-[210px]">
              World of
            </span>
          </div>
          <div className="text-3xl w-full justify-center items-center flex gap-8 z-10">
            <Link href="/sign_in" className="border-2 border-white rounded-xl px-4 py-2">
              Login
            </Link>
            <Link href="/sign_up" className="border-2 border-white rounded-xl px-4 py-2 font-semibold bg-white text-black">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
