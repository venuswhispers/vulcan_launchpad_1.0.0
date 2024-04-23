"use client"
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Dropdown } from "flowbite-react";
import { title } from "process";
import { IVulcan } from "@/types";
import { useAtom } from "jotai";
import { vulcansAtom, keywordAtom } from "@/store/icos";

interface IProps {
  data: IVulcan[],
  onChange: (ids: string[]) => void 
}

interface ISort { 
  label: string, 
  key: string 
}
interface IFilter { 
  label: string, 
  key: number[] 
}
// "Created", "Funds Raised", "Softcap", "Hardcap"
const _sorts: ISort[] =[
  { key: 'startTime', label: 'Created' },
  { key: 'fundsRaised', label: 'Funds Raised' },
  { key: 'softcap', label: 'Softcap' },
  { key: 'endTime', label: 'End Time' },
  { key: 'hardcap', label: 'Hardcap' }
]

const _filters: IFilter[] = [
  { label: "All", key: [0, 1, 2, 3] },
  { label: "Progress", key: [0] },
  { label: "Failed", key: [1] },
  { label: "Success", key: [2, 3] },
]

const Filter = ( { data, onChange }: IProps ) => {

  const [filter, setFilter] = React.useState<IFilter>({ label: "All", key: [0, 1, 2, 3] });
  const [chain, setChain] = React.useState<string>("All");
  const [sort, setSort] = React.useState<ISort>({ key: 'created', label: 'Created' });
  const [keyword, setKeyword] = React.useState<string>("");
  const [mainKeyword,] = useAtom<string>(keywordAtom);


  React.useEffect(() => {
    const _sort = (_prev: IVulcan, _cur: IVulcan) => {
      //@ts-ignore
      const _value = _prev[sort.key] > _cur[sort.key];
      return _value ? -1 : 1;
    }
    const _data = data.filter((_item: IVulcan) => _item.title.toLowerCase().includes(keyword.toLowerCase())).filter((_item: IVulcan) => filter.key.includes(_item.status)).sort(_sort).map((_item: IVulcan) => _item.address);
    onChange (_data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, sort, keyword]);

  React.useEffect(() => {
    setKeyword (mainKeyword);
  }, [mainKeyword])

  const _renderSearch = () => (
    <div className="relative w-full">
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
    <Dropdown label="Dropdown button" renderTrigger={() => 
      <div className="flex flex-col w-full sm:w-[13%] md:w-full lg:w-[13%] min-w-[150px]">
        <h4 className="text-xs px-1">Filters</h4>
        <div className="rounded-lg bg-white px-5 py-[9px] text-[11px] flex gap-4 items-center text-[#606D93] cursor-pointer justify-between"><span>{ filter.label }</span><Icon icon="bxs:down-arrow" /></div>
      </div>
    }>
    { _filters.map((_item: IFilter) => <Dropdown.Item onClick={() => setFilter(_item)} key={_item.label} className={`${filter === _item && 'font-bold'} text-xs`}>{_item.label}</Dropdown.Item>) }
    </Dropdown>
  )

  const _renderSort = () => (
    <Dropdown label="Dropdown button" renderTrigger={() => 
      <div className="flex flex-col w-full sm:w-[13%] md:w-full lg:w-[13%] min-w-[150px]">
        <h4 className="text-xs px-1">Sort by</h4>
        <div className="rounded-lg bg-white px-5 py-[9px] text-[11px] flex gap-4 items-center text-[#606D93] cursor-pointer justify-between"><span>{ sort.label }</span><Icon icon="bxs:down-arrow" /></div>
      </div>
    }>
      { _sorts.map((_item: ISort) => <Dropdown.Item onClick={() => setSort(_item)} key={_item.key} className={`${sort === _item && 'font-bold'} text-xs`}>{_item.label}</Dropdown.Item>) }
    </Dropdown>
  )

  const _renderChainFilter = () => (
    <Dropdown label="Dropdown button" renderTrigger={() => 
      <div className="flex flex-col w-full sm:w-[13%] md:w-full lg:w-[13%] min-w-[150px]">
        <h4 className="text-xs px-1">Chains</h4>
        <div className="rounded-lg bg-white px-5 py-[9px] text-[11px] flex gap-4 items-center text-[#606D93] cursor-pointer justify-between"><span>{chain}</span><Icon icon="bxs:down-arrow" /></div>
      </div>
    }>
      { ["All", "Sepolia"].map((item: string) => <Dropdown.Item onClick={() => setChain(item)} key={item} className={`${chain === item && 'font-bold'} text-xs`}>{item}</Dropdown.Item>) }
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
