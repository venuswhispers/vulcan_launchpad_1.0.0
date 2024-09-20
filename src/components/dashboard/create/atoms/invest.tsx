import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { HISTORY } from "@/types";
import { formatEther } from "viem";
import { reduceAmount } from "@/utils";

interface IProps {
  data: HISTORY;
  explorer: string
}

const Investment = ({ data, explorer }: IProps) => {

  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <div className="items-center pb-1 pt-2 border-b border-[#8355552a]">
      <div className="w-full flex gap-2 text-sm items-center">
        <h1 className="truncate">{new Date(Number(data.timestamp)*1000).toLocaleString()}</h1>
        <a href={`${explorer}/address/${data.investor}`} target="_blank" className="truncate hover:underline cursor-pointer">{data.investor}</a>
        <h1>{ reduceAmount(formatEther(data.amount)) }ETH</h1>
        <Icon
          icon="iconamoon:arrow-up-2-light"
          onClick={() => setOpen(!open)}
          width={25}
          height={25}
          className={`cursor-pointer relative hover:opacity-60 ${!open && 'rotate-180'}`}
        />
        
      </div>
      <div className={`text-sm px-3 pt-2 dark:text-gray-400 max-h-full overflow-hidden transition-all ${!open && '!max-h-0'}`}>
        <p className="pt-1"><span>Contributor: </span><a href={`${explorer}/address/${data.investor}`} target="_blank" className="hover:underline cursor-pointer">{data.investor}</a></p>
        <p className="pt-1"><span>Contribution Partner: </span><a href={`${explorer}/address/${data.contributor}`} target="_blank" className="hover:underline cursor-pointer">{data.contributor}</a></p>
        <p className="pt-1"><span>Amount: </span><span>{formatEther(data.amount)} ETH</span></p>
        <p className="pt-1"><span>Date: </span><span>{new Date(Number(data.timestamp)*1000).toLocaleString()}</span></p>
      </div>
    </div>
  );
};

export default Investment;
