"use client";
import React from "react";
import Header from "@/components/dashboard/header";
import { Icon } from "@iconify/react/dist/iconify.js";
import InputInfo from "@/components/dashboard/create/atoms/infoInput";
import InputCap from "@/components/dashboard/create/atoms/capInput";

import Datepicker from "@/components/dashboard/create/atoms/datePicker";
import Description from "@/components/dashboard/create/atoms/descriptionInput";
import Image from "next/image";
import { useAtom } from "jotai";
import Uploader from "@/components/dashboard/create/atoms/dragFileUploader";
// import Croper from "@/components/dashboard/create/croper";
import useToastr from "@/hooks/useToastr";
import useAuth from "@/hooks/useAuth";

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
  previewAtom
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
  const [title, setTitle] = useAtom(titleAtom);
  const [hardCap, setHardCap] = useAtom(hardCapAtom);
  const [softCap, setSoftCap] = useAtom(softCapAtom);
  const [youtubeLink, setYoutubeLink] = useAtom(youtubeLinkAtom);
  // const [tokenPrice, setTokenPrice] = useAtom(tokenPriceAtom);
  const [endTime, setEndTime] = useAtom(endTimeAtom);
  const [description, setDescription] = useAtom(descriptionAtom);
  // const [wallet, setWallet] = useAtom(walletAtom);
  const [checked, setChecked] = useAtom(checkedAtom);
  const [preview, ] = useAtom (previewAtom);
  const [isValid, setIsValid] = React.useState<boolean>(false);
  //toastr
  const { showToast } = useToastr ();
  //hooks
  const { user, isAuthenticated } = useAuth ();


  const handleChangeEndTime = (date: Date) => {
    setEndTime(date.toLocaleDateString());
  };

  const handleSave = () => {
    
    if (!isAuthenticated) {
      return showToast ("Connect your wallet first", "warning");
    }     

    setIsValid (true);
    let valid: boolean = true;
    try {
      if (!title) {
        showToast("Project title field is required.", "warning");
        valid = false;
      } 
      if (!hardCap || hardCap === "0") {
        showToast("Project hardcap field is required.", "warning"); 
        valid = false;
      } 
      if (!softCap || softCap === "0") {
        showToast("Project softcap field is required.", "warning"); 
        valid = false;
      } 
      if (!endTime) {
        showToast("ICO duraction field is required.", "warning"); 
        valid = false;
      } 
      if (!description || description === '<p><br></p>') {
        showToast("Project description field is required.", "warning"); 
        valid = false;
      }
      if (Number(hardCap) < Number(softCap)) {
        showToast("Invalid softcap and hardcap configuration.", "warning");
        valid = false;
      }

      if (valid) {
        setStep (1);
      }
    } catch (err) {
      // showToast(String(err), "warning");
      // console.log(err)
    }
  }

  const handleSoftcapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Number(value) < 0 || isNaN(Number(value)) || value.length > 10) {
      return;
    }
    setSoftCap(value);
  }

  const handleHardcapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Number(value) < 0 || isNaN(Number(value)) || value.length > 10) {
      return;
    }
    setHardCap(value);
  }


  return (
    <div className="w-full">

      <h3 className="font-bold">Upload File</h3>
      <h5 className="text-[#777E90] text-xs py-1">
        Drag or choose your file to upload
      </h5>

      <Uploader isValid={isValid}/>
      
      <div
        id="information"
        className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 mt-8"
      >
        <InputInfo
          title="Project Title"
          placeholder="Enter your project title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          isValid={isValid}
          message="input title"
        />
        <InputCap
          title="Amount To Rise"
          placeholder="Enter your amount to rise"
          value={hardCap}
          onChange={handleHardcapChange}
          isValid={isValid}
          message="input hardcap"
        />
        <InputCap
          title="Softcap Amount"
          placeholder="Enter your softcap amount"
          value={softCap}
          onChange={handleSoftcapChange}
          isValid={isValid}
          message="input softcap"
        />
        <InputInfo
          title="Video Link"
          placeholder="Enter your Youtube link"
          value={youtubeLink}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setYoutubeLink(e.target.value)
          }
          isValid={isValid}
          message="input youtube video link"
        />
        {/* <InputInfo
          title="Token Price"
          placeholder="Enter your token price"
          value={tokenPrice}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTokenPrice(e.target.value)
          }
          isValid={isValid}
          message="input token price"
        /> */}
        <Datepicker
          title="End Time"
          placeholder="Enter your ICO end time"
          value={endTime}
          onChange={handleChangeEndTime}
          isValid={isValid}
          message="select end time"
        />
      </div>

      {/* <InputInfo
        title="Wallet Address"
        className="mt-10"
        placeholder="Enter wallet address that sale proceeds will go to"
        value={wallet}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setWallet(e.target.value)
        }
        isValid={isValid}
        message="input wallet address"
      /> */}

      <Description
        title="Description"
        className="mt-10"
        placeholder="Enter your token's description..."
        value={description}
        onChange={(value: string) => setDescription(value)}
        isValid={isValid}
        message="input project description"
      />

      <h4 className="mt-3 font-bold">*Require KYC</h4>
      <div className="py-4 flex gap-4 -mt-2">
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

      <button onClick={handleSave} className="py-2 text-white rounded-lg mt-3 hover:bg-blue-700 transition-all hover:ring-1 hover:ring-white hover bg-blue-500 text-sm font-bold px-4">
        Save
      </button>
    </div>
  );
};

export default Create;
