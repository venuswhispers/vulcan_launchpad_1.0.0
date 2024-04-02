"use client"
import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react/dist/iconify.js";

const Sider = () => {

  const { theme, setTheme } = useTheme();

  const _renderThemeSwitch = () => (
    <div className="relative flex bg-[#EFF3FF] dark:bg-[#050606] rounded-xl w-full px-2 py-1 mt-4">
      <div className={`absolute left-1 dark:left-[calc(50%-4px)] rounded-lg h-[calc(100%-8px)] w-[50%] z-0 bg-gradient-to-r from-[#FF6802] to-[#EE0E72]  transition-[left] duration-200`}>
      </div>
      <div onClick={() => setTheme("dark")} className={`flex z-10 justify-center cursor-pointer items-center gap-2 dark:text-[#6F767E] text-white text-sm px-2 py-1 w-1/2`}>
        <Image
          src={ theme !== "dark" ? "/images/sun.svg" : "/images/sun-light.svg" }
          width={24}
          height={24}
          alt={"sun"}   
          priority={true}    
        />
        Light
      </div>
      <div onClick={() => setTheme("light")} className={`flex z-10 justify-center cursor-pointer items-center gap-2 text-[#6F767E] dark:text-white text-sm px-2 py-1 w-1/2`}>
        <Image
          src={ theme !== "dark" ? "/images/moon-light.svg" : "/images/moon.svg" }
          width={24}
          height={24}
          alt={"sun"}    
          priority={true}   
        />
        Dark
      </div>
    </div>
  )

  return (
    <div className="flex flex-col justify-between bg-white dark:bg-[#100E28] w-[252px] border-2 border-[#E3E3E3] dark:border-[#100E28] rounded-xl">
      <div>
        <div className="flex justify-center items-center border-b-2 border-[#E3E3E3] dark:border-none p-6">
          <Image
            src={ theme !== "dark" ? "/images/logo.dark.svg" : "/images/logo.svg" }
            width={110}
            height={110}
            alt={"sun"}   
            priority={true}    
          />
        </div>
      </div>
      <div className="p-6">
        { _renderThemeSwitch() }
        <h2 className="text mt-2 px-2">Insigts</h2>
        <div className="flex justify-between items-center mt-3 px-1">
          <div className="text flex gap-2 items-center"><Icon icon="tabler:message-circle" width={30} hFlip/><span>Inbox</span></div>
          <div className="p-1 px-2 rounded-md text-white bg-[#FF3E46]">8</div>
        </div>
      </div>
    </div>
  );
};

export default Sider;
