import Image from "next/image";
import bird from "../bird.jpg";

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
          <div className="h-screen w-full flex items-center text-[180px] font-bold absolute pl-32">
            Enter the world of birds
          </div>
        </div>
      </div>
    </div>
  );
}
