"use client";

import { useState } from "react";
import Image from "next/image";
import bird from "../../bird.jpg";

const ImageUpload = () => {
  const [Input, setInput] = useState(null);

  return (
    <div className="w-full ">
      <div className="w-full h-full flex justify-center items-center border border-white cursor-pointer">
        <input
          type="file"
          id="img"
          name="img"
          accept="image/*"
          className="pl-32 h-full"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
