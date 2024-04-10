import React from "react";
import { CREAT } from "@/constants";

interface IProps {
  step: number
}

const Stepper = ({step}: IProps) => {

  // const [step, setStep] = React.useState<number>(0);

  return (
    <ul className="relative flex flex-col-reverse xs:flex-row-reverse gap-2 mb-8">
      <li className="pr-2">
        <div className="min-w-7 min-h-7 inline-flex items-center text-xs align-middle grow xs:grow-0">
          <span className={`${step === 2 && "ring-2"} ${step > 2 && 'hidden'} size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-gray-700 dark:text-white`}>
            3
          </span>
          <svg className={`${step <= 2 && "hidden"} flex-shrink-0 size-3`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span className="ms-2 block grow xs:grow-0 text-sm font-medium text-gray-800 dark:text-white">
            Deposit Token
          </span>
        </div>
      </li>
      <div className="flex grow gap-2 flex-col xs:flex-row">
        <li className="flex flex-col xs:flex-row xs:items-center gap-x-2 gap-2 shrink basis-0 flex-1 group">
          <div className="min-w-7 min-h-7 inline-flex items-center text-xs align-middle grow xs:grow-0">
            <span className={`${step === 0 && "ring-2"} ${step > 0 && 'hidden'} size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-gray-700 dark:text-white`}>
              1
            </span>
            <svg className={`${step <= 0 && "hidden"} flex-shrink-0 size-3`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span className="ms-2 block grow xs:grow-0 text-sm font-medium text-gray-800 dark:text-white">
              Project Details
            </span>
          </div>
          <div className="w-px h-4 ms-3.5 xs:ms-0 xs:w-full xs:h-px xs:flex-1 bg-gray-200 dark:bg-gray-700"></div>
        </li>
        <li className="flex flex-col xs:flex-row xs:items-center gap-2 shrink basis-0 flex-1 group">
          <div className="min-w-7 min-h-7 inline-flex items-center text-xs align-middle grow xs:grow-0">
            <span className={`${step === 1 && "ring-2"} ${step > 1 && 'hidden'} size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-gray-700 dark:text-white`}>
              2
            </span>
            <svg className={`${step <= 1 && "hidden"} flex-shrink-0 size-3`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span className="ms-2 block grow xs:grow-0 text-sm font-medium text-gray-800 dark:text-white">
              ICO Launch
            </span>
          </div>
          <div className="w-px h-4 ms-3.5 xs:ms-0 xs:w-full xs:h-px xs:flex-1 bg-gray-200 dark:bg-gray-700"></div>
        </li>
      </div>
 
    </ul>
  );
};

export default Stepper;
