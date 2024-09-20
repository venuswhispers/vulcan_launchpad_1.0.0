"use client"
import React from "react";
import { useRouter, usePathname } from "next/navigation";

interface INav {
  title: string,
  url: string
}

const navs = [
  {title: 'Current ICOs', url: '/'},
  {title: 'Liked ICOs', url: '/like'}
]

const Header = () => {

  const router = useRouter ();
  const pathname = usePathname ();

  const [current, setCurrent] = React.useState<string>("All Launchpads");

  const _renderMenuItem = ({title, url}: INav) => (
    <button onClick={() => router.push(url)} key={title} className={`text-sm truncate text-nowrap cursor-pointer py-2 px-4 rounded-full font-bold dark:text-[#777E90] text-[#777E90] hover:opacity-60 ${pathname === url && 'bg-[#2B6EC8] !text-white'}`}>{title}</button>
  )

  return (
    <div className="flex w-full justify-center flex-col sm:flex-row md:flex-col lg:flex-row dark:bg-[#100E28] bg-white sm:!bg-inherit rounded-3xl p-[6px]">
      { navs.map((item: INav) => _renderMenuItem(item)) }  
    </div>
  );
};

export default Header;
