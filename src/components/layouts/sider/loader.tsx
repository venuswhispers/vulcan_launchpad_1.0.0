import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-none flex-col justify-between bg-white dark:bg-[#100E28] w-[252px] border-2 border-[#E3E3E3] dark:border-[#100E28] rounded-2xl">
      <div className="bg-white dark:bg-[#040413] rounded-2xl p-6 w-full h-full">
        <div className="flex flex-col gap-2 animate-pulse">
          <div className="w-full h-6 bg-gray-300 dark:bg-slate-900 rounded-full"></div>
          <div className="w-2/3 h-6 bg-gray-300 dark:bg-slate-900 rounded-full"></div>
          <div className="w-full h-6 bg-gray-300 dark:bg-slate-900 rounded-full"></div>
        </div>
        <div className="flex flex-col gap-2 animate-pulse mt-10">
          <div className="w-full h-6 bg-gray-300 dark:bg-slate-900 rounded-full"></div>
          <div className="w-2/3 h-6 bg-gray-300 dark:bg-slate-900 rounded-full"></div>
          <div className="w-full h-6 bg-gray-300 dark:bg-slate-900 rounded-full"></div>
        </div>
        <div className="flex flex-col gap-2 animate-pulse mt-10">
          <div className="w-full h-6 bg-gray-300 dark:bg-slate-900 rounded-full"></div>
          <div className="w-2/3 h-6 bg-gray-300 dark:bg-slate-900 rounded-full"></div>
          <div className="w-full h-6 bg-gray-300 dark:bg-slate-900 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
