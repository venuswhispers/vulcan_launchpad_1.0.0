import React from "react";
import { Datepicker } from "flowbite-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "flowbite-react";
import { Tooltip } from "flowbite-react";

import { DayPicker } from "react-day-picker";

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

const Input = ({
  title,
  className,
  onChange,
  value,
  placeholder,
  isInvalid,
  message,
  info,
}: IProps) => {
  const [selectedDate, setSelectedDate] = React.useState<any>(new Date());
  const [show, setShow] = React.useState<boolean>(false);

  const setEndTimeAfter = (month: number) => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + month);
    onChange(currentDate.toLocaleDateString());
  };

  const handleClear = () => {
    onChange("");
  };

  // React.useEffect(() => {
  //   if (!selectedDate) return;
  //   onChange(selectedDate.toLocaleDateString());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedDate]);

  const handleChange = (date: Date) => {
    onChange (date.toLocaleDateString());
  }


  return (
    <div className={className}>
      <div className="px-1 py-1 font-bold truncate flex gap-1 items-center">
        {title}
        <Tooltip className="relative z-50" content={info}>
          <Icon
            icon="ep:info-filled"
            className="text-[#9A9FA5] cursor-pointer hover:opacity-60"
          />
        </Tooltip>
      </div>
      <input
        className="bg-[#F0F8FF] relative transition-all text-[12px] p-3 dark:bg-[#020111] w-full rounded-lg text-blue-gray-700 font-sans font-normal border-[#98bdea1f] outline-none focus:ring-1 focus:ring-[#8ca8cba2] focus:border-[#8ca8cba2] border"
        placeholder={placeholder}
        onClick={() => setShow(true)}
        value={value}
        onChange={() => {}}
      />
      {
        show && 
        <div className="absolute pt-2 z-40">
          <div onClick={() => setShow(false)} className="fixed top-0 left-0 right-0 bottom-0"></div>
          <div className="pt-5 dark:bg-black bg-white z-50 relative p-4 border dark:border-gray-900 border-gray-200 rounded-xl shadow-lg">
            <DayPicker
              mode="single"
              selected={value ? new Date(value) : new Date()}
              onMonthChange={handleChange}
              onSelect={(date: any) => handleChange(new Date(date))}
              showOutsideDays
              month={value ? new Date(value) : new Date()}
              className="border-0"
              classNames={{
                caption: "flex justify-center py-2 mb-4 relative items-center",
                caption_label: "text-sm font-bold text-gray-900 dark:text-white",
                nav: "flex items-center",
                nav_button:
                  "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                nav_button_previous: "absolute left-1.5",
                nav_button_next: "absolute right-1.5",
                table: "w-full border-collapse",
                head_row: "flex font-medium text-gray-900 dark:text-white",
                head_cell: "m-0.5 w-9 font-normal text-sm",
                row: "flex w-full mt-2",
                cell: "text-gray-500 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal",
                day_range_end: "day-range-end",
                day_selected:
                  "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                day_today: "rounded-md bg-gray-200 text-gray-900",
                day_outside:
                  "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                day_disabled: "text-gray-500 opacity-50",
                day_hidden: "invisible",
              }}
            />
            <div className="w-full grid grid-cols-3 gap-1 mt-5">
              <button
                className="w-full text-sm p-2 font-bold rounded-lg !bg-transparent text-gray-600 dark:text-gray-300 shadow-md dark:shadow-gray-900"
                onClick={() => setEndTimeAfter(1)}
              >
                1 month
              </button>
              <button
                className="w-full text-sm p-2 font-bold rounded-lg !bg-transparent text-gray-600 dark:text-gray-300 shadow-md dark:shadow-gray-900"
                onClick={() => setEndTimeAfter(3)}
              >
                3 months
              </button>
              <button
                className="w-full text-sm p-2 font-bold rounded-lg !bg-transparent text-gray-600 dark:text-gray-300 shadow-md dark:shadow-gray-900"
                onClick={handleClear}
              >
                CLEAR
              </button>
            </div>
          </div>
        </div>
      }
      <p className="text-red-800 text-[11px] px-2 h-3">
        {isInvalid && !value ? message : ""}
      </p>
    </div>
  );
};

export default Input;
