import React from "react";
import Image from "next/image";

const WelcomeScreen = () => {
  return (
    <main className="bg-[#FF642F] w-full h-screen relative">
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[20px]">
        <Image src="/Group 270.png" alt="" width={200} height={240} />
        <p className="text-[#fff]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod.
        </p>

        <div className="flex flex-col justify-center items-center gap-[5px] w-[60%]">
          {/* Log In */}
          <button
            className="
      rounded-full
      bg-[#f5cb58]
      text-[#FF642F]
      text-[14px]
      font-[700]
        outline-none
      border-none
      w-full
      py-[8px]
      transition-all
      duration-300
      ease-out
      hover:bg-transparent
      hover:text-[#fff]
      hover:border
      hover:border-white
      hover:shadow-[0_2px_10px_rgba(255,255,255,0.25)]
    "
          >
            Log In
          </button>

          {/* Sign Up */}
          <button
            className="
      rounded-full
      bg-white
      text-[#FF642F]
      text-[14px]
      font-[700]
        outline-none
      border-none
      w-full
      py-[8px]
      transition-all
      duration-300
      ease-out
      hover:bg-transparent
      hover:text-[#fff]
      hover:border
      hover:border-white
      hover:shadow-[0_2px_10px_rgba(255,255,255,0.25)]
    "
          >
            Sign Up
          </button>
        </div>
      </div>
    </main>
  );
};

export default WelcomeScreen;
