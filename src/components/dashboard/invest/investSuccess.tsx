import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import ClipboardCopier from "@/components/share/clipCopier";
import Image from "next/image";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import { CHAIN_DATA, cyptoSIDAO } from "@/constants/constants";
import { formatEther } from "viem";
import { useRouter } from "next/navigation";


interface IProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  hash: string,
  ethAmount: bigint,
  percent: string,
  tokens: number
}

const Success = ({ setVisible, hash, ethAmount, percent, tokens }: IProps) => {

  const { chain, chainId } = useActiveWeb3 ();
  const router = useRouter ();

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-50 bg-[#0000003a] backdrop-filter backdrop-blur-[5px] flex justify-center px-2 items-center">
      <div
        className="fixed top-0 left-0 right-0 bottom-0"
        onClick={() => setVisible(false)}
      ></div>
      <div className="relative rounded-xl p-[1px] bg-gradient-to-tr from-[#ff6a0096] via-[#6d78b280] to-[#e02d6f86] mt-10 md:mt-0 w-full lg:w-[550px]">
        <div className="w-full h-full dark:bg-[#100E28] bg-white rounded-xl dark:text-white p-4 z-50">
          <div className="flex justify-end">
            <Icon
              onClick={() => setVisible(false)}
              icon="ep:close-bold"
              width={20}
              className="relative cursor-pointer hover:opacity-60"
            />
          </div>
          <div className="flex items-center text-green-600 font-bold">
            <Image
              src={'/favicon.svg'}
              alt=""
              width={50}
              height={50}
            />
            SUCCESSFULLY CONTRIBUTED
          </div>
          
          <div className="px-8 py-2 text-sm">
            <p className="pb-1"><span className="opacity-60 font-bold">Amount:</span> {formatEther(ethAmount)}ETH</p>
            <p className="pb-1"><span className="opacity-60 font-bold">Token Amount:</span> {tokens} ( {percent}% of totalSupply )</p>
            <p className="pb-1"><span className="opacity-60 font-bold">Contributor:</span> <a href={`${CHAIN_DATA[String(chain?.id)].explorer}/address/${cyptoSIDAO[Number(chainId)]}`} target="_blank" className="relative hover:underline cursor-pointer">{ cyptoSIDAO[Number(chainId)] }</a></p>
            <div className="flex gap-1 items-center">
              <span className="opacity-60 font-bold">TX:</span>
              <a href={`${CHAIN_DATA[String(chain?.id)].explorer}/tx/${hash}`} target="_blank" className="truncate hover:underline">
                { hash }
              </a>
              <div className="w-[22px]"><ClipboardCopier size={22} text={hash}/></div>
              {/* <a href={`${explorer}/tx/${distribution.hash}`} target="_blank"><Icon className='cursor-pointer hover:opacity-60' icon="fluent:open-16-filled" width={22} /></a> */}
              <a href={`${CHAIN_DATA[String(chain?.id)].explorer}/tx/${hash}`} target="_blank"><Icon className='relative cursor-pointer hover:opacity-60' icon="fluent:open-16-filled" width={22} /></a>
            </div>
          </div>

          <a onClick={() => router.push("/")} className="underline px-5 cursor-pointer mt-2 hover:text-blue-600 text-blue-400 flex gap-1 items-center">
            <Icon icon="icon-park-solid:back" />
            Return To Dashboard
          </a>

        </div>
      </div>
    </div>
  );
};

export default Success;
