import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";

interface IProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const Success =  ({ step, setStep }: IProps) => {
  return (
    <div className="flex justify-center pt-10 flex-col items-center">
      <Image src={"/images/logo.dark.svg"} alt="" width={150} height={50} />
      <div className="flex gap-2 justify-between items-center pr-3 mt-5">
        Congratulations!
      </div>
    </div>
  );
};

export default Success;
