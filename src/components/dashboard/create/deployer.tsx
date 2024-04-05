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
  const [decimal, setDecimal] = useAtom(decimalAtom);
  const [price, setPrice] = useAtom(priceAtom);
  const [amount, setAmount] = useAtom(hardCapAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const [wallet, setWallet] = useAtom(walletAtom);
  //states
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [checked, setChecked] = React.useState<boolean>(false);
  //toastr
  const { showToast } = useToastr ();


  const handleChangeDecimal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Number(value) < 0 || isNaN(Number(value)) || value.length > 10) {
      return;
    }
    setDecimal(value ? String(parseInt(value)) : "0");
  };

  const handleSave = () => {
    setIsValid (true);
    let valid: boolean = true;
    try {
      if (!name) {
        showToast("Token name is required.", "warning");
        valid = false;
      } 
      if (!symbol) {
        showToast("Token symbol is required.", "warning"); 
        valid = false;
      } 
      if (decimal === "0" || !decimal) {
        showToast("Token decimal is required.", "warning"); 
        valid = false;
      } 
      if (!amount || amount === "0") {
        showToast("Token amount for ICO is required.", "warning"); 
        valid = false;
      } 
      if (!address) {
        showToast("Token address is required.", "warning"); 
        valid = false;
      }
      if (!wallet) {
        showToast("Wallet address is required.", "warning");
        valid = false;
      }

      if (valid) {
        setStep (2);
      }
    } catch (err) {
      // showToast(String(err), "warning");
      // console.log(err)
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Number(value) < 0 || isNaN(Number(value)) || value.length > 10) {
      return;
    }
    setAmount(value);
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Number(value) < 0 || isNaN(Number(value)) || value.length > 10) {
      return;
    }
    setPrice(value);
  }

  return (
    <div className="w-full">
      
      <h2 className="">* Pays non-refundable Spam filter fee - $100 DAI to launch ICO, and Depoly contract</h2>
      <div
        id="information"
        className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5"
      >
        <InputInfo
          title="Token Name"
          placeholder="Enter your token name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          isValid={isValid}
          message="input token name"
        />
        <InputInfo
          title="Token Symbol"
          placeholder="Enter your token symbol"
          value={symbol}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSymbol(e.target.value)
          }
          isValid={isValid}
          message="input token symbol"
        />
        <InputCap
          title="Token Price"
          placeholder="Enter your token price"
          value={price}
          onChange={handlePriceChange}
          isValid={isValid}
          message="Input token price for ICO"
        />
        <InputCap
          title="Amount for ICO"
          placeholder="Enter your amount to rise"
          value={amount}
          onChange={handleAmountChange}
          isValid={isValid}
          message="Input token amount for ICO"
        />
        <InputDecimal
          title="Token Decimal"
          placeholder="Enter your token decimal"
          value={decimal}
          onChange={handleChangeDecimal}
          isValid={isValid}
          message="decimal field is required"
        />
      </div>
      <InputInfo
        title="Token Address"
        className="mt-10"
        placeholder="Enter your address of your token"
        value={address}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
        isValid={isValid}
        message="Input token address"
      />
      <InputInfo
        title="Wallet Address"
        className=""
        placeholder="Enter wallet address that sale proceeds will go to"
        value={wallet}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setWallet(e.target.value)
        }
        isValid={isValid}
        message="input wallet address"
      />

      <div className="py-4 flex gap-4">
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
        <div onClick={() => setStep(0)} className="flex cursor-pointer hover:opacity-60 gap-2 items-center hover:underline"><Icon icon="ion:arrow-undo-sharp" /> Previous</div>
      </div>
    </div>
  );
};

export default Create;
