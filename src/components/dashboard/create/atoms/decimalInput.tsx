import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface IProps {
  className?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  value: string,
  title: string,
  placeholder: string,
  message: string,
  isInvalid: boolean
}

const Input = ({title, className, onChange, value, placeholder, message, isInvalid}: IProps) => {
  return (
    <div className={className}>
      <div className="px-1 py-1 font-bold truncate flex gap-1 items-center">{title} <Icon icon="ep:info-filled" className="text-[#9A9FA5]" /></div>
      <input
        className="bg-[#F0F8FF] transition-all text-[12px] p-3 dark:bg-[#020111] w-full rounded-lg text-blue-gray-700 font-sans font-normal border-[#98bdea1f] outline-none focus:ring-1 focus:ring-[#8ca8cba2] focus:border-[#8ca8cba2] border"
        placeholder={placeholder} 
        onChange={onChange}
        value={value}
      />
      <p className="text-red-800 text-[11px] px-2 h-3">{ ( isInvalid && !value || value === '0' ) ? message : ''  }</p>
    </div>
  )
};

export default Input;
