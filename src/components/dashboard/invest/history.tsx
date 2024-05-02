"use client"
import React from "react";
import { HISTORY } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Investment from "../create/atoms/invest";

interface IProps {
  investments: HISTORY[],
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  explorer: string
}

const History = ({ investments, setVisible, explorer }: IProps) => {
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-50 bg-[#0000003a] backdrop-filter backdrop-blur-[5px] flex justify-center px-2 items-center">
      <div className="fixed top-0 left-0 right-0 bottom-0" onClick={() => setVisible(false)} ></div>
      <div className="rounded-xl relative p-[1px] bg-gradient-to-tr from-[#ff6a0096] via-[#6d78b280] to-[#e02d6f86] mt-10 md:mt-0 w-full sm:w-[600px]">
        <div className="dark:bg-[#100E28] w-full h-full bg-white rounded-xl dark:text-white p-4 z-50">
          <div className="flex justify-between pb-2">
            <h2 className="text-lg flex gap-1 items-center pt-3"><Icon icon="system-uicons:files-history" width={25} height={25} /> Investment Details ({investments.length})</h2>
            <Icon onClick={() => setVisible(false)} icon="ep:close-bold" width={20} className="relative cursor-pointer hover:opacity-60"/>
          </div>
          { investments.map((_investment: HISTORY, index: number) => <Investment key={index} data={_investment} explorer={explorer}/>) }
        </div>
      </div>
    </div>
  );
};

export default History;
