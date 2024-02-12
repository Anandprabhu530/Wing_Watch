import Image from "next/image";
import bird from "../bird.jpg";

export default function Home() {
  return (
    <div>
      <div className="h-screen overflow-hidden">
        <div className="flex">
          <Image
            src={bird}
            alt="BirdImage"
            width={1000}
            height={1000}
            loading="lazy"
          />
          <div className="h-screen w-full flex items-center text-[150px] font-bold absolute">
            Enter the world of birds
          </div>
        </div>
      </div>
    </div>
  );
}
