"use client"
import React from "react";
import Header from '@/components/dashboard/header';
import Filter from "@/components/dashboard/filter";
import dynamic from "next/dynamic";
const Card = dynamic(() => import("@/components/dashboard/card"), {ssr: false});
// hooks
import useActiveWeb3 from "@/hooks/useActiveWeb3";
// abis
import FACTORY from "@/constants/abis/factory.json";
import ICO from "@/constants/abis/ICO.json";
// addresses
import { FACTORY_ADDRESSES, DAI_ADDRESSES } from "@/constants/constants";
import { Contract, ethers } from "ethers";
// atoms
import { ethPriceAtom } from "@/store/icos";

import { IVulcan } from "@/types";
import { formatEther } from "viem";
import { useAtom } from "jotai";

export default function Home() {
  
  const [contractFactory, setContractFactory] = React.useState<Contract | undefined> (undefined);
  const { address, chainId, signer } = useActiveWeb3();
  const [icos, setICOs] = React.useState<string[]>([]);
  const [metaData, setMetaData] = React.useState<IVulcan[]>([]);

  const [ethPrice, setEthPrice] = useAtom<number>(ethPriceAtom);
  

  const fetchMetaData = async (ids: string[]) => {
    const _icos: IVulcan[] = await Promise.all(ids.map(async (_id: string) => {
      const _contract = new Contract(
        _id,
        ICO,
        signer
      );
      // token data
      const _token = await _contract.tokenInfo ();
      // ICO status
      const _status = await _contract.getICOState ();
      // hardcap
      const _hardcap = await _contract.hardcap();
      // softcap
      const _softcap = await _contract.softcap();
      // funds raised
      const _fundsRaised = await _contract.fundsRaised ();
      // ico endtime
      const _endTime = await _contract.endTime ();
      // project data
      const _projectURI = await _contract.projectURI ();
      const response = await fetch(_projectURI);
      const _project = await response.json();

      return {
        status: _status,
        softcap: Number(formatEther(_softcap)),
        fundsRaised: Number(formatEther(_fundsRaised)),
        endTime: Number(_endTime) * 1000,
        hardcap: Number(formatEther(_hardcap)),
        title: _project.title,
        address: _id
      }
    })); 
    setMetaData (_icos);
  }

  const onChange = (ids: string[]) => {
    setICOs (ids);
  }

  React.useEffect(() => {
    if (!contractFactory) return;
    contractFactory.getVulcans().then((_icos: string[]) => {
      setICOs([..._icos].reverse());
      fetchMetaData ([..._icos].reverse());
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractFactory]);

  React.useEffect(() => {
    if (!address || !chainId || !signer || !FACTORY_ADDRESSES[chainId]) {
      return;
    }
    const _contractFactory = new Contract(
      FACTORY_ADDRESSES[chainId],
      FACTORY,
      signer
    );
    setContractFactory(_contractFactory);
  }, [address, chainId, signer]);

  React.useEffect(() => {
    fetch("/api/utils/eth-price")
    .then(async (response) => {
      const {
        payload: { amount },
      } = await response.json();
      setEthPrice(amount);
    })
    .catch((err) => {
      console.log("failed to fetch eth price");
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full flex-col gap-4">
      <Header/>
      <Filter data={metaData} onChange={onChange}/>
      <h1 className="text-[#141416] dark:text-[#FAFCFF] text-lg py-4 px-1">All Launchpads</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 c1200:grid-cols-3 c1450:grid-cols-4">
        { icos.map((_key: string) => <Card key={_key} id={_key}/>) }
      </div>
    </div>
  );
}
