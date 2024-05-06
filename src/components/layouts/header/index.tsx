"use client";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import dynamic from "next/dynamic";
const WalletConnectButton = dynamic(
  () => import("@/components/layouts/header/share/walletConnect"),
  { ssr: false }
);
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useAtom } from "jotai";
import { keywordAtom } from "@/store/icos";

const Header = () => {
  const [keyword, setKeyword] = useAtom<string>(keywordAtom);

  return (
    <div className="flex items-center flex-none gap-3 sm:gap-6 p-4 text-black dark:text-white w-full justify-between bg-white dark:bg-[#100E28] border-2 border-[#E3E3E3] dark:border-[#100E28] rounded-xl">
      <ul className="hidden sm:flex md:hidden lg:flex text-sm text-[#777E90] dark:text-white items-center gap-9">
        <li className="cursor-pointer hover:opacity-60 truncate">Discover</li>
        <li className="cursor-pointer hover:opacity-60 truncate">
          How it work
        </li>
      </ul>
      <Dropdown className="dark:bg-gray-800">
        <DropdownTrigger>
          <Icon
            icon="foundation:list"
            className="inline sm:hidden md:inline lg:hidden hover:opacity-60 cursor-pointer"
            width={25}
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          // onSelectionChange={setSelectedKeys}
        >
          <DropdownItem key={"ETH"} className={`text-gray-300 text-xs`}>
            Discover
          </DropdownItem>
          <DropdownItem key={"USD"} className={`text-gray-300 text-xs`}>
            How it work
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <div className="flex gap-1 sm:gap-6 items-center">
        <div className="relative mr-2">
          <Icon icon="ph:bell-thin" width={22} />
          <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-[#45B26B] border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900"></div>
        </div>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="bg-white transition-all text-[12px] p-3 dark:bg-[#020111] w-full rounded-lg text-blue-gray-700 font-sans font-normal border-[#98bdea3d] dark:border-none outline-none focus:ring-1 focus:ring-[#8ca8cba2] focus:border-[#8ca8cba2] border"
            placeholder=""
            value={keyword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setKeyword(e.target.value)
            }
          />
        </div>
        <WalletConnectButton />
      </div>
    </div>
  );
};

export default Header;
