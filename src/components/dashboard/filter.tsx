"use client"
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Dropdown } from "flowbite-react";
import { title } from "process";

const Filter = () => {

  const [filter, setFilter] = React.useState<string>("All");
  const [chain, setChain] = React.useState<string>("All");
  const [sort, setSort] = React.useState<string>("Alphabet");

  const _renderSearch = () => (
    <div className="relative w-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 left-3 -translate-y-2/4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        className="peer bg-white text-sm !text-[11px] w-full h-full bg-transparent pl-10 rounded-lg text-blue-gray-700 font-sans font-normal outline-none border-none disabled:bg-blue-gray-50 x-3 py-[10px]  !pr-9  border-gray-200"
        placeholder="Search ICO..." 
        // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
      />
    </div>
  )

  const _renderFilter = () => (
    <Dropdown label="Dropdown button" renderTrigger={() => 
      <div className="flex flex-col w-full sm:w-[13%] md:w-full lg:w-[13%] min-w-[105px]">
        <h4 className="text-xs px-1">Filters</h4>
        <div className="rounded-lg bg-white px-5 py-[9px] text-[11px] flex gap-4 items-center text-[#606D93] cursor-pointer justify-between"><span>{ filter }</span><Icon icon="bxs:down-arrow" /></div>
      </div>
    }>
    { ["All", "Progress", "Success", "Failed"].map((item: string) => <Dropdown.Item onClick={() => setFilter(item)} key={item} className={`${filter === item && 'font-bold'} text-xs`}>{item}</Dropdown.Item>) }
    </Dropdown>
  )

  const _renderSort = () => (
    <Dropdown label="Dropdown button" renderTrigger={() => 
      <div className="flex flex-col w-full sm:w-[13%] md:w-full lg:w-[13%] min-w-[105px]">
        <h4 className="text-xs px-1">Sort by</h4>
        <div className="rounded-lg bg-white px-5 py-[9px] text-[11px] flex gap-4 items-center text-[#606D93] cursor-pointer justify-between"><span>{ sort }</span><Icon icon="bxs:down-arrow" /></div>
      </div>
    }>
      { ["Alphabet", "Created", "Softcap", "HardCap"].map((item: string) => <Dropdown.Item onClick={() => setSort(item)} key={item} className={`${sort === item && 'font-bold'} text-xs`}>{item}</Dropdown.Item>) }
    </Dropdown>
  )

  const _renderChainFilter = () => (
    <Dropdown label="Dropdown button" renderTrigger={() => 
      <div className="flex flex-col w-full sm:w-[13%] md:w-full lg:w-[13%] min-w-[105px]">
        <h4 className="text-xs px-1">Chains</h4>
        <div className="rounded-lg bg-white px-5 py-[9px] text-[11px] flex gap-4 items-center text-[#606D93] cursor-pointer justify-between"><span>{chain}</span><Icon icon="bxs:down-arrow" /></div>
      </div>
    }>
      { ["All", "Sepolia", "Arbitrum"].map((item: string) => <Dropdown.Item onClick={() => setChain(item)} key={item} className={`${chain === item && 'font-bold'} text-xs`}>{item}</Dropdown.Item>) }
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
