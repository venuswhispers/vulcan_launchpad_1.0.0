"use client";
import React from "react";
import Header from "@/components/dashboard/header";
import { Icon } from "@iconify/react/dist/iconify.js";
import InputInfo from "@/components/dashboard/create/atoms/infoInput";
import InputCap from "@/components/dashboard/create/atoms/capInput";
import InputDecimal from "@/components/dashboard/create/atoms/decimalInput";
import { Tooltip } from 'flowbite-react';
import ClipboardCopier from "@/components/share/clipCopier";

import Datepicker from "@/components/dashboard/create/atoms/datePicker";
import Description from "@/components/dashboard/create/atoms/descriptionInput";
import Image from "next/image";
import { useAtom } from "jotai";
import Uploader from "@/components/dashboard/create/atoms/dragFileUploader";
// import Croper from "@/components/dashboard/create/croper";
import useToastr from "@/hooks/useToastr";
import useAuth from "@/hooks/useAuth";
import { copyToClipboard } from "@/utils";
import QRcode from "react-qr-code";

import {
  titleAtom,
  hardCapAtom,
  softCapAtom,
  youtubeLinkAtom,
  tokenPriceAtom,
  endTimeAtom,
  descriptionAtom,
  walletAtom,
  checkedAtom,
  previewAtom,
  nameAtom,
  symbolAtom,
  decimalAtom,
  addressAtom,
  priceAtom
} from "@/store";
import { Yuji_Boku } from "next/font/google";
import Preview from "./preview";
import { SetStateAction } from "jotai/vanilla";

interface IProps {
  step: number,
  setStep: React.Dispatch<SetStateAction<number>>
}

const Create = ({ step, setStep }: IProps) => {
  //atoms
  const [name, setName] = useAtom(nameAtom);
  const [symbol, setSymbol] = useAtom(symbolAtom);
  const [price, setPrice] = useAtom(priceAtom);
  const [decimal, setDecimal] = useAtom(decimalAtom);
  const [amount, setAmount] = useAtom(hardCapAtom);
  // const [address, setAddress] = useAtom(addressAtom);
  const [address, setAddress] = React.useState<string>("0x29f95970cd0dd72Cd7D6163B78693Fe845dAF796");
  const [wallet, setWallet] = useAtom(walletAtom);
  //states
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [checked, setChecked] = React.useState<boolean>(false);
  //toastr
  const { showToast } = useToastr ();
  //hooks
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
    await copyToClipboard (String(address));
  }
  
  return (
    <div className="w-full">
      <h2 className="text-lg font-bold text-center">** Please send the token to the following address **</h2>
      {/* <section className="mt-5 flex flex-col gap-1">
        <div className="flex gap-2">
          <h2 className="text-[15px] text-[#6F6F6F] dark:text-[#66666E]">* Token Name:</h2>
          <h2 className="text-[15px] truncate font-bold dark:text-[#B4B4B7] text-[#101010]">{name}</h2>
        </div>
        <div className="flex gap-2">
          <h2 className="text-[15px] text-[#6F6F6F] dark:text-[#66666E]">* Token Symbol:</h2>
          <h2 className="text-[15px] truncate font-bold dark:text-[#B4B4B7] text-[#101010]">{symbol}</h2>
        </div>
        <div className="flex gap-2">
          <h2 className="text-[15px] truncate text-[#6F6F6F] dark:text-[#66666E]">* Token Price:</h2>
          <h2 className="text-[15px] break-all truncate font-bold dark:text-[#B4B4B7] text-[#101010]">{price}</h2>
        </div>
        <div className="flex gap-2">
          <h2 className="text-[15px] truncate text-[#6F6F6F] dark:text-[#66666E]">* Token Amount:</h2>
          <h2 className="text-[15px] break-all truncate font-bold dark:text-[#B4B4B7] text-[#101010]">{amount}</h2>
        </div>
        <div className="flex gap-2">
          <h2 className="text-[15px] text-[#6F6F6F] dark:text-[#66666E]">* Token Decimal:</h2>
          <h2 className="text-[15px] truncate font-bold dark:text-[#B4B4B7] text-[#101010]">{decimal}</h2>
        </div>
        <div className="flex gap-2">
          <h2 className="text-[15px] text-[#6F6F6F] dark:text-[#66666E]">* Total Supply:</h2>
          <h2 className="text-[15px] truncate font-bold dark:text-[#B4B4B7] text-[#101010]">1000000000000</h2>
        </div>
        <div className="flex gap-2 items-center">
          <h2 className="text-[15px] text-[#6F6F6F] dark:text-[#66666E]">* Your Balance:</h2>
          <h2 className="text-[15px] truncate font-bold dark:text-[#B4B4B7] text-[#101010]">10000000</h2>
        </div>
      </section> */}

      <div className="dark:text-white text-black text-sm mt-8 flex gap-1 items-center justify-center">
        <span onClick={handleCopyAddress} className="hover:underline cursor-pointer w-[100px] xs:w-auto truncate" >{address}</span> 
        <Tooltip content="Copy address" style="dark">
          <ClipboardCopier size={22} text={address}/>
        </Tooltip>
        <Tooltip content="Go to chain" style="dark">
          <Icon className='cursor-pointer' icon="fluent:open-16-filled" onClick={() => window.open(`https://sepolia.etherscan.io/address/${address }}`)} width={22} />
        </Tooltip>
      </div>

      <div className='w-full flex justify-center relative mt-5'>
          <QRcode
            value={address}
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
        <div onClick={() => setStep(1)} className="flex cursor-pointer hover:opacity-60 gap-2 items-center hover:underline"><Icon icon="ion:arrow-undo-sharp" /> Previous</div>
      </div>
    </div>
  );
};

export default Create;
