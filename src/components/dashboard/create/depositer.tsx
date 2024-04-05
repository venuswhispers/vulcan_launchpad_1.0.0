"use client";
import React from "react";
import Header from "@/components/dashboard/header";
import { Icon } from "@iconify/react/dist/iconify.js";
import InputInfo from "@/components/dashboard/create/atoms/infoInput";
import InputCap from "@/components/dashboard/create/atoms/capInput";
import InputDecimal from "@/components/dashboard/create/atoms/decimalInput";

import Datepicker from "@/components/dashboard/create/atoms/datePicker";
import Description from "@/components/dashboard/create/atoms/descriptionInput";
import Image from "next/image";
import { useAtom } from "jotai";
import Uploader from "@/components/dashboard/create/atoms/dragFileUploader";
// import Croper from "@/components/dashboard/create/croper";
import useToastr from "@/hooks/useToastr";

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
  const [address, setAddress] = useAtom(addressAtom);
  const [wallet, setWallet] = useAtom(walletAtom);
  //states
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [checked, setChecked] = React.useState<boolean>(false);
  //toastr
  const { showToast } = useToastr ();

  const handleSave = () => {
    showToast("ICO launched successfully", "success");
    setStep (3);
  }
  
  return (
    <div className="w-full">
      <h2 className="text-lg font-bold text-center">** Transfer token for ICO **</h2>
      <section className="mt-5 flex flex-col gap-1">
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
      </section>

      <div className="py-4 mt-5 flex gap-4">
        <div className="flex gap-2 items-center">
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setChecked(e.target.checked)
            }
            checked={checked}
            type="checkbox"
            value=""
            name="bordered-checkbox"
            className="w-5 h-5 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded dark:border-gray-600"
          />
          <span>Yes</span>
        </div>
        <div className="flex gap-2 items-center">
          <input
            checked={!checked}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setChecked(!e.target.checked)
            }
            type="checkbox"
            value=""
            name="bordered-checkbox"
            className="w-5 h-5 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded dark:border-gray-600"
          />
          <span>No</span>
        </div>
      </div>

      <div className="flex gap-2 justify-between items-center pr-3">
        <button onClick={handleSave} className="py-2 text-white rounded-lg hover:bg-blue-700 transition-all hover:ring-1 hover:ring-white hover bg-blue-500 text-sm font-bold px-4">
          Save
        </button>
        <div onClick={() => setStep(1)} className="flex cursor-pointer hover:opacity-60 gap-2 items-center hover:underline"><Icon icon="ion:arrow-undo-sharp" /> Previous</div>
      </div>
    </div>
  );
};

export default Create;
