/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import Circle from "./circle";


interface IParamsStepItem {
  percent: number,
  stepper: number,
  step: number,
  border?: boolean,
  title: {
    ready: string,
    pending: string,
    success: string
  },
  msg: string
}



const ICODeployer = ({ percent, stepper, step,  border = true, title: { ready, pending, success }, msg}: IParamsStepItem) => {
  //timer ref
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const [counter, setCounter] = React.useState<number>(0);

  const status = React.useMemo(() => {
    if (stepper < step) {
      return 0;
    } else if (stepper === step) {
      return 1;
    } else {
      return 2;
    }
  }, [stepper]);

  const title = React.useMemo(() => {
    if (stepper < step) {
      return ready;
    } else if (stepper === step) {
      return pending;
    } else {
      return success;
    }
  }, [stepper]);

  //   //when status is changed to PENDIND, and hash is available...
  React.useEffect(() => {
    if (status === 1) {
      timerRef.current = setInterval(async() => {
        setCounter(counter => counter + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current as NodeJS.Timeout);
    }
    
    return () => {
      clearInterval(timerRef.current as NodeJS.Timeout);
    }
  }, [status]);
  /**
   * render time according to the counter
   * 00:10:23
   */
    const _renderCounter = React.useMemo(() => {

      if (counter <= 0) {
        return '00:00:00'
      }

      let _hour : number | string = Math.floor(counter / 3600);
      let _minute : number | string = Math.floor((counter % 3600) / 60);
      let _second : number | string = (counter % 3600) % 60;

      _hour = _hour < 10 ? '0' + _hour : _hour;
      _minute = _minute < 10 ? '0' + _minute : _minute;
      _second = _second < 10 ? '0' + _second : _second;
      return `${_hour}:${_minute}:${_second}`
    }, [counter]);

  return (
    <div className="w-full text-left flex text-gray-500 dark:text-gray-400">
      <div className="w-1/2 flex flex-col items-end px-7">
        <span className="dark:text-gray-200">{_renderCounter}</span>
        <div className="text-[12px] flex gap-1 items-center">
          {/* <span className="cursor-pointer hover:underline">{msg}</span> */}
        </div>
      </div>
      <div
        className={`relative w-1/2 flex flex-col items-start px-7 dark:border-gray-400 ${
          border && "!border-blue-200 border-l min-h-[100px]"
        }`}
      >
        <div className="text-3xl absolute left-0 top-0 p-1 rounded-full -translate-x-1/2 -translate-y-2 bg-white dark:bg-[#0A0C0F]">
          { 
            stepper < step ?
            <Icon icon="fluent:task-list-square-rtl-20-filled" width={40} height={40}/> : stepper === step ?
            <Circle percent={percent} sqSize={33} strokeWidth={4} /> :
            <Icon icon="lets-icons:check-ring-round" width={40} height={40}/>
          }
        </div>
        <span className="text-sm">{title}</span>
      </div>
    </div>
  );
};

export default ICODeployer;
