"use client";
import React from "react";
import Header from "@/components/dashboard/header";
import { Icon } from "@iconify/react/dist/iconify.js";


const Evangilists = () => {

  return (
    <div className="flex w-full flex-col gap-2 text-[#141416] dark:text-[#FAFCFF]">
      <Header />
      <h1 className="text-lg px-1">HELP</h1>
      <div className="dark:bg-[#100E28] bg-white px-3 xs:px-6 py-6 rounded-xl">
        <a href='https://discord.gg/63JbDWV' target="_blank" className="flex gap-2 items-center hover:underline cursor-pointer hover:opacity-60">
          <Icon icon="fa6-brands:discord" className="text-3xl"/> Please join our community for help with any aspect.
        </a>
      </div>
       
    </div>
  );
};

export default Evangilists;
