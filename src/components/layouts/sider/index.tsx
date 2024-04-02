"use client"
import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react/dist/iconify.js";
import { setConfig } from "next/config";

interface INav {
  title: string,
  url: string,
  icon: string
}

const navs: INav[] = [
  { title: "Dashboard", url: "/", icon: "radix-icons:dashboard" },
  { title: "Projects", url: "/projects", icon: "bi:gem" },
  { title: "News", url: "/news", icon: "emojione-monotone:newspaper" },
  { title: "Videos", url: "/videos", icon: "fluent:video-clip-28-regular" },
  { title: "Evangalists", url: "/evangalists", icon: "ph:user-circle-light" },
  { title: "Accreditors", url: "/accreditors", icon: "ph:user-circle-light" },
  { title: "Help", url: "/help", icon: "lucide:badge-help" },
]

const Sider = () => {

  const { theme, setTheme } = useTheme();
  const [current, setCurrent] = React.useState<string>("Dashboard");
  const [isCollapse, setIsCollapse] = React.useState<boolean>(true);

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

  const _renderNavItem = ({ title, icon, url }: INav) => (
    <li key={title} onClick={() => setCurrent(title)} className={`w-full px-5 flex gap-2 items-center text-black dark:text-white text-[15px] py-[10px] ${title === current && 'bg-[#2B6EC8] !py-4 font-bold !text-white my-1'}  rounded-2xl cursor-pointer hover:font-bold`}>
      <Icon icon={icon} width={22}/> {title}
    </li>
  )

  const handleCollapse = () => {
    setIsCollapse(prev => !prev);
  }

  return (
    <>
      { !isCollapse && <div onClick={handleCollapse} className="fixed md:hidden top-0 left-0 right-0 bottom-0 backdrop-filter backdrop-blur-[10px]"></div> }
      <div className={`fixed ${isCollapse ? '-left-[252px]' : 'left-4'} transition-all duration-200 bottom-4 z-10 top-4 md:static md:flex md:overflow-auto flex-none flex-col justify-between bg-white dark:bg-[#100E28] w-[252px] border-2 border-[#E3E3E3] dark:border-[#100E28] rounded-xl sider`}>
        <div className="w-full h-full overflow-y-scroll sider">
          <div>
            <div className="flex justify-center items-center border-b-2 border-[#E3E3E3] dark:border-[#100E28] p-6">
              <Image
                src={ theme !== "dark" ? "/images/logo.dark.svg" : "/images/logo.svg" }
                width={110}
                height={110}
                alt={"sun"}   
                priority={true}    
              />
            </div>
            <div className="flex justify-center items-center flex-col mt-4">
              <Image
                src="/images/man.png"
                width={70}
                height={70}
                alt={"avatar"}  
                className="rounded-3xl" 
                priority={true}    
              />
              <h3 className="text-black font-sans dark:text-white font-bold mt-3 text-lg">Erfan Amade</h3>
              <div className="text-sm text mt-1 flex items-center gap-1"><span>verified</span><Icon className="text-[#0CAF60] text-[18px]" icon="ic:baseline-verified" /></div>
            </div>

            <ul className="mt-4 p-6">
              { navs.map((_nav: INav) => _renderNavItem(_nav)) }
            </ul>
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
        <Icon onClick={handleCollapse} icon="material-symbols:arrow-forward-ios" width={30} className={`absolute cursor-pointer hover:opacity-60 right-0 top-1/2 translate-x-full -translate-y-1/2 !z-50 md:hidden dark:text-white ${!isCollapse && 'hidden'}`}/>
      </div>
    </>
  );
};

export default Sider;
