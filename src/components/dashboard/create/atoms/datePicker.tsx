import React from "react";
import { Datepicker } from "flowbite-react";
import { Popover } from "flowbite-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "flowbite-react";

interface IProps {
  className?: string,
  onChange: (value: string) => void,
  value: string,
  title: string,
  placeholder: string,
  message: string,
  isValid: boolean
}

const Input = ({title, className, onChange, value, placeholder, isValid, message}: IProps) => {

  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date("2024-01-01"));

  const setEndTimeAfter = (month: number) => {
    var currentDate = new Date();

    // Add 3 months to the current date
    currentDate.setMonth(currentDate.getMonth() + month);

    // Get the new date after 3 months
    var newDate = currentDate;
    onChange(newDate.toLocaleDateString());
  }

  const _renderDatePicker = () => (
    <div className="relative">
      <Datepicker value={String(selectedDate)} onSelectedDateChanged={(date: Date) => onChange(date.toLocaleDateString())} inline className="-mt-2"/>
      <div className="w-[296px] absolute bottom-[0px] rounded-b-xl h-[60px] dark:bg-[#374151] bg-white flex items-start px-5">
        <div className="flex w-full gap-1">
          <Button size="sm" className="w-full" onClick={() => setEndTimeAfter(1)}>1month</Button>
          <Button size="sm" className="w-full" onClick={() => setEndTimeAfter(3)}>3months</Button>
          <Button size="sm" className="w-full" onClick={() => onChange("")}outline>Clear</Button>
        </div>
      </div>
    </div>
  )
  return (
    <div className={className}>
      <div className="px-1 py-1 font-bold truncate flex gap-1 items-center">{title} <Icon icon="ep:info-filled" className="text-[#9A9FA5]" /></div>
      <Popover arrow={false} content={_renderDatePicker()} placement="bottom">
        <input
          className="bg-[#F0F8FF] transition-all text-[12px] p-3 dark:bg-[#020111] w-full rounded-lg text-blue-gray-700 font-sans font-normal border-[#98bdea1f] outline-none focus:ring-1 focus:ring-[#8ca8cba2] focus:border-[#8ca8cba2] border"
          placeholder={placeholder} 
          value={value}
          onChange={() => {}}
        />
      </Popover>
      {/* { _renderDatePicker () } */}
      <p className="text-red-800 text-[11px] px-2 h-3">{ (isValid && !value) ? message : '' }</p>
    </div>
  )
};

export default Input;
