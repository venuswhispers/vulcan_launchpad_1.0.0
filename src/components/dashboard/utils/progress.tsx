import React from "react";

interface IProps {
  percent: number
}

const Progress = ({ percent = 0 }: IProps) => {
  return (
    <div className="w-full h-[6px] rounded-full bg-[#A3E0B8] dark:bg-[#2E2A5B]">
      <div className={`w-[${percent}%] rounded-full h-full dark:bg-white bg-[#0CAF60]`}></div>
    </div>
  );
};

export default Progress;
