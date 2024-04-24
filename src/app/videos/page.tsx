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
      <h1 className="text-lg px-1">VIDEOS</h1>
      <div className="dark:bg-[#100E28] bg-white px-3 xs:px-6 py-6 rounded-xl">
        Coming Soon
      </div>
       
    </div>
  );
};

export default Evangilists;
