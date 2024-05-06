import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { TimePicker } from "react-time-picker-typescript";
import { Tooltip } from "@nextui-org/react";

interface IProps {
  className?: string;
  onChange: (value: string) => void;
  value: string;
  title: string;
  placeholder: string;
  message: string;
  isInvalid: boolean;
  info: string;
}

const CustomTimePicker = ({
  title,
  className,
  onChange,
  value,
  placeholder,
  isInvalid,
  message,
  info,
}: IProps) => {

  const handleAccept = (time: string) => {
    onChange(time);
  }

  return (
    <div className={className}>
      <div className="px-1 py-1 font-bold truncate flex gap-1 items-center">
        {title}
        <Tooltip className="relative z-50 bg-black text-white p-2" content={info}>
          <Icon
            icon="ep:info-filled"
            className="text-[#9A9FA5] cursor-pointer hover:opacity-60"
          />
        </Tooltip>
      </div>
      <div className="relative">
        <TimePicker 
          inputClassName="!bg-[#F0F8FF] !relative !transition-all !text-[12px] px-3 !py-[9px] dark:!bg-[#020111] w-full !rounded-lg text-blue-gray-700 font-sans font-normal !border-[#98bdea1f] outline-none focus:ring-1 focus:ring-[#8ca8cba2] focus:border-[#8ca8cba2] border"
          // popupClassName="!absolute !w-auto !h-auto bg-white" 
          onChange={(value: string|null) => handleAccept(String(value))} 
          value={value} 
          saveButtonText="ACCEPT"
          cancelButtonText="CANCEL"
        />
      </div>
      <p className="text-red-800 text-[11px] px-2 h-3">
        {isInvalid && !value ? message : ""}
      </p>
    </div>
  );
};

export default CustomTimePicker;
