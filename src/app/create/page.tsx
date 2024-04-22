"use client"
import React from "react";
import Header from "@/components/dashboard/header";
import dynamic from "next/dynamic";

import Deployer from '@/components/dashboard/create/deployer';
import DetailEditor from '@/components/dashboard/create/detailsEditor';
import Depositer from '@/components/dashboard/create/depositer';
import Success from '@/components/dashboard/create/success';

const Preview = dynamic(() => import("@/components/dashboard/create/preview"), { ssr: false });
const Stepper = dynamic(() => import("@/components/dashboard/create/stepper"), { ssr: false });

const Create = () => {

  const [step, setStep] = React.useState<number>(0);

  return (
    <div className="flex w-full flex-col gap-2 text-[#141416] dark:text-[#FAFCFF]">
      <Header/>
      <h1 className="text-lg px-1">New LaunchPad</h1>
      <div className="dark:bg-[#100E28] bg-white px-3 xs:px-6 py-6 flex rounded-xl gap-7 flex-col w1080:flex-row">
        <div className="text-[#23262F] dark:text-[#CCCCCC] text-[15px] grow">
          <Stepper step={step}/>
          { step === 0 && <DetailEditor step={step} setStep={setStep}/> }
          { step === 1 && <Deployer step={step} setStep={setStep}/> }
          { step === 2 && <Depositer step={step} setStep={setStep}/> }
          { step === 3 && <Success step={step} setStep={setStep}/> }
        </div>
        <Preview/>
      </div>
    </div>
  )
};

export default Create;