import React from 'react';
import { CONTRIBUTION } from '@/types';
import { formatEther, parseEther } from 'viem';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Tooltip } from '@nextui-org/react';
import { reduceAmount } from '@/utils';

interface IProps {
  contributions: CONTRIBUTION[]
}

const ContributionPartners = ({ contributions }: IProps) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const _total = contributions.reduce((acc: bigint, item: CONTRIBUTION) => acc + item.amount, BigInt("0"));
  return (
    <div className='border-b border-[#E6E8EC] dark:border-[#ededee1a]'>
      <div className="flex h-12 gap-4 justify-between text-sm items-center">
        <h2 className="text-[15px] font-bold text-[#6F6F6F] dark:text-[#CCCCCC]">
          Contribution Partners
        </h2>
        <Tooltip content="View More..." className="p-2 text-white bg-black">
          <div className="flex gap-2 items-center">
            <div className="text-[15px] flex gap-1 font-bold dark:text-[#B4B4B7] text-[#101010] hover:underline hover:opacity-60 cursor-pointer" onClick={() => setOpen(!open)}>
              {contributions.length} Partners / {reduceAmount(formatEther(_total))}ETH
            </div>
            <Icon vFlip={!open} onClick={() => setOpen(!open)} icon="ep:arrow-up-bold" className='dark:text-white text-green-800 cursor-pointer hover:opacity-60' />
          </div>
        </Tooltip>
      </div>
      {
        open &&
        <div className='pb-3 pt-2 px-2'>
          {
            contributions.map((item: CONTRIBUTION, index: number) => (
              <div key={item.contributor} className='flex justify-between gap-2 dark:text-gray-200 text-gray-900 text-sm'>
                <h2 className='truncate break-all'>{index + 1}. {item.contributor}</h2>
                <h2>{reduceAmount(formatEther(item.amount))}ETH</h2>
              </div>
            ))
          }
        </div>
      }
    </div>
  )
}

export default ContributionPartners;