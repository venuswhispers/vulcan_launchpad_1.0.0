import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface IProps {
  className?: string,
  value: string,
  title: string,
}

const Input = ({title, className, value}: IProps) => {
  return (
    <div className={className}>
      <div className="px-1 py-1 font-bold truncate flex gap-1 items-center">{title} <Icon icon="ep:info-filled" className="text-[#9A9FA5]" /></div>
      <input
        className="bg-[#F0F8FF] transition-all text-[12px] p-3 dark:bg-[#020111] w-full rounded-lg text-blue-gray-700 font-sans font-normal outline-none"
        // onChange={onChange}
        value={value}
        disabled
      />
    </div>
  )
};

export default Input;
