"use client"
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Displayer from "@/components/dashboard/create/atoms/quillDisplayer";
import { useAtom } from "jotai";
import { previewAtom } from "@/store";

import {
  titleAtom,
  hardCapAtom,
  softCapAtom,
  youtubeLinkAtom,
  endTimeAtom,
  descriptionAtom,
} from "@/store";


const Preview = () => {
  // atoms
  const [preview] = useAtom(previewAtom);
  const [title, ] = useAtom(titleAtom);
  const [hardCap, ] = useAtom(hardCapAtom);
  const [softCap, ] = useAtom(softCapAtom);
  const [youtubeLink, ] = useAtom(youtubeLinkAtom);
  const [endTime, ] = useAtom(endTimeAtom);
  const [description, ] = useAtom(descriptionAtom);
  // timer
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  // states
  const [distance, setDistance] = React.useState<number>(0);
  const [collapseDescription, setCollapseDescription] = React.useState<boolean>(true);

  React.useEffect(() => {
    timerRef.current = setInterval(async () => {
      const _now = new Date().getTime();
      const _distance = new Date(Number(endTime)).getTime() - _now;
      setDistance(_distance);
      if ((_distance < 0 || isNaN(_distance)) && timerRef.current) {
        clearInterval(timerRef.current);
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      //@ts-ignore
      clearInterval(timerRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endTime]);

  const [ days, hours, minutes, seconds ] = React.useMemo(() => {
    let days: string|number = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours: string|number = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes: string|number = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds: string|number = Math.floor((distance % (1000 * 60)) / 1000);

    days = days > 9 ? days : ( days > 0 ? '0' + days : '0');
    hours = hours > 9 ? hours : ( hours > 0 ? '0' + hours : '0');
    minutes = minutes > 9 ? minutes : ( minutes > 0 ? '0' + minutes : '0');
    seconds = seconds > 9 ? seconds : ( seconds > 0 ? '0' + seconds : '0');
   
    return [days, hours, minutes, seconds];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distance])

  return (
    <div className="bg-[#F0F8FF] dark:bg-[#020111] rounded-2xl md:w-full w1080:max-w-[350px] px-5 py-7 flex-none">
      <h3 className="font-bold">Preview</h3>
      <div className="mt-5 mb-5 aspect-[1/1.5] flex justify-center items-center">
        {
          !preview ?
          <Image
            src={'/images/logo.svg'}
            width={0}
            alt=''
            height={0}
            sizes="100vw"
            className='w-4/5 rounded-[19px] animate-pulse'
          /> :
          preview.type === 'video/mp4' ? 
          <video src={preview.data} className='w-full h-full rounded-[19px]' controls></video> :
          <Image
            src={preview.data}
            width={0}
            alt=''
            height={0}
            sizes="100vw"
            className='w-full h-full object-contain'
          />
        }
      </div>
      {
        title ? 
        <div className="flex h-12 justify-between items-center border-b border-[#E6E8EC] dark:border-[#ededee1a]">
          <h2 className="text-[15px] font-bold text-[#23262F] dark:text-[#B4B4B7] max-w-[150px] truncate">{title}</h2>
          <div className="border-2 border-[#45B26B] text-[12px] py-1 px-2 rounded-sm">2.45 ETH</div>
        </div> : 
        <div className="flex h-12 justify-between items-center py-2">
          <div className="w-full h-full animate-pulse rounded-full bg-white dark:bg-[#1d1b3965]"></div>
        </div>
      }
      {
        description && description !== '<p><br></p>' ? 
        <div className={`flex gap-4 ${ !collapseDescription ? 'min-h-12' : 'h-12' } flex-col gap-3 pt-3 border-b border-[#E6E8EC] dark:border-[#ededee1a] pr-1`}>
          <div className="flex justify-between gap-5 items-center">
            <h2 className="text-[15px] text-[#6F6F6F] dark:text-[#66666E]">Dscription</h2>
            <div className="flex"><Icon icon="ooui:collapse" className="hover:opacity-60 cursor-pointer" onClick={() => setCollapseDescription(prev => !prev)} vFlip={collapseDescription}/></div>
          </div>
          { !collapseDescription && <div className="pb-3"><Displayer value={description}/></div> }
        </div> : 
        <div className="flex h-12 justify-between items-center py-2">
          <div className="w-full h-full animate-pulse rounded-full bg-white dark:bg-[#1d1b3965]"></div>
        </div>
      }
      {
        hardCap ? 
        <div className="flex h-12 gap-4 justify-between items-center border-b border-[#E6E8EC] dark:border-[#ededee1a]">
          <h2 className="text-[15px] text-[#6F6F6F] dark:text-[#66666E]">Hardcap</h2>
          <div className="flex gap-1 items-center">
            <Image
              src={'/images/eth.svg'}
              width={20}
              alt=''
              height={20}
            />
            <div className="text-[15px] flex gap-1 font-bold dark:text-[#B4B4B7] text-[#101010]">
              <h2 className="max-w-[100px] truncate">
                {hardCap} 
              </h2>
              ETH
            </div>
          </div>
        </div> : 
        <div className="flex h-12 justify-between items-center py-2">
          <div className="w-full h-full animate-pulse rounded-full bg-white dark:bg-[#1d1b3965]"></div>
        </div>
      }
      {
        softCap ? 
        <div className="flex h-12 gap-4 justify-between items-center border-b border-[#E6E8EC] dark:border-[#ededee1a]">
          <h2 className="text-[15px] text-[#6F6F6F] dark:text-[#66666E]">Softcap</h2>
          <div className="flex gap-1 items-center">
            <Image
              src={'/images/eth.svg'}
              width={20}
              alt=''
              height={20}
            />
            <div className="text-[15px] flex gap-1 font-bold dark:text-[#B4B4B7] text-[#101010]">
              <h2 className="max-w-[100px] truncate">
                {softCap} 
              </h2>
              ETH
            </div>
          </div>
        </div> : 
        <div className="flex h-12 justify-between items-center py-2">
          <div className="w-full h-full animate-pulse rounded-full bg-white dark:bg-[#1d1b3965]"></div>
        </div>
      }
      {
        endTime ? 
        <div className="flex h-12 justify-between items-center border-b border-[#E6E8EC] dark:border-[#ededee1a]">
          <h2 className="text-[15px] text-[#6F6F6F] dark:text-[#66666E]">Ending Time</h2>
          <h2 className="text-[15px] truncate max-w-[150px] text-nowrap font-bold dark:text-[#B4B4B7] text-[#101010]">{ new Date(Number(endTime)).toLocaleDateString() }</h2>
        </div> : 
        <div className="flex h-12 justify-between items-center py-2">
          <div className="w-full h-full animate-pulse rounded-full bg-white dark:bg-[#1d1b3965]"></div>
        </div>
      }
      {
        endTime ? 
        <div className="flex h-12 justify-between items-center border-b border-[#E6E8EC] dark:border-[#ededee1a]">
          <h2 className="text-[15px] text-[#6F6F6F] dark:text-[#66666E]">Time remaining</h2>
          <h2 className="text-[15px] truncate max-w-[150px] text-nowrap font-bold dark:text-[#B4B4B7] text-[#101010]">
            {`${days}d ${hours}h ${minutes}m ${seconds}s`}
          </h2>
        </div> : 
        <div className="flex h-12 justify-between items-center py-2">
          <div className="w-full h-full animate-pulse rounded-full bg-white dark:bg-[#1d1b3965]"></div>
        </div>
      }
      {
        youtubeLink ? 
        <div className="flex h-12 justify-between items-center border-b border-[#E6E8EC] dark:border-[#ededee1a]">
          <h2 className="text-[15px] grow text-[#6F6F6F] dark:text-[#66666E]">Link</h2>
          <h2 className="text-[15px] truncate max-w-[150px] sm:max-w-[200px] text-nowrap font-bold dark:text-[#B4B4B7] text-[#101010]">{ youtubeLink }</h2>
        </div> : 
        <div className="flex h-12 justify-between items-center py-2">
          <div className="w-full h-full animate-pulse rounded-full bg-white dark:bg-[#1d1b3965]"></div>
        </div>
      }
    </div>
  )
};

export default Preview;