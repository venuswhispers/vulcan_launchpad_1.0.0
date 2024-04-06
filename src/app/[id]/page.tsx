"use client"
import React from "react";
import Header from '@/components/dashboard/header';
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import Displayer from "@/components/dashboard/create/atoms/quillDisplayer";

const LaunchPad = () => {
  const _renderItem = (title: string, value: string) => (
    <div className="flex h-12 gap-4 justify-between text-sm items-center border-b border-[#E6E8EC] dark:border-[#ededee1a]">
      <h2 className="text-[15px] font-bold text-[#6F6F6F] dark:text-[#CCCCCC]">{title}</h2>
      <div className="flex gap-1 items-center">
        <Image
          src={'/images/eth.svg'}
          width={20}
          alt=''
          height={20}
        />
        <div className="text-[15px] flex gap-1 font-bold dark:text-[#B4B4B7] text-[#101010]">
          <h2 className="max-w-[100px] truncate">
            { value }
          </h2>
          ETH
        </div>
      </div>
    </div>
  )
  const _renderCoolDownItem = (title: string, value: string, underline: boolean) => (
    <div className={`flex h-12 gap-4 justify-between text-sm items-center ${ underline && 'border-b' } border-[#E6E8EC] dark:border-[#ededee1a]`}>
      <h2 className="text-[15px] font-bold text-[#6F6F6F] dark:text-[#CCCCCC]">{title}</h2>
      <div className="items-center text-[15px] font-bold dark:text-[#B4B4B7] text-[#101010]">
        { value }
      </div>
    </div>
  )

  return (
    <div className="flex w-full flex-col gap-4">
      <Header/>
      
      <h1 className="text-[#141416] dark:text-[#FAFCFF] text-lg py-4 px-1">All Launchpads</h1>
      <div className="dark:bg-[#100E28] bg-white px-3 xs:px-6 py-6 rounded-xl grid grid-cols-1 gap-12 w1300:gap-8 w1300:grid-cols-[55%_calc(45%-32px)]" >
        <section>
          <div>
            <video src={"/introduction.mp4"} className='w-full h-full rounded-[19px]' autoPlay controls></video>
          </div>

          <div className="w-full px-1">
            <div className="flex justify-between mt-5 flex-col xs:flex-row items-center gap-2 xs:gap-1">
              <h3 className="dark:text-[#CCCCCC] text-[#101010] text-lg font-bold">Abstrack Plain Waves #001</h3>
              <div className="flex gap-1 items-center">
                <span className="p-2 cursor-pointer hover:opacity-60 rounded-full bg-[#EFEFEF]"><Icon icon="iconoir:facebook" width={15} height={15}/></span>
                <span className="p-2 cursor-pointer hover:opacity-60 rounded-full bg-[#EFEFEF]"><Icon icon="streamline:linkedin" width={15} height={15}/></span>
                <span className="p-2 cursor-pointer hover:opacity-60 rounded-full bg-[#EFEFEF]"><Icon icon="fa6-brands:instagram" width={15} height={15}/></span>
                <span className="p-2 cursor-pointer hover:opacity-60 rounded-full bg-[#EFEFEF]"><Icon icon="iconoir:twitter" width={15} height={15}/></span>
              </div>
            </div>
            { _renderItem ("HardCap", "12") }
            { _renderItem ("SoftCap", "10") }
            <div className="flex h-12 gap-4 justify-between text-sm items-center border-b border-[#E6E8EC] dark:border-[#ededee1a]">
              <h2 className="text-[15px] font-bold text-[#6F6F6F] dark:text-[#CCCCCC]">Current Amount raised</h2>
              <div className="flex gap-1 items-center">
                <Image
                  src={'/images/eth.svg'}
                  width={20}
                  alt=''
                  height={20}
                />
                <div className="text-[15px] flex gap-2 font-bold text-[#0CAF60] items-center">
                  <h2 className="max-w-[100px] truncate">
                    12
                  </h2>
                  ETH
                  <Icon icon="bxs:up-arrow" />
                </div>
              </div>
            </div>
            { _renderCoolDownItem ("Ending Date", "4th Agust 2024", true) }
            { _renderCoolDownItem ("Time Remaining", "12d 23h 22m 22s", false) }
            
          </div>
          <div className="mt-5 flex flex-col xs:flex-row gap-3 justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={'/images/man.png'}
                width={45}
                alt=''
                height={45}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-[#6F6F6F] dark:text-[#CCCCCC]">Owner</span>
                <span className="dark:text-[#6F6F6F] text-black">@mikhail</span>
              </div>
            </div>
            <button className="bg-[#2B6EC8] rounded-lg py-3 px-4 text-white font-bold hover:bg-[#2b35c8]">Back this project</button>
          </div>
        </section> 

        <section>
          <h1 className="text-[#23262F] dark:text-[#CCCCCC] text-2xl font-bold">Building an open digital economy</h1>
          <div className="mt-5 mb-5 aspect-[2/1] flex justify-center items-center">
            <Image
              src={'/images/intro.png'}
              width={0}
              alt=''
              height={0}
              sizes="100vw"
              className='w-full rounded-xl'
            /> 
          </div>
          <div className="mt-5 text-sm text-[#777E90]">
            <Displayer value={"<p>asdfasdfsadfasdfasdf</p><p>asdfasdfsadfasdfasdf</p><p>asdfasdfsadfasdfasdf</p><p>asdfasdfsadfasdfasdf</p><p>asdfasdfsadfasdfasdf</p><p>asdfasdfsadfasdfasdf</p><p>asdfasdfsadfasdfasdf</p>"}/>
          </div>
          <div className="border border-dashed border-[#ADADAD] rounded-lg p-4 mt-5">
            <div className="flex gap-4">
              <Image
                src={'/images/quote.svg'}
                width={40}
                alt='quote'
                height={40}
              />
              <div className="text-[#010914] dark:text-[#CCCCCC] text-sm">cryptocurrency will change market structures, and maybe even the architeecture of the internet itself.</div> 
            </div>
            <div className="border-l-[3px] pl-3 mt-2 border-[#0CAF60]">
              <h2 className="dark:text-[#CCCCCC] text-[#010914] text-[15px] font-bold">Michael Saylor</h2>
              <h2 className="text-[#A4A8AB] text-[12px]">Business owner</h2>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
};

export default LaunchPad;
