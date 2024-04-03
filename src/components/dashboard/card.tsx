"use client"
import React from "react";
import Image from "next/image";
import Progress from "@/components/dashboard/utils/progress";
import { Icon } from "@iconify/react/dist/iconify.js";

const Card = () => {
  return (
    <div className="w-full dark:bg-[#100E28] bg-white p-4 rounded-2xl">
      <section id="logo" className="relative w-full">
        <Image
          src={'/images/spade.png'}
          // className={`${className} ${isImageLoading ? 'hidden' : 'block'}`}
          width={0}
          alt=''
          height={0}
          sizes="100vw"
          className='w-full h-full aspect-[2/1] rounded-[19px]'
        />
        <div className="absolute right-4 -translate-y-1/2 w-1/6 p-1 bg-white rounded-[30%]">
          <Image
            src={'/images/mini-avatar.png'}
            width={0}
            height={0}
            alt='mini-logo'
            sizes="100vw"
            className='w-full h-full rounded-[30%]'
          />
        </div>
        <div className="absolute flex gap-1 items-center p-2 left-3 bottom-3 rounded-full bg-[#00000069] backdrop-filter backdrop-blur-[5px]">
          <Image
            src={'/images/usdt.png'}
            width={22}
            height={22}
            alt='mini-logo'
            className="rounded-full"
          />
          <span className="text-xs text-white pr-2">9.04 USDT</span>
        </div>
      </section>

      <section id="live" className="mt-5 flex">
        <div className="text-xs flex gap-3 items-center bg-[#D2FAE5] dark:bg-black dark:text-white px-3 py-[6px] rounded-full">
          <span>Sale Live</span>
          <div className="w-2 h-2 bg-[#0CAF60] rounded-full"></div>
        </div>
      </section>

      <h2 className="mt-2 font-bold text-black dark:text-white text-[15px]">CryptoSI DAO</h2>
      <h5 className="text-[] dark:text-[#868686] text-xs mt-1">Fair Launch</h5>

      <section id="title" className="gap-2 mt-4 flex items-center">
        <Image
          src={'/images/usdt.png'}
          width={22}
          height={22}
          alt='mini-logo'
          className="rounded-full"
        />
        <span className="text-[15px] font-bold text-[#1BA9F8]">9.04 USDT</span>
      </section>

      <section id="progress" className="mt-3 text-[#868686]">
        <h2 className="text-sm mb-2">
          Progress (56.71 %)
        </h2>
        <Progress percent={56.71}/>
        <div className="mt-2 flex justify-between text-sm">
          <span>56.23435356464 ETH</span>
          <span>1 ETH</span>
        </div>
      </section>

      <section id="liquidity%" className="flex justify-between text-black dark:text-[#C0C0C0] text-sm mt-5">
        <span>Liquiduty %:</span>
        <span>55%</span>
      </section>
      <section id="LockupTime" className="flex justify-between text-black dark:text-[#C0C0C0] text-sm mt-1">
        <span>Lockup Time:</span>
        <span>365 days</span>
      </section>

      <section id="actions" className="mt-5 max-w-1/2 flex justify-between items-center text-xs">
        <div className="flex truncate items-center gap-2 rounded-full bg-[#E5EBFF] dark:bg-black p-2 pr-3 text-[#0776DA] dark:text-white">
          <Icon icon="fa6-regular:clock" width={22}/>
          <span className="truncate">10:40:57</span>
        </div>

        <section className="flex gap-[6px]">
          <button className="dark:bg-[#020110] bg-[#E5EBFF] px-[10px] rounded-xl hover:opacity-60">
            <Icon icon="mdi:bell-outline" width={22} className="text-[#2B6EC8]"/>
          </button>
          <button className="dark:bg-[#020110] bg-[#E5EBFF] px-[10px] rounded-xl hover:opacity-60">
            <Icon icon="ph:heart-bold" width={22} className="text-[#2B6EC8]"/>
          </button>
          <button className="rounded-2xl truncate bg-[#2B6EC8] px-5 text-white py-3">View</button>
        </section>
      </section>
    </div>
  )
};

export default Card;
