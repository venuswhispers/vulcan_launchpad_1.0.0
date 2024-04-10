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
  //socials
  const [twitter, setTwitter] = React.useState<string>("");
  const [linkedin, setLinkedin] = React.useState<string>("");
  const [facebook, setFacebook] = React.useState<string>("");
  const [instagram, setInstagram] = React.useState<string>("");
  const [farcaster, setFarcaster] = React.useState<string>("");
  const [lens, setLens] = React.useState<string>("");


  const handleChangeEndTime = (date: Date) => {
    setEndTime(date.toLocaleDateString());
  };

  const handleSave = () => {
    
    if (!user || !isAuthenticated) {
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
      if (!twitter) {
        showToast("Twitter account is required.", "warning");
        valid = false;
      }
      if (!facebook) {
        showToast("facebook account is required.", "warning");
        valid = false;
      }
      if (!instagram) {
        showToast("instagram account is required.", "warning");
        valid = false;
      }
      if (!linkedin) {
        showToast("linkedin account is required.", "warning");
        valid = false;
      }
      if (!farcaster) {
        showToast("farcaster account is required.", "warning");
        valid = false;
      }
      if (!lens) {
        showToast("lens account is required.", "warning");
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
          placeholder="*What is the name of your project?"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          isValid={isValid}
          message="input title"
        />
        <InputCap
          title="Amount To Rise"
          placeholder="*What’s the total you wish to raise in Eth"
          value={hardCap}
          onChange={handleHardcapChange}
          isValid={isValid}
          message="input hardcap"
        />
        <InputCap
          title="Softcap Amount"
          placeholder="*Whats the minimum you’ll accept before distributing tokens?"
          value={softCap}
          onChange={handleSoftcapChange}
          isValid={isValid}
          message="input softcap"
        />
        <InputInfo
          title="Video Link"
          placeholder="*Link to a video describing your project in greater detail"
          value={youtubeLink}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setYoutubeLink(e.target.value)
          }
          isValid={isValid}
          message="input youtube video link"
        />
        <Datepicker
          title="End Time"
          placeholder="*When do you want your project fundraising to conclude?"
          value={endTime}
          onChange={(value: string) => setEndTime (value)}
          isValid={isValid}
          message="select end time"
        />
      </div>


      <div
        id="information"
        className="w-full grid grid-cols-1 sm:grid-cols-3 gap-1 mt-8"
      >
        <InputInfo
          title="Twitter"
          placeholder="*Input your twitter link"
          value={twitter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTwitter(e.target.value)
          }
          isValid={isValid}
          message="input your twitter link"
        />
        <InputInfo
          title="Facebook"
          placeholder="*Input your facebook link"
          value={facebook}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFacebook(e.target.value)
          }
          isValid={isValid}
          message="input your facebook link"
        />
        <InputInfo
          title="Instagram"
          placeholder="*Input your Instagram link"
          value={instagram}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInstagram(e.target.value)
          }
          isValid={isValid}
          message="input your instagram link"
        />
        <InputInfo
          title="Linkedin"
          placeholder="*Input your Linkedin link"
          value={linkedin}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLinkedin(e.target.value)
          }
          isValid={isValid}
          message="input your Linkedin link"
        />
        <InputInfo
          title="Farcaster"
          placeholder="*Input your farcaster link"
          value={farcaster}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFarcaster(e.target.value)
          }
          isValid={isValid}
          message="input your farcaster link"
        />
        <InputInfo
          title="Lens"
          placeholder="*Input your Lens link"
          value={lens}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLens(e.target.value)
          }
          isValid={isValid}
          message="input your Lens link"
        />
      </div>

      {/* <InputInfo
        title="Wallet Address"
        className="mt-10"
        placeholder="*Enter wallet address that sale proceeds will go to"
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
        placeholder="*Enter your token's description..."
        value={description}
        onChange={(value: string) => setDescription(value)}
        isValid={isValid}
        message="input project description"
      />

      <h4 className="mt-3 font-bold text-gray-700">*Require KYC <span className="text-sm opacity-60">(coming soon)</span></h4>
      <div className="py-4 flex gap-4 -mt-2">
        <div className="flex gap-2 items-center">
          <input
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            //   setChecked(e.target.checked)
            // }
            checked={checked}
            type="checkbox"
            value=""
            name="bordered-checkbox"
            className="w-5 h-5 cursor-pointer opacity-40 text-blue-600 border-gray-300 rounded dark:border-gray-600"
          />
          <span className="text-gray-700">Yes</span>
        </div>
        <div className="flex gap-2 items-center">
          <input
            // checked={!checked}
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            //   setChecked(!e.target.checked)
            // }
            type="checkbox"
            checked={!checked}
            name="bordered-checkbox"
            className="w-5 h-5 cursor-pointer  opacity-40 text-blue-600 bg-gray-100 border-gray-300 rounded dark:border-gray-600"
          />
          <span className="text-gray-700">No</span>
        </div>
      </div>

      <button onClick={handleSave} className="py-2 text-white rounded-lg mt-3 hover:bg-blue-700 transition-all hover:ring-1 hover:ring-white hover bg-blue-500 text-sm font-bold px-4">
        Save
      </button>
    </div>
  );
};

export default Create;
