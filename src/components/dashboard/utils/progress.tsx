import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import {Tooltip} from "@nextui-org/tooltip";

interface IProps {
  fundsRaised: number,
  softcap: number,
  hardcap: number
}

const Progress = ({ fundsRaised, softcap, hardcap }: IProps) => {

  const softcapPercent = hardcap > 0 ? softcap * 100 / hardcap : 0;
  const fundsPercent = hardcap > 0 ? fundsRaised * 100 / hardcap : 0;

  return (
    <div className="relative w-full h-[6px] rounded-full bg-[#A3E0B8] dark:bg-[#2E2A5B] mt-5">
      <div className="rounded-full h-full dark:bg-white bg-[#0CAF60]" style={{ width: `${fundsPercent > 100 ? 100 : fundsPercent}%` }}></div>
      <Tooltip content={`Raised funds ${fundsRaised}ETH (${fundsPercent}%)`} className="bg-black p-2 text-white">
        <div className={`w-0 flex justify-center relative -top-[25px]`} style={{ left: `${fundsPercent > 100 ? 100 : fundsPercent}%` }}>
          <Icon icon="line-md:map-marker-alt" className="text-xl text-green-300 absolute cursor-pointer"/>
        </div>
      </Tooltip>
      <Tooltip content={`Soft cap ${softcap}ETH`} className="bg-black p-2 text-white">
        <div className={`w-0 flex justify-center relative -mt-[1px]`} style={{ left: `${softcapPercent}%` }}>
          <Icon icon="line-md:map-marker-alt" className="text-xl text-green-700 absolute cursor-pointer" vFlip={true}/>
        </div>
      </Tooltip>
    </div>
  );
};

export default Progress;
