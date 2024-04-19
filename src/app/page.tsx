"use client"
import React from "react";
import Image from "next/image";
import Header from '@/components/dashboard/header';
import Filter from "@/components/dashboard/filter";
import dynamic from "next/dynamic";

const Card = dynamic(() => import("@/components/dashboard/card"), {ssr: false});

//hooks
import useToastr from "@/hooks/useToastr";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
//abis
import FACTORY from "@/constants/abis/factory.json";
//addresses
import { FACTORY_ADDRESSES, DAI_ADDRESSES } from "@/constants/constants";
import { Contract, ethers } from "ethers";


export default function Home() {
  
  const [contractFactory, setContractFactory] = React.useState<Contract | undefined> (undefined);
  
  const { address, chainId, signer } = useActiveWeb3();
  const [icos, setICOs] = React.useState<string[]>([]);

  React.useEffect(() => {

    if (!contractFactory) return;
    contractFactory.getVulcans().then((_icos: any) => {
      setICOs(_icos);
      console.log(_icos);
    });


  }, [contractFactory]);

  React.useEffect(() => {
    if (!address || !chainId || !signer) {
      return;
    }
    // const _contractDAI = new Contract(DAI_ADDRESSES[chainId], DAI, signer);
    // setContractDAI(_contractDAI);
    const _contractFactory = new Contract(
      FACTORY_ADDRESSES[chainId],
      FACTORY,
      signer
    );
    setContractFactory(_contractFactory);
  }, [address, chainId, signer]);

  return (
    <div className="flex w-full flex-col gap-4">
      <Header/>
      <Filter/>
      <h1 className="text-[#141416] dark:text-[#FAFCFF] text-lg py-4 px-1">All Launchpads</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 c1200:grid-cols-3 c1450:grid-cols-4">
        { icos.map((_key: string) => <Card key={_key} id={_key}/>) }
      </div>
    </div>
  );
}
