"use client"
import React from "react";
import Header from "@/components/dashboard/header";
import { Icon } from "@iconify/react/dist/iconify.js";
import Input from "@/components/dashboard/create/atoms/infoInput";
import Datepicker from "@/components/dashboard/create/atoms/datePicker";
import Description from '@/components/dashboard/create/atoms/descriptionInput';
import Image from "next/image";
import dynamic from "next/dynamic";

const Preview = dynamic(() => import("@/components/dashboard/create/preview"), { ssr: false });
const DetailEditor = dynamic(() => import("@/components/dashboard/create/detailsEditor"));

const Create = () => {


  return (
    <div className="flex w-full flex-col gap-2 text-[#141416] dark:text-[#FAFCFF]">
      <Header/>
      <h1 className="text-lg px-1">New LaunchPad</h1>
      <div className="dark:bg-[#100E28] bg-white px-3 xs:px-6 py-6 flex rounded-xl gap-7 flex-col w1080:flex-row">
        <DetailEditor/>
        <Preview/>
      </div>
    </div>
  )
};

export default Create;