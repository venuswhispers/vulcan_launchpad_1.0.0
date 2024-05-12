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
  
  const { address, chainId, signer } = useActiveWeb3();
  const [contractFactory, setContractFactory] = React.useState<Contract | undefined> (undefined);
  const [icos, setICOs] = React.useState<string[]>([]);
  const [metaData, setMetaData] = React.useState<IVulcan[]>([]);
  const [ethPrice, setEthPrice] = useAtom<number>(ethPriceAtom);

  const _fetchMetaData = async (_id: string) => {
    const _contract = new Contract(
      _id,
      ICO,
      signer
    );
    const _getTitle = async () => {
      const _projectURI = await _contract.projectURI ();
      const _response = await fetch(_projectURI);
      const _project = await _response.json();
      return _project.title;
    }
    const _promises: Function[] = [
      _contract.getICOState, // ICO status
      _contract.hardcap, // ICO hardcap
      _contract.softcap, // ICO softcap
      _contract.fundsRaised, // ICO fundsRaised
      _contract.endTime, // ICO endTime
      _contract.startTime, // ICO startTime
      _contract.tokensFullyCharged, // validate if tokens are fully charged
      _getTitle // ICO title
    ]
    const [_status, _hardcap, _softcap, _fundsRaised, _endTime, _startTime, _tokensFullyCharged, _title] = await Promise.all(_promises.map(async(_promise: Function) => {
      return await _promise();
    }));
    return {
      status: _status,
      softcap: Number(formatEther(_softcap)),
      fundsRaised: Number(formatEther(_fundsRaised)),
      endTime: Number(_endTime) * 1000,
      startTime: Number(_startTime) * 1000,
      hardcap: Number(formatEther(_hardcap)),
      title: _title,
      tokensFullyCharged: _tokensFullyCharged,
      address: _id
    }
  }

  const fetchMetaData = async (ids: string[]) => {
    const _icos: IVulcan[] = await Promise.all(ids.map(_fetchMetaData)); 
    console.log(_icos)
    setMetaData (_icos);
  }

  
  React.useEffect(() => {
    if (!contractFactory) return;
    contractFactory.getVulcans().then((_icos: string[]) => {
      setICOs([..._icos].reverse());
      fetchMetaData ([..._icos].reverse());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractFactory]);
  
  const onChange = (ids: string[]) => {
    setICOs (ids);
  }
  
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
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 w1240:grid-cols-3 c1500:grid-cols-4">
        { icos.map((_key: string) => <Card key={_key} id={_key}/>) }
      </div>
    </div>
  );
}
