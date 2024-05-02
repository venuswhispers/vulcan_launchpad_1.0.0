import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { TOKEN, IToken, CONTRIBUTION, DISTRIBUTION, REFUND, INVESTMENT, HISTORY } from "@/types";
import TokenSelector from "./tokenSelector";
import { Contract } from "ethers";
import { format } from "path";
import { formatEther, formatUnits, parseEther, parseUnits } from "viem";
import { useBalance } from "wagmi";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import { reduceAmount } from "@/utils";
import useToastr from "@/hooks/useToastr";
import { cyptoSIDAO } from '@/constants/config';
import { useRouter } from "next/navigation";


interface IProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  id: string,
  explorer: string,
  contract: Contract,
  fundsRaised: bigint,
  refund: REFUND,
  investments: HISTORY[]
  investors: string[]
}

const Distribution = ({ setVisible, id, explorer, contract, fundsRaised, refund, investments, investors }: IProps) => {

  const [creator, setCreator] = React.useState<string>("");
  const router = useRouter ();

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-50 bg-[#0000003a] backdrop-filter backdrop-blur-[5px] flex justify-center px-2 items-center">
      <div className="fixed top-0 left-0 right-0 bottom-0" onClick={() => { setVisible(false) }}></div>
      <div className="rounded-xl relative z-50 p-[1px] bg-gradient-to-tr from-[#ff6a0096] via-[#6d78b280] to-[#e02d6f86] mt-10 md:mt-0 w-full lg:w-[550px]">
        <div className="w-full h-full dark:bg-[#100E28] bg-white rounded-xl dark:text-white p-5 z-50">
          <div className="flex justify-end">
            <Icon onClick={() => setVisible(false)} icon="ep:close-bold" width={20} className="relative cursor-pointer hover:opacity-60"/>
          </div>
          <h2 className="flex gap-2 items-center font-bold text-lg pb-2">
            <Icon icon="icon-park-outline:funds" width={30} height={30}/>
            All Funds Were Refunded To Investors.
            <a href={`${explorer}/tx/${refund.hash}`} target="_blank"><Icon className='cursor-pointer hover:opacity-60' icon="fluent:open-16-filled" width={22} /></a>
          </h2>
          {
            investors.map((_investor: string, index: number) => (
              <div key={'investor' + index} className="w-full flex gap-2 text-sm justify-between items-center">
                <div className="flex gap-2">
                  <span>{ index+1 }.</span>
                  <a href={`${explorer}/address/${_investor}`} target="_blank" className="truncate relative hover:underline cursor-pointer">{_investor}</a>
                </div>
                <h1>{ reduceAmount(formatEther(investments.reduce((sum: bigint, _invest: HISTORY) => _invest.investor.toLowerCase() === _investor.toLowerCase() ? sum + _invest.amount : sum, BigInt("0")))) }ETH</h1>
              </div>
            ))
          }
          <a onClick={() => router.push("/")} className="underline cursor-pointer mt-5 hover:text-blue-600 text-blue-400 flex gap-1 items-center">
            <Icon icon="icon-park-solid:back" />
            Return To Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default Distribution;
