"use client";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Tooltip } from 'flowbite-react';
import Image from "next/image";
// hooks
import useAuth from "@/hooks/useAuth";
import useToastr from "@/hooks/useToastr";
// components
import ClipboardCopier from "@/components/share/clipCopier";
import QRcode from "react-qr-code";
// utils
import { copyToClipboard } from "@/utils";
// jotai
import { useAtom } from "jotai";
import {
  icoAtom,
  amountAtom
} from "@/store";

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
      <h2 className="text-lg font-bold text-center">** Please send at least {amount} tokens to the following address **</h2>

      <div className="dark:text-white text-black text-sm mt-8 flex gap-1 items-center justify-center">
        <span onClick={handleCopyAddress} className="hover:underline cursor-pointer w-[100px] xs:w-auto truncate" >{ico}</span> 
        <Tooltip content="Copy address" style="dark">
          <ClipboardCopier size={22} text={ico}/>
        </Tooltip>
        <Tooltip content="Go to chain" style="dark">
          <a href={`https://sepolia.etherscan.io/address/${ico}`} target="_blank"><Icon className='cursor-pointer' icon="fluent:open-16-filled" width={22} /></a>
        </Tooltip>
      </div>

      <div className='w-full flex justify-center relative mt-5'>
          <QRcode
            value={ico}
            width={100}
            height={100}
          />
          <Image
            src={'/favicon.svg'}
            width={60}
            height={60} 
            alt={"logo"}
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'  
          />
      </div>
     
      <div className="flex gap-2 justify-between items-center pr-3 mt-5">
        <button onClick={handleSave} className="py-2 text-white flex items-center gap-1 rounded-lg hover:bg-blue-700 transition-all hover:ring-1 hover:ring-white hover bg-blue-500 text-sm font-bold px-4">
          <Icon icon="solar:square-transfer-vertical-line-duotone" width={20} height={20} /> Next
        </button>
      </div>
    </div>
  );
};

export default Create;
