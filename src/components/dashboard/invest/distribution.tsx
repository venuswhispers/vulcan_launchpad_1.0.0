import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { TOKEN, IToken, CONTRIBUTION, DISTRIBUTION, INVESTMENT } from "@/types";
import TokenSelector from "./tokenSelector";
import { Contract } from "ethers";
import { format } from "path";
import { formatEther, formatUnits, parseEther, parseUnits } from "viem";
import { useBalance } from "wagmi";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import { reduceAmount } from "@/utils";
import useToastr from "@/hooks/useToastr";
import { cyptoSIDAO } from '@/constants/constants';
import { useRouter } from "next/navigation";


interface IProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  id: string,
  cap: string,
  explorer: string,
  contract: Contract,
  fundsRaised: bigint,
  wallet: string,
  lister: string,
  contributions: CONTRIBUTION[],
  distribution: DISTRIBUTION, 
}

const Distribution = ({ setVisible, id, explorer, contract, fundsRaised, wallet, lister, contributions, distribution, cap }: IProps) => {

  const [creator, setCreator] = React.useState<string>("");
  const router = useRouter ();
  const { chainId } = useActiveWeb3 ();

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-50 bg-[#0000003a] backdrop-filter backdrop-blur-[5px] flex justify-center px-2 items-center">
      <div className="fixed top-0 left-0 right-0 bottom-0" onClick={() => { setVisible(false) }}></div>
      <div className="rounded-xl relative z-50 p-[1px] bg-gradient-to-tr from-[#ff6a0096] via-[#6d78b280] to-[#e02d6f86] mt-10 md:mt-0 w-full lg:w-[550px]">
        <div className="w-full h-full dark:bg-[#100E28] bg-white rounded-xl dark:text-white p-5 z-50">
          <div className="flex justify-end">
            <Icon onClick={() => setVisible(false)} icon="ep:close-bold" width={20} className="relative cursor-pointer hover:opacity-60"/>
          </div>
          <h2 className="flex gap-2 items-center font-bold text-lg"><Icon icon="icon-park-outline:funds" width={30} height={30}/>
            Distributed After Reaching {cap}
            <a href={`${explorer}/tx/${distribution.hash}`} target="_blank"><Icon className='cursor-pointer hover:opacity-60' icon="fluent:open-16-filled" width={22} /></a>
          </h2>
          
          <h1 className="text-green-600 font-bold pt-2 pb-1">CREATOR&apos; FUNDS (95%)</h1>
          <div className="w-full flex gap-2 text-sm justify-between items-center">
            <a href={`${explorer}/address/${wallet}`} target="_blank" className="truncate relative hover:underline cursor-pointer">{wallet}</a>
            <h1>{ reduceAmount(Number(formatEther(fundsRaised))*0.95) }ETH</h1>
          </div>

          <h1 className="text-green-600 font-bold pt-2 pb-1">CryptoSI DAO&apos;S FEE (2.5%)</h1>
          <div className="w-full flex gap-2 text-sm justify-between items-center">
            <a href={`${explorer}/address/${cyptoSIDAO[Number(chainId)]}`} target="_blank" className="truncate relative hover:underline cursor-pointer">{cyptoSIDAO[Number(chainId)]}</a>
            <h1>{ reduceAmount(Number(formatEther(fundsRaised))*0.025) }ETH</h1>
          </div>

          <h1 className="text-green-600 font-bold pt-2 pb-1">LISTING PARTNER&apos;S FEE (1.0%)</h1>
          <div className="w-full flex gap-2 text-sm justify-between items-center">
            <a href={`${explorer}/address/${lister}`} target="_blank" className="truncate relative hover:underline cursor-pointer">{lister}</a>
            <h1>{ reduceAmount(Number(formatEther(fundsRaised))*0.01) }ETH</h1>
          </div>

          <h1 className="text-green-600 font-bold pt-2 pb-1">CONTRIBUTION PARTNER&apos;S FEE (1.5%)</h1>
          {
            contributions.map((_item: CONTRIBUTION, index: number) => (
              <div key={_item.contributor} className="w-full flex gap-2 text-sm justify-between items-center">
                <div className="flex gap-2">
                  <span>{ index+1}.</span>
                  <a href={`${explorer}/address/${_item.contributor}`} target="_blank" className="truncate relative hover:underline cursor-pointer">{_item.contributor}</a>
                </div>
                <h1>{ reduceAmount(Number(formatEther(_item.amount))*0.015) }ETH</h1>
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
