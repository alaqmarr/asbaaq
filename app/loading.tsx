import React from "react";
import logo from "@/app/logo2.jpg";
import Image from "next/image";

const Loading = () => {
  return (
    <main className="h-full flex flex-col items-center justify-center">
      <Image
        src={logo.src}
        alt="HSB Secunderabad"
        width={100}
        height={100}
        className="rounded-md"
      />
      <div className="loading-wave">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
    </main>
  );
};

export default Loading;
