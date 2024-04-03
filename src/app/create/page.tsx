"use client"
import React from "react";
import Header from "@/components/dashboard/header";
import { Icon } from "@iconify/react/dist/iconify.js";
import Input from "@/components/dashboard/create/infoInput";
import Datepicker from "@/components/dashboard/create/datePicker";
import Description from '@/components/dashboard/create/descriptionInput';

const Create = () => {

  const [title, setTitle] = React.useState<string>("");
  const [hardCap, setHardCap] = React.useState<string>("");
  const [softCap, setSoftCap] = React.useState<string>("");
  const [youtubeLink, setYoutubeLink] = React.useState<string>("");
  const [tokenPrice, setTokenPrice] = React.useState<string>("");
  const [endTime, setEndTime] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const handleChangeEndTime = (date: Date) => {
    setEndTime(date.toLocaleDateString());
  }

  return (
    <div className="flex w-full flex-col gap-2 text-[#141416] dark:text-[#FAFCFF]">
      <Header/>
      <h1 className="text-lg px-1">New LaunchPad</h1>
      <div className="dark:bg-[#100E28] bg-white p-7 flex rounded-xl gap-7 flex-col w1080:flex-row">
        <div className="text-[#23262F] dark:text-[#CCCCCC] text-[15px] grow">
          <h3 className="font-bold">Upload File</h3>
          <h5 className="text-[#777E90] text-xs py-1">Drag or choose your file to upload</h5>

          <section id="upload" className="bg-[#F0F8FF] dark:bg-[#020111] border-2 border-[#98bdea17] py-16 rounded-2xl mt-3 flex justify-center items-center">
            <div className="flex flex-col gap-3 cursor-pointer hover:opacity-60 items-center">
              <Icon icon="line-md:cloud-upload-outline-loop" width={30}/>
              <p className="dark:text-[#777E90] text-[#777E90] text-xs">PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.</p>
            </div>
          </section>

          <div id="information" className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 mt-8">
            <Input 
              title="Project Title"
              placeholder="Enter your project title" 
              value={title} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />
            <Input 
              title="Amount To Rise"
              placeholder="Enter your amount to rise" 
              value={hardCap} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHardCap(e.target.value)}
            />
            <Input 
              title="Softcap Amount"
              placeholder="Enter your softcap amount" 
              value={softCap} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSoftCap(e.target.value)}
            />
            <Input 
              title="Video Link"
              placeholder="Enter your Youtube link" 
              value={youtubeLink} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYoutubeLink(e.target.value)}
            />
            <Input 
              title="Token Price"
              placeholder="Enter your token price" 
              value={tokenPrice} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTokenPrice(e.target.value)}
              />
            <Datepicker
              title="End Time"
              placeholder="Enter your ICO end time" 
              value={endTime} 
              onChange={handleChangeEndTime}
            />
          </div>

          <Description
            title="Description"
            className="mt-10"
            placeholder="Enter your token's description..."
            value={description}
            onChange={(value: string) => setDescription(value)}
          />

        </div>
        <div className="bg-[#F0F8FF] dark:bg-[#020111] rounded-2xl md:w-full w1080:max-w-[350px] px-6 py-10 flex-none">
          <h3 >Preview</h3>
          <h5 className="text-[#777E90] text-xs py-1">Drag or choose your file to upload</h5>
          <div className="w-full text-wrap break-all" dangerouslySetInnerHTML={{__html: description}}></div>
        </div>
      </div>
    </div>
  )
};

export default Create;