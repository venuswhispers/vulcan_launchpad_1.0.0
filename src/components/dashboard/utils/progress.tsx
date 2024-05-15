import React from "react";

interface IProps {
  percent: number
}

const Progress = ({ percent }: IProps) => {
  return (
    <div className="w-full h-[6px] rounded-full bg-[#A3E0B8] dark:bg-[#2E2A5B]">
      <div className="rounded-full h-full dark:bg-white bg-[#0CAF60]" style={{ width: `${percent > 100 ? 100 : percent }%` }}></div>
    </div>
  );
};

export default Progress;
