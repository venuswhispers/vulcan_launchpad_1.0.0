"use client"
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

interface IProps {
  title: string,
  softCap: string,
  hardCap: string,
  endTime: string,
  wallet: string,
  youtubeLink: string,
  tokenPrice: string,
  description: string
}

const Preview = ({ title, softCap, hardCap, endTime, wallet, youtubeLink, tokenPrice, description }: IProps) => {

  return (
    <div className="bg-[#F0F8FF] dark:bg-[#020111] rounded-2xl md:w-full w1080:max-w-[350px] px-5 py-7 flex-none">
      <h3 className="font-bold">Preview</h3>
      <div className="mt-1 mb-5">
        <Image
          src={'/images/preview.png'}
          width={0}
          alt=''
          height={0}
          sizes="100vw"
          className='w-full aspect-[1/1.5] h-full rounded-[19px]'
        />
      </div>
      {
        title ? 
        <div className="flex h-12 justify-between items-center border-b border-[#E6E8EC] dark:border-[#ededee1a]">
          <h2 className="text-[15px] font-bold text-[#23262F] dark:text-[#B4B4B7]">{title}</h2>
        </div> : 
        <div className="flex h-12 justify-between items-center py-2">
          <div className="w-full h-full animate-pulse rounded-full bg-white dark:bg-[#1D1B39]"></div>
        </div>
      }
      {
        hardCap ? 
        <div className="flex h-12 justify-between items-center border-b border-[#E6E8EC] dark:border-[#ededee1a]">
          <h2 className="text-[15px] text-[#6F6F6F] dark:text-[#66666E]">Hard Cap</h2>
          <h2 className="text-[15px] font-bold dark:text-[#B4B4B7] text-[#101010]">{hardCap} ETH</h2>
        </div> : 
        <div className="flex h-12 justify-between items-center py-2">
          <div className="w-full h-full animate-pulse rounded-full bg-white dark:bg-[#1D1B39]"></div>
        </div>
      }
      {
        softCap ? 
        <div className="flex h-12 justify-between items-center border-b border-[#E6E8EC] dark:border-[#ededee1a]">
          <h2 className="text-[15px] text-[#6F6F6F] dark:text-[#66666E]">Soft Cap</h2>
          <h2 className="text-[15px] font-bold dark:text-[#B4B4B7] text-[#101010]">{softCap} ETH</h2>
        </div> : 
        <div className="flex h-12 justify-between items-center py-2">
          <div className="w-full h-full animate-pulse rounded-full bg-white dark:bg-[#1D1B39]"></div>
        </div>
      }
      {
        endTime ? 
        <div className="flex h-12 justify-between items-center border-b border-[#E6E8EC] dark:border-[#ededee1a]">
          <h2 className="text-[15px] text-[#6F6F6F] dark:text-[#66666E]">Ending Time</h2>
          <h2 className="text-[15px] font-bold dark:text-[#B4B4B7] text-[#101010]">{ endTime }</h2>
        </div> : 
        <div className="flex h-12 justify-between items-center py-2">
          <div className="w-full h-full animate-pulse rounded-full bg-white dark:bg-[#1D1B39]"></div>
        </div>
      }
      {
        endTime ? 
        <div className="flex h-12 justify-between items-center border-b border-[#E6E8EC] dark:border-[#ededee1a]">
          <h2 className="text-[15px] text-[#6F6F6F] dark:text-[#66666E]">Time remaining</h2>
          <h2 className="text-[15px] font-bold dark:text-[#B4B4B7] text-[#101010]">{ endTime }</h2>
        </div> : 
        <div className="flex h-12 justify-between items-center py-2">
          <div className="w-full h-full animate-pulse rounded-full bg-white dark:bg-[#1D1B39]"></div>
        </div>
      }
      {/* <h5 className="text-[#777E90] text-xs py-1">Drag or choose your file to upload</h5>
      <div className="w-full text-wrap break-all" dangerouslySetInnerHTML={{__html: description}}></div> */}
    </div>
  )
};

export default Preview;