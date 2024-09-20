"use client"
import React from "react";
import Header from '@/components/dashboard/header';
import Filter from "@/components/dashboard/filter";
import dynamic from "next/dynamic";
import { Spinner } from "@nextui-org/spinner";
const Card = dynamic(() => import("@/components/dashboard/card"), { ssr: false });
// abis
import FACTORY from "@/constants/abis/factory.json";
import ICO from "@/constants/abis/ICO.json";
// addresses
import { FACTORY_ADDRESSES, DAI_ADDRESSES, CHAIN_DATA } from "@/constants/constants";
import { Contract, providers } from "ethers";
// icons
import { Icon } from "@iconify/react/dist/iconify.js";

import { IVulcan, METATYPE } from "@/types";
import { formatEther } from "viem";

export default function Home() {

  const [icos, setICOs] = React.useState<METATYPE[]>([]);
  const [metaData, setMetaData] = React.useState<IVulcan[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const _fetchMetaData = async (_metaInfo: METATYPE) => {
    const _jsonRpcProvider = new providers.JsonRpcProvider(CHAIN_DATA[_metaInfo.chainId].rpc);
    const _contract = new Contract(
      _metaInfo.id,
      ICO,
      _jsonRpcProvider
    );
    const _getTitle = async () => {
      const _projectURI = await _contract.projectURI();
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
    const [_status, _hardcap, _softcap, _fundsRaised, _endTime, _startTime, _tokensFullyCharged, _title] = await Promise.all(_promises.map(async (_promise: Function) => {
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
      address: _metaInfo.id,
      chainId: _metaInfo.chainId
    }
  }

  const fetchMetaData = async (_memtaInfos: METATYPE[]) => {
    const _icos: IVulcan[] = await Promise.all(_memtaInfos.map(_fetchMetaData));
    setMetaData(_icos);
  }

  const _getICOs = async () => {
    try {
      setIsLoading(true);
      const _chains = Object.values(CHAIN_DATA);
      let metaInfos: METATYPE[] = [];
      for (const _chain of _chains) {
        try {
          const _jsonRpcProvider = new providers.JsonRpcProvider(_chain.rpc);
          const _contractFactory = new Contract(
            FACTORY_ADDRESSES[_chain.chainId],
            FACTORY,
            _jsonRpcProvider
          );
          const _icos: string[] = await _contractFactory.getVulcans();
          const _metas = await Promise.all(_icos.map(async (id: string) => {
            const _contract = new Contract(id, ICO, _jsonRpcProvider);
            const status = await _contract.getICOState();
            return { id, chainId: _chain.chainId, status };
          }));
          metaInfos = [...metaInfos, ..._metas];
        } catch (err) {
          console.log("err fetching icos from chain", _chain.chainId)
        }
      }
      const _filters = metaInfos.filter((_item: METATYPE) => _item.status !== 0);
      setICOs(_filters);
      fetchMetaData(_filters);
    } catch (err) {
      setICOs([]);
    } finally {
      setIsLoading(false);
    }
  }

  const onChange = (ids: METATYPE[]) => {
    setICOs(ids);
  }

  React.useEffect(() => {
    _getICOs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full flex-col gap-4">
      <Header />
      <Filter data={metaData} onChange={onChange} filters={["All", "Failed", "Success"]} />
      <h1 className="text-[#141416] dark:text-[#FAFCFF] text-lg py-4 px-1">Archieved ICOs</h1>
      {
        isLoading ?
          <div className="flex gap-2 items-center text-sm font-bold justify-center mt-20">
            <Spinner size="lg" /> <span className="opacity-60 text-black dark:text-white">LOADING...</span>
          </div> : (
            icos.length > 0 ?
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 w1240:grid-cols-3 c1500:grid-cols-4">
                {icos.map((_ico: METATYPE) => <Card key={_ico.chainId + _ico.id} info={_ico} />)}
              </div> :
              <div className="flex flex-col justify-center items-center pt-5 dark:text-white text-black ">
                <Icon icon="mdi-light:cloud" className="text-6xl" />
                <h2 className="opacity-60">No ICO for this chain</h2>
              </div>
          )
      }
    </div>
  );
}
