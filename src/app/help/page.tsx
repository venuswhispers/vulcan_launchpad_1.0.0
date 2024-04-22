"use client";
import React from "react";
import Header from "@/components/dashboard/header";


const Evangilists = () => {

  const [fullName, setFullName] = React.useState<string>("");
  const [link, setLink] = React.useState<string>("");
  const [bio, setBio] = React.useState<string>("");
  const [isInvalid, setIsInvalid] = React.useState<boolean>(false);

  return (
    <div className="flex w-full flex-col gap-2 text-[#141416] dark:text-[#FAFCFF]">
      <Header />
      <h1 className="text-lg px-1">HELP</h1>
      <div className="dark:bg-[#100E28] bg-white px-3 xs:px-6 py-6 rounded-xl">
        {/* <div className="flex gap-3 items-center">
          <div className="bg-[#4285EC] w-3 h-6 rounded-sm"></div>
          <h3 className="dark:text-[#CCCCCC] text-[#1A1D1F]">
            Profile information
          </h3>
        </div>
        <section className="mt-5 flex gap-3 items-center">
          <Image
            src={'/images/man.png'}
            width={70}
            alt=''
            height={70}
            className='rounded-full'
          />
          <button className="bg-[#2B6EC8] rounded-lg py-[10px] px-4 text-white text-xs hover:bg-[#2b35c8] font-bold flex gap-1">
            <Icon icon="ph:plus-bold" width={14}/>
            <span>Upload new avatar</span>
          </button>
          <button className="bg-white text-black rounded-lg py-[10px] px-4 text-xs border-2 dark:border-none border-[#EFEFEF] hover:bg-gray-200 font-bold">Remove</button>
        </section>
        
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mt-5">
          <InputInfo
            title="Display Name"
            placeholder="*Enter your Display Name"
            value={fullName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFullName (e.target.value)
            }
            isInvalid={isInvalid}
            message="Input fullName"
          />
          <InputInfo
            title="Social Media"
            placeholder="*Enter your link"
            value={link}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLink (e.target.value)
            }
            isInvalid={isInvalid}
            message="Input you social link"
          />
        </section>

        <Description
          title="Bio"
          className="mt-5 bio"
          placeholder="*Enter Bio..."
          value={bio}
          onChange={(value: string) => setBio(value)}
          isInvalid={isInvalid}
          message="input your Bio"
        />

        <div>
          <button className="bg-[#2B6EC8] rounded-lg py-[10px] px-4 text-white text-xs hover:bg-[#2b35c8] font-bold mt-3">PAY BOND in CRDD</button>
        </div> */}
        Coming Soon
      </div>
       
    </div>
  );
};

export default Evangilists;
