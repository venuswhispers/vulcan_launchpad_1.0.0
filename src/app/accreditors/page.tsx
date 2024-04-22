"use client";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";


const Evangilists = () => {

  const [fullName, setFullName] = React.useState<string>("");
  const [link, setLink] = React.useState<string>("");
  const [bio, setBio] = React.useState<string>("");
  const [isInvalid, setIsInvalid] = React.useState<boolean>(false);

  const _renderItem = () => (
    <section className="grid grid-cols-1 sm:grid-cols-[40%_60%] md:grid-cols-1 w1080:grid-cols-[40%_60%] gap-3 mt-5 border-t border-[#EFEFEF] pt-5 dark:border-[#efefef1f]">
      <div className="flex gap-2 items-center">
        <div className="w-[150px] aspect-ratio">
          <Image
            src={'/images/hr.png'}
            width={0}
            alt=''
            height={0}
            sizes="100vw"
            className='w-full h-full rounded-lg'
          />
        </div>
        <div className="text-[#1A1D1F] dark:text-[#CCCCCC] text-sm">
          <h2>Atlantis: the Deluxe Edition, 5-book</h2>
          <p className="flex gap-2 items-center">Omnibus<Icon icon="noto:fire" width={20}/></p>
          <div className="flex gap-1 items-center text-black mt-2">
            <span className="p-[7px] cursor-pointer hover:opacity-60 rounded-full bg-[#EFEFEF]"><Icon icon="iconoir:facebook" width={13} height={13}/></span>
            <span className="p-[7px] cursor-pointer hover:opacity-60 rounded-full bg-[#EFEFEF]"><Icon icon="iconoir:twitter" width={13} height={13}/></span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 text-xs gap-1">
        <div className="flex items-start">
          <div className="dark:text-[#12C36D] text-[#1A1D1F] p-2 rounded-lg bg-[#B5E4CA] dark:bg-[#b5e4ca17]">US$ 107.701</div>
        </div>
        <div className="flex items-start">
          <div className="dark:text-[#12C36D] text-[#1A1D1F] p-2 rounded-lg bg-[#B5E4CA] dark:bg-[#b5e4ca17]">US$ 107.701</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-start gap-2 items-center">
            <div className="dark:text-[#999999] text-[#1A1D1F] p-2 rounded-lg bg-[#EFEFEF] dark:bg-[#020206]">26</div>
            <span className="w-12 h-3 bg-[#FF6A55] rounded-sm"></span>
          </div>
          <div className="text-sm -mt-2 rounded-lg p-1 flex gap-1 items-center px-2 text-[#83BF6E]"><Icon icon="ph:arrow-up-bold"  width={15} height={15} /> <span>37.8%</span></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-start gap-2 items-center">
            <div className="dark:text-[#999999] text-[#1A1D1F] p-2 rounded-lg bg-[#EFEFEF] dark:bg-[#020206]">256</div>
            <span className="w-12 h-3 bg-[#FF6A55] rounded-sm"></span>
          </div>
          <div className="text-sm -mt-2 rounded-lg p-1 flex gap-1 items-center px-2 text-[#83BF6E]"><Icon icon="ph:arrow-up-bold" width={15} height={15} /> <span>37.8%</span></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-start gap-2 items-center">
            <div className="dark:text-[#999999] text-[#1A1D1F] p-2 rounded-lg bg-[#EFEFEF] dark:bg-[#020206]">15</div>
            <span className="w-3 h-3 bg-[#2A85FF] rounded-sm"></span>
          </div>
          <div className="text-sm -mt-2 rounded-lg p-1 flex gap-1 items-center px-2 text-[#83BF6E]"><Icon icon="ph:arrow-up-bold"  width={15} height={15} /> <span>37.8%</span></div>
        </div>
      </div>
    </section>
  )

  return (
    <div className="flex w-full flex-col gap-2 text-[#141416] dark:text-[#FAFCFF]">
      <h1 className="text-lg px-1">Elons Endorsements</h1>

      <div className="dark:bg-[#100E28] bg-white px-3 xs:px-6 py-6 rounded-xl">
        Coming Soon
      </div>
      
      {/* <div className="dark:bg-[#100E28] bg-white px-3 xs:px-6 py-6 rounded-xl">
        <section className="mt-5 gap-7 w1080:gap-3 items-center grid grid-cols-1 w1080:grid-cols-3">
          <div className="flex gap-2 items-center justify-center w1080:justify-start">
            <Image
              src={'/images/elon.png'}
              width={100}
              alt=''
              height={100}
              className='rounded-full bg-[#FFBC99]'
            />
            <div>
              <h2 className="dark:text-[#cccccc] text-[#1A1D1F]">Chelsie Haley</h2>
              <h2 className="dark:text-[#6F767E] text-[#6F767E] text-xs">Dream big. Think different. Do great!</h2>
              <div className="flex gap-1 items-center text-black mt-2">
                <span className="p-[7px] cursor-pointer hover:opacity-60 rounded-full bg-[#EFEFEF]"><Icon icon="iconoir:facebook" width={13} height={13}/></span>
                <span className="p-[7px] cursor-pointer hover:opacity-60 rounded-full bg-[#EFEFEF]"><Icon icon="streamline:linkedin" width={13} height={13}/></span>
                <span className="p-[7px] cursor-pointer hover:opacity-60 rounded-full bg-[#EFEFEF]"><Icon icon="fa6-brands:instagram" width={13} height={13}/></span>
                <span className="p-[7px] cursor-pointer hover:opacity-60 rounded-full bg-[#EFEFEF]"><Icon icon="iconoir:twitter" width={13} height={13}/></span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 justify-center py-3 w1080:py-0 border-t w1080:border-t-0 w1080:border-l border-[#EFEFEF] dark:border-[#efefef1c]">
            <div>
              <div className="bg-[#B5E4CA] p-2 rounded-full text-black"><Icon icon="mingcute:user-4-line" width={25}/></div>
            </div>
            <div>
              <div className="text-[#6F767E] flex gap-1"><span className="text-sm">Score</span><Icon icon="fluent:info-12-filled" /></div>
              <h2 className="dark:text-[#cccccc] -mt-2 text-[#1A1D1F] text-[45px] font-bold">88</h2>
              <div className="bg-[#020111] text-sm -mt-2 rounded-lg p-1 flex gap-1 items-center px-2 dark:text-[#6F767E] text-[#6F767E]"><Icon icon="ph:arrow-up-bold" /> <span className="text-[#83BF6E]">37.8%</span> this week</div>
            </div>
          </div>
          <div className="flex gap-3 justify-center py-3 w1080:py-0 border-t w1080:border-t-0 w1080:border-l border-[#EFEFEF] dark:border-[#efefef1c]">
            <div>
              <div className="bg-[#CABDFF] p-2 rounded-full text-black"><Icon icon="iconamoon:swap-light" width={25}/></div>
            </div>
            <div>
              <div className="text-[#6F767E] flex gap-1"><span className="text-sm">ROI</span><Icon icon="fluent:info-12-filled" /></div>
              <h2 className="dark:text-[#cccccc] -mt-2 text-[#1A1D1F] text-[45px] font-bold">43%</h2>
              <div className="bg-[#020111] text-sm -mt-2 rounded-lg p-1 flex gap-1 items-center px-2 dark:text-[#6F767E] text-[#6F767E]"><Icon icon="ph:arrow-up-bold" /> <span className="text-[#83BF6E]">37.8%</span> this week</div>
            </div>
          </div>
        </section>
      </div>

      <div className="flex sm:flex-row flex-col sm:gap-2 gap-0 w-full justify-center mt-1 mb-3 text-sm">
        <button className="bg-[#2B6EC8] rounded-lg py-[10px] px-4 text-white hover:bg-[#2b35c8] font-bold mt-3">Current endorsements</button>
        <button className="rounded-lg py-[10px] border border-[#d4d4d4a1] px-4 text-[#777E90] hover:bg-[#2b35c8] font-bold mt-3">Past endorsements</button>
        <button className="rounded-lg py-[10px] border border-[#d4d4d4a1] px-4 text-[#777E90] hover:bg-[#2b35c8] font-bold mt-3">Future endorsements</button>
      </div>

      <div className="dark:bg-[#100E28] bg-white px-3 xs:px-6 py-6 rounded-xl">
        <div className="flex gap-3 items-center">
          <div className="bg-[#4285EC] w-3 h-6 rounded-sm"></div>
          <h3 className="dark:text-[#CCCCCC] text-[#1A1D1F]">
            Current endorsements
          </h3>
        </div>
        
        <section className="grid grid-cols-1 sm:grid-cols-[40%_60%] md:grid-cols-1 w1080:grid-cols-[40%_60%] gap-3 mt-5 -mb-3 dark:text-[#CCCCCC] text-[#1A1D1F] text-sm">
          <div>
            Project Name
          </div>
          <div className="grid grid-cols-5 text-xs gap-1">
            <span>Sale price</span>
            <span>Current price</span>
            <span>ATH</span>
            <span>ATL</span>
            <span>% UP/DOWN</span>
          </div>
        </section>
        { _renderItem () }
        { _renderItem () }
        { _renderItem () }
        { _renderItem () }
        { _renderItem () }

      </div> */}
       
    </div>
  );
};

export default Evangilists;
