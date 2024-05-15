"use client"
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";

import { IVulcan } from "@/types";
import { useAtom } from "jotai";
import { keywordAtom } from "@/store/icos";
// hooks
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import { switchChain } from '@wagmi/core';
import { config } from "@/constants/wagmiConfig";
import { chains } from "@/constants/wagmiConfig";
// types
import { type Chain } from 'viem';


interface IProps {
  data: IVulcan[],
  onChange: (ids: string[]) => void,
  filters: string[] 
}

interface ISort { 
  label: string, 
  key: string,
  direction: boolean 
}
// "Created", "Funds Raised", "Softcap", "Hardcap"
const _sorts: ISort[] =[
  { key: 'startTime', label: 'Start Time', direction: true },
  { key: 'startTime', label: 'StartTime', direction: false },
  { key: 'endTime', label: 'EndTime', direction: true },
  { key: 'endTime', label: 'EndTime', direction: false },
  { key: 'fundsRaised', label: 'FundsRaised', direction: true },
  { key: 'fundsRaised', label: 'FundsRaised', direction: false },
  { key: 'softcap', label: 'Softcap', direction: true },
  { key: 'softcap', label: 'Softcap', direction: false },
  { key: 'hardcap', label: 'Hardcap', direction: true },
  { key: 'hardcap', label: 'Hardcap', direction: false },
]

const Filter = ( { data, onChange, filters }: IProps ) => {

  const [filter, setFilter] = React.useState<string>("All");
  const [sort, setSort] = React.useState<ISort>({ key: 'startTime', label: 'Start Time', direction: true });
  const [keyword, setKeyword] = React.useState<string>("");
  const [mainKeyword,] = useAtom<string>(keywordAtom);
  // web3
  const { chainId } = useActiveWeb3 ();

  const _switchChain = async (id: number) => {
    await switchChain(config, { chainId: id });
  }


  React.useEffect(() => {
    const _sort = (_prev: IVulcan, _cur: IVulcan) => {
      //@ts-ignore
      const _value = sort.direction ? _prev[sort.key] > _cur[sort.key] : _prev[sort.key] < _cur[sort.key];
      return _value ? -1 : 1;
    }
    const _filter = (_item: IVulcan) => {
      let _value: boolean = false;
      switch (filter) {
        case "All":
          _value = true;
          break;
        case "Await Deposit":
          _value = ( _item.status === 0 && !_item.tokensFullyCharged ) ? true: false;
          break;
        case "Progress":
          _value = ( _item.status === 0 && _item.tokensFullyCharged ) ? true: false;
          break;
        case "Failed":
          _value = ( _item.status === 1 ) ? true: false;
          break;
          case "Success":
            _value = ( _item.status === 2 || _item.status === 3 ) ? true: false;
          break;
      }
      return _value;
    }
    const _data = data.filter((_item: IVulcan) => _item.title.toLowerCase().includes(keyword.toLowerCase())).filter((_item: IVulcan) => _filter(_item)).sort(_sort).map((_item: IVulcan) => _item.address);
    onChange (_data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, sort, keyword, chainId, data]);

  React.useEffect(() => {
    setKeyword (mainKeyword);
  }, [mainKeyword, chainId, data])

  const _renderSearch = () => (
    <div className="flex relative w-full sm:w-auto md:w-full lg:w-auto grow">
      <svg xmlns="http://www.w3.org/2000/svg" className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 left-3 -translate-y-2/4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        className="peer bg-white text-sm !text-[11px] w-full h-full bg-transparent pl-10 rounded-lg text-blue-gray-700 font-sans font-normal outline-none border-none disabled:bg-blue-gray-50 x-3 py-[10px]  !pr-9  border-gray-200"
        placeholder="*Search ICO..." 
        value={keyword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
      />
    </div>
  )

  const _renderFilter = () => (
    <Dropdown className="dark:bg-gray-800">
      <DropdownTrigger>
        <div className="flex flex-col w-full sm:w-[25%] sm: md:w-full lg:w-[150px]">
          <h4 className="text-xs px-1">Filters</h4>
          <div className="rounded-lg truncate bg-white px-5 py-[9px] text-[11px] flex gap-4 items-center text-[#606D93] cursor-pointer justify-between">
            <span>{ filter }</span>
            <Icon icon="bxs:down-arrow" className="flex-none"/>
          </div>
        </div>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={new Set([filter])}
        // onSelectionChange={setSelectedKeys}
      >
        { filters.map((_item: string) => <DropdownItem onClick={() => setFilter(_item)} key={_item} className={`${filter === _item && 'font-bold !text-gray-500'} text-gray-300 text-xs`}>{_item}</DropdownItem>) }
      </DropdownMenu>
    </Dropdown>
  )

  const _renderSort = () => (
    <Dropdown className="dark:bg-gray-800">
      <DropdownTrigger>
        <div className="flex flex-col w-full sm:w-[25%] sm: md:w-full lg:w-[150px]">
          <h4 className="text-xs px-1">Sort by</h4>
          <div className="rounded-lg truncate bg-white px-5 py-[9px] text-[11px] flex gap-4 items-center text-[#606D93] cursor-pointer justify-between">
            <span className="flex gap-1 items-center">{ sort.direction ? <Icon icon="ph:arrow-up-bold" /> : <Icon icon="ph:arrow-down-bold" /> }{ sort.label }</span>
            <Icon icon="bxs:down-arrow" className="flex-none"/>
          </div>
        </div>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={new Set([sort.key + sort.direction])}
        // onSelectionChange={setSelectedKeys}
      >
        { _sorts.map((_item: ISort) => <DropdownItem onClick={() => setSort(_item)} key={_item.key + String(_item.direction)} className={`${sort == _item && 'font-bold !text-gray-500'} text-gray-300 text-xs`}>{`${_item.direction ? "Highest" : "Lowest"} ${_item.label}`}</DropdownItem>) }
      </DropdownMenu>
    </Dropdown>
  )

  const _renderChainFilter = () => (
    <Dropdown className="dark:bg-gray-800">
      <DropdownTrigger>
        <div className="flex flex-col w-full sm:w-[25%] sm: md:w-full lg:w-[150px]">
          <h4 className="text-xs px-1">Chains</h4>
          <div className="rounded-lg bg-white truncate px-5 py-[9px] text-[11px] flex gap-4 items-center text-[#606D93] cursor-pointer justify-between"><span>
          {
            chainId ?
            chains.find((_chain: Chain) => _chain.id === chainId)?.name : "Not Connected"
          }  
          </span><Icon icon="bxs:down-arrow" className="flex-none"/></div>
        </div>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={new Set([String(chainId)])}
      >
        { chains.map((_chain: Chain) => <DropdownItem onClick={() => _switchChain(_chain.id)} key={_chain.id} className={`${chainId === _chain.id && 'font-bold !text-gray-500'} text-gray-300 text-xs`}>{_chain.name}</DropdownItem>) }
      </DropdownMenu>
    </Dropdown>
  )

  return (
    <div className="flex gap-2 flex-col sm:flex-row md:flex-col lg:flex-row items-end w-full border border-[#EFF3FA] p-4 bg-gradient-to-r from-[#2B6EC8] to-[#00D7E1] rounded-xl">
      { _renderSearch () }
      { _renderFilter () }
      { _renderSort () }
      { _renderChainFilter () }
    </div>
  );
};

export default Filter;
