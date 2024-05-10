import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LogoUploader from "./logoUploader";
import ICODeployer from "./icoDepolyer";

interface IProps {
  confirm: () => void,
  stepper: number,
  percent: number,
  hash: string
}



const ProgressModal = ({ confirm, stepper, percent, hash }: IProps) => {

  const router = useRouter ();
  
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#0000003d] !z-50 backdrop-filter backdrop-blur-[10px]"></div>
      <div className="rounded-2xl !z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-[1px] bg-gradient-to-tr from-[#ff6a0096] via-[#6d78b280] to-[#e02d6f86] mt-10 md:mt-0 w-full lg:w-[600px]">
        <div className="rounded-2xl relative text-center p-4 bg-white dark:bg-[#0A0C0F] dark:text-white text-black">
          <div className="flex items-center justify-center flex-col gap-1 my-3 mb-5">
            {
              stepper < 4 ?
              <div className="flex items-center justify-center gap-3">
                <Icon
                  icon="icomoon-free:spinner9"
                  width={25}
                  height={25}
                  className="text-2xl spin"
                />{" "}
                Processing...
              </div> :
              <Image
                src={'/images/logo.dark.svg'}
                alt=""
                width={70}
                height={30}
              />
            }
          </div>

          <div className="flex p-3 mb-6 text-sm text-gray-800 border-l-2 border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-gray-300">
            <div className="">
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
            </div>
            <div className="text-justify">
              Smart contract deployment takes time, so please be patient. You
              can check the progress on the screen.
            </div>
          </div>

          <LogoUploader 
            percent={percent} 
            stepper={stepper} 
            step={1}
            title={{
              ready: "Ready to upload logo media to IPFS.",
              pending: "Uploading logo media to IPFS...",
              success: "Logo media uploaded successfully.",
            }}
            msg="sadfasdfsadf"
          />
          <LogoUploader 
            percent={percent} 
            stepper={stepper} 
            step={2}
            title={{
              ready: "Ready to upload Poroject data to IPFS.",
              pending: "Uploading project data to IPFS...",
              success: "Project data uploaded successfully.",
            }}
            msg="sadfasdfsadf"
          />
          <ICODeployer 
            percent={percent} 
            stepper={stepper} 
            step={3}
            title={{
              ready: "Ready to launch ICO smart contract.",
              pending: "Deploying ICO smart contract...",
              success: "ICO launched successfully.",
            }}
            border={false}
            hash={hash}
            msg="sadfasdfsadf"
          />

          <div className="absolute top-4 right-4 text-white flex justify-between items-center">
            <div>
              <Icon
                onClick={confirm}
                icon="ic:sharp-close"
                className="cursor-pointer text-black dark:text-white hover:opacity-50"
                width={30}
              />
            </div>
          </div>

          {
            stepper === 4 ?
            <div className="flex justify-between px-4 mt-5 relative">
              <a onClick={() => router.push("/")} className="text-red-600 flex gap-1 items-center cursor-pointer hover:underline">
                <Icon icon="icon-park-solid:back"/> Return To Dashboard
              </a>
              <a onClick={confirm} className="text-green-500 flex gap-1 items-center cursor-pointer hover:underline">
                Proceed To Deposit <Icon icon="icon-park-solid:back" hFlip/>
              </a>
            </div> :
            <div className="py-3"></div>
          }
        </div>
      </div>
    </div>
  );
};

export default ProgressModal;
