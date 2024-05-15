"use client";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Tooltip } from '@nextui-org/react';
import Image from "next/image";
// hooks
import useAuth from "@/hooks/useAuth";
import useToastr from "@/hooks/useToastr";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
// components
import ClipboardCopier from "@/components/share/clipCopier";
import { QRCode } from 'react-qrcode-logo';
// utils
import { copyToClipboard } from "@/utils";
// atoms
import {
  icoAtom,
  amountAtom,
  nameAtom
} from "@/store";
// constants
import { CHAIN_DATA } from "@/constants/constants";
import { useActiveModifiers } from "react-day-picker";
import useActiveWeb3 from "@/hooks/useActiveWeb3";

interface IProps {
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>
}

const Create = ({ step, setStep }: IProps) => {
  //atoms
  const [ico, ] = useAtom(icoAtom);
  const [amount, ] = useAtom(amountAtom);
  //hooks
  const { showToast } = useToastr ();
  const { user, isAuthenticated } = useAuth ();
  const [tokenName] = useAtom (nameAtom);
  const { chain } = useActiveWeb3 ();
  //router
  const router  = useRouter ();
  
  const handleSave = () => {
    if (!isAuthenticated) {
      return showToast ("Connect your wallet first", "warning");
    }     
    showToast("ICO launched successfully", "success");
    setStep (3);
  }

  const handleCopyAddress =  async () => {
    showToast("Copied address to clipboard", "success");
    await copyToClipboard (String(ico));
  }
  
  return (
    <div className="w-full">
      <h2 className="text-lg font-bold text-center">** Please send at least { amount } <span className=" text-green-600">{ tokenName }</span> tokens to the following address **</h2>

      <div className="dark:text-white text-black text-sm mt-8 flex gap-1 items-center justify-center">
        <span onClick={handleCopyAddress} className="hover:underline cursor-pointer w-[100px] xs:w-auto truncate" >{ico}</span> 
        
        <ClipboardCopier size={22} text={ico}/>
        
        <Tooltip className="relative z-50 bg-black text-white p-2" content="Go to chain">
          <a href={`${CHAIN_DATA[String(chain?.id)]?.explorer}/address/${ico}`} target="_blank"><Icon className='cursor-pointer' icon="fluent:open-16-filled" width={22} /></a>
        </Tooltip>
      </div>

      <div className='w-full flex justify-center mt-5'>
        <div className="p-3 rounded-md bg-white"><QRCode quietZone={0} value={ico} logoImage={"/favicon.svg"} size={200} logoWidth={45} logoHeight={30}/></div>
      </div>
     
      <div className="flex gap-2 justify-between items-center pr-3 mt-5">
        <button onClick={() => router.push("/")} className="py-2 text-white flex items-center gap-1 rounded-lg hover:bg-blue-700 transition-all hover:ring-1 hover:ring-white hover bg-blue-500 text-sm font-bold px-4">
          <Icon icon="icon-park-solid:back" width={15} height={15} /> Return to Vulcan Pad
        </button>
        <button onClick={handleSave} className="py-2 text-white flex items-center gap-1 rounded-lg hover:bg-blue-700 transition-all hover:ring-1 hover:ring-white hover bg-blue-500 text-sm font-bold px-4">
          <Icon icon="solar:square-transfer-vertical-line-duotone" width={20} height={20} /> SAVE
        </button>
      </div>
    </div>
  );
};

export default Create;
