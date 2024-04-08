"use client";
import React from "react";
import Header from "@/components/dashboard/header";
import { Icon } from "@iconify/react/dist/iconify.js";
import Description from "@/components/dashboard/create/atoms/descriptionInput";
import Image from "next/image";
import dynamic from "next/dynamic";
import InputInfo from "@/components/dashboard/create/atoms/infoInput";
import useToastr from "@/hooks/useToastr";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import useAuth from "@/hooks/useAuth";
import { useSignMessage } from "wagmi";
import axios from 'axios';

import { TMsg } from "@/types/user";
import { SERVER_URL } from '@/constants/config';

const acceptables = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/webp'
]


const Evangilists = () => {

  const [fullName, setFullName] = React.useState<string>("");
  const [socialLink, setSocialLink] = React.useState<string>("");
  const [company, setCompany] = React.useState<string>("");
  const [avatar, setAvatar] = React.useState<string>("");
  const [bio, setBio] = React.useState<string>("");
  const [preview, setPreview] = React.useState<string>("");
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { showToast } = useToastr ();

  const { address, chain, isConnected, chainId } = useActiveWeb3();
  const { signUp } = useAuth();
  const { signMessageAsync } = useSignMessage();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {

      if (!event.target.files) throw "no files";
      const file: File = event.target.files[0];

      if (!file) throw "Emptry file";
      if (!acceptables.includes(file.type)) throw "Invalid Image file.";
      if (file.size > 1024*1024*1024) throw "Overflow maximum file size (1GB).";
      const reader = new window.FileReader()
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const _file: string = String(reader.result);
        setPreview(_file);
      }
    } catch (err) {
      showToast(String(err), "warning"); 
      setPreview ("");
    }
  }

  const removeAvatar = () => {
    setPreview ("");
  }

  const _submitRegister = async () => {
    const data = { fullName, company, socialLink, bio, avatar };
    setIsLoading (true);
    await signUp (data);
    setIsLoading (false);
  }

  const handleSubmit = () => {

    if (isLoading) return;
    
    setIsValid (true);
    
    let valid = true;
    
    if (!fullName) {
      showToast ("Input your fullname", "warning");
      valid = false;
    }
    if (!company) {
      showToast ("Input your company name", "warning");
      valid = false;
    }
    if (!socialLink) {
      showToast ("Input your social link", "warning");
      valid = false;
    }
    if (!bio) {
      showToast ("Input your Bio", "warning");
      valid = false;
    }

    if (valid) {
      if (!isConnected) {
        showToast ("Connect your wallet!", "warning");
      } else {
        _submitRegister ();
      }
    }
  }

  return (
    <div className="flex w-full flex-col gap-2 text-[#141416] dark:text-[#FAFCFF]">
      <Header />
      <h1 className="text-lg px-1">User Register</h1>
      <div className="dark:bg-[#100E28] bg-white px-3 xs:px-6 py-6 rounded-xl">
        <div className="flex gap-3 items-center">
          <div className="bg-[#4285EC] w-3 h-6 rounded-sm"></div>
          <h3 className="dark:text-[#CCCCCC] text-[#1A1D1F]">
            Welcome to Vulcan Pad
          </h3>
        </div>
        <section className="mt-5 flex gap-3 items-center">
          {
            preview  ?
            <Image
              src={ preview ? preview : '/images/default.jpg'}
              width={70}
              height={70}
              alt=''
              className='rounded-full aspect-square bg-[#be6a6a6b]'
            /> : 
            <Icon icon="flowbite:user-solid" width={70} height={70} className="rounded-full bg-[#46455367] opacity-50"/>
          }
          
          <label htmlFor="avatar" className="bg-[#2B6EC8] cursor-pointer rounded-lg py-[10px] px-4 text-white text-xs hover:bg-[#2b35c8] font-bold flex gap-1">
            <Icon icon="ph:plus-bold" width={14}/>
            <span>Upload new avatar</span>
          </label>
          <input hidden id="avatar" type="file" onChange={onFileChange} />
          <button onClick={removeAvatar} className="bg-white text-black rounded-lg py-[10px] px-4 text-xs border-2 dark:border-none border-[#EFEFEF] hover:bg-gray-200 font-bold">Remove</button>
        </section>
        
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mt-5">
          <InputInfo
            title="Display Name"
            placeholder="Enter your Display Name"
            value={fullName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFullName (e.target.value)
            }
            isValid={isValid}
            message="Input fullName"
          />
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mt-3">
          <InputInfo
            title="Company"
            placeholder="Enter your Company name"
            value={company}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCompany (e.target.value)
            }
            isValid={isValid}
            message="Input your company name"
          />
          <InputInfo
            title="Social Link"
            placeholder="Enter your social link"
            value={socialLink}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSocialLink (e.target.value)
            }
            isValid={isValid}
            message="Input Social link"
          />
        </section>

        <Description
          title="Bio"
          className="mt-5 bio"
          placeholder="Enter Bio..."
          value={bio}
          onChange={(value: string) => setBio(value)}
          isValid={isValid}
          message="input your Bio"
        />

        <div>
          <button onClick={handleSubmit} className="bg-[#2B6EC8] flex gap-1 justify-center items-center rounded-lg py-2 px-4 text-white text-xs hover:bg-[#2b35c8] font-bold mt-3">
            { !isLoading ? <Icon icon="bx:cloud-upload" width={20} height={20}/> : <Icon icon="line-md:uploading-loop" width={20} height={20}/> }  REGISTER
          </button>
        </div>
      </div>
       
    </div>
  );
};

export default Evangilists;
