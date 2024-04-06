"use client"
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { Dropdown } from "flowbite-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {

  const _renderWalletConnectButton = () => (
    <div className="flex gap-1 sm:gap-2 text-sm font-bold">
      <div className="founded-full p-[5px] flex items-center dark:bg-black rounded-full dark:text-[#5D5F68] hover:dark:text-white cursor-pointer">
        <Image
          src={"/images/eth.png"}
          width={32}
          height={32}
          alt={"wallet"}   
          priority={true}    
          className="rounded-full"
        />
        <div className="pl-2 pr-3 truncate md:inline hidden">ETH MAINNET</div>
      </div>
      <div className="founded-full p-[5px] flex items-center dark:bg-black rounded-full dark:text-[#5D5F68] hover:dark:text-white cursor-pointer">
        <Image
          src={"/images/man.png"}
          width={32}
          height={32}
          alt={"wallet"}   
          priority={true}    
          className="rounded-full"
        />
        <div className="pl-2 pr-3 truncate md:inline hidden">7.00096 <span className="text-[#45B26B]">ETH</span></div>
      </div>
    </div>
  )

  return (
    <div className="flex items-center flex-none gap-3 sm:gap-6 p-4 text-black dark:text-white w-full justify-between bg-white dark:bg-[#100E28] border-2 border-[#E3E3E3] dark:border-[#100E28] rounded-xl">
      
      <ul className="hidden sm:flex md:hidden lg:flex text-sm text-[#777E90] dark:text-white items-center gap-9">
        <li className="cursor-pointer hover:opacity-60 truncate">Discover</li>
        <li className="cursor-pointer hover:opacity-60 truncate">How it work</li>
      </ul>
      <Dropdown label="Dropdown button" renderTrigger={() => <Icon icon="foundation:list" className="inline sm:hidden md:inline lg:hidden hover:opacity-60 cursor-pointer" width={25}/>}>
        <Dropdown.Item>Discover</Dropdown.Item>
        <Dropdown.Item>How it work</Dropdown.Item>
      </Dropdown>

      <div className="flex gap-1 sm:gap-6 items-center">
        <div className="relative mr-2">
          <Icon icon="ph:bell-thin" width={22}/>
          <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-[#45B26B] border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900"></div>
        </div>
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            className="bg-white transition-all text-[12px] p-3 dark:bg-[#020111] w-full rounded-lg text-blue-gray-700 font-sans font-normal border-[#98bdea3d] dark:border-none outline-none focus:ring-1 focus:ring-[#8ca8cba2] focus:border-[#8ca8cba2] border"
            placeholder="" 
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
          />
        </div>
        {/* {  _renderWalletConnectButton () } */}
        <ConnectButton/>
      </div>


    </div>
  );
};

export default Header;
