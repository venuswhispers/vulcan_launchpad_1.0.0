"use client"
import React from "react";
import Image from "next/image";
import Progress from "@/components/dashboard/utils/progress";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { Contract } from "ethers";
import { formatEther, formatUnits } from  'viem';
import { baseURL } from "@/constants/config";
//hooks
import useActiveWeb3 from "@/hooks/useActiveWeb3";
//abis
import ICO from '@/constants/abis/ICO.json';
import axios from 'axios';
import { reduceAmount } from "@/utils";
// atoms
import { ethPriceAtom } from "@/store/icos";
// types
import { IUser, IProject, IToken } from "@/types";
// jotai
import { useAtom } from "jotai";

interface IProps {
  id: string
}

const Card = ({ id }: IProps) => {
  const { address, chainId, signer } = useActiveWeb3();
  const [contract, setContract] = React.useState<Contract | undefined> (undefined);
  const [token, setToken] = React.useState<IToken|undefined>(undefined);
  const [project, setProject] = React.useState<IProject|undefined>(undefined);
  const [hardcap, setHardcap] = React.useState<bigint>(BigInt("0"));
  const [softcap, setSoftcap] = React.useState<bigint>(BigInt("0"));
  const [fundsRaised, setFundsRaised] = React.useState<bigint>(BigInt("0"));
  const [endTime, setEndTime] = React.useState<number>(0);
  const [distance, setDistance] = React.useState<number>(0);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const [mediaType, setMediaType] = React.useState<string>("");
  const [creator, setCreator] = React.useState<IUser|undefined>(undefined);

  const [ ethPrice ] = useAtom<number>(ethPriceAtom);

  React.useEffect(() => {
    if (!contract) return;
    _getICOInfo ();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  const _getICOInfo = async () => {
    // token data
    const _token = await contract?.tokenInfo ();
    setToken (_token);
    // hardcap
    const _hardcap = await contract?.hardcap();
    setHardcap (_hardcap);
    // softcap
    const _softcap = await contract?.softcap();
    setSoftcap (_softcap);
    // funds raised
    const _fundsRaised = await contract?.fundsRaised ();
    setFundsRaised (_fundsRaised);
    // ico endtime
    const _endTime = await contract?.endTime ();
    setEndTime (Number(_endTime));
    // project data
    const _projectURI = await contract?.projectURI ();
    const response = await fetch(_projectURI);
    const _project = await response.json();
    setProject(_project);
    // creator data
    const _creator = await contract?.creator ();
    const { data: user } = await axios.get(`${baseURL}/user/${_creator}`);
    setCreator (user);
    // test if log is video or pic
    fetch(_project.logo)
    .then(response => response.blob())
    .then(blob => {
      const type = blob.type.split('/')[0]; // Get the main type (image, video, etc.)
      setMediaType (type);
    })
    .catch(error => console.error('Error fetching media:', error));
  }

  React.useEffect(() => {
    timerRef.current = setInterval(async () => {
      const _now = new Date().getTime();
      const _distance = endTime - Math.floor(_now/1000);
      setDistance(_distance);
      if ((_distance < 0 || isNaN(_distance)) && timerRef.current) {
        clearInterval(timerRef.current);
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      //@ts-ignore
      clearInterval(timerRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endTime]);

  const [ days, hours, minutes, seconds ] = React.useMemo(() => {
    let days: string|number = Math.floor(distance / (60 * 60 * 24));
    let hours: string|number = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    let minutes: string|number = Math.floor((distance % (60 * 60)) / 60);
    let seconds: string|number = Math.floor(distance % 60);

    days = days > 9 ? days : ( days > 0 ? '0' + days : '0');
    hours = hours > 9 ? hours : ( hours > 0 ? '0' + hours : '0');
    minutes = minutes > 9 ? minutes : ( minutes > 0 ? '0' + minutes : '0');
    seconds = seconds > 9 ? seconds : ( seconds > 0 ? '0' + seconds : '0');
   
    return [days, hours, minutes, seconds];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distance]);


  React.useEffect(() => {
    if (!address || !chainId || !signer || !id) {
      return;
    }
    const _contract = new Contract(
      id,
      ICO,
      signer
    );
    setContract(_contract);
  }, [address, chainId, signer, id]);

  const router = useRouter ();
  
  return (
    <div className="w-full dark:bg-[#100E28] bg-white p-4 rounded-2xl relative">
      <section id="logo" className="relative w-full rounded-2xl">
        {
          mediaType === "video" ?
          <video 
            className='w-full h-full aspect-[1.5/1] rounded-[19px]'
            controls
          >
            <source src={project?.logo + ""}/>
          </video> : mediaType === "image" ? 
          <Image
            src={project?.logo + ""}
            width={0}
            alt=''
            height={0}
            sizes="100vw"
            className='w-full h-full aspect-[1.5/1] rounded-[19px]'
          /> : <div className="dark:bg-black bg-gray-300 w-full h-full aspect-[1.5/1] rounded-[19px] animate-pulse"></div>
        }
        <div className="absolute right-4 -translate-y-1/2 w-1/6 p-1 bg-white rounded-[30%]">
          {
            creator?.avatar ?
              <Image
              src={creator.avatar}
              width={0}
              height={0}
              alt='mini-logo'
              sizes="100vw"
              className='w-full h-full aspect-square rounded-[30%]'
            /> :
            <div className='w-full h-full rounded-[30%] aspect-square dark:bg-gray-700 bg-gray-300'></div>
          }
        </div>
        <div className="absolute flex gap-1 items-center p-2 left-3 bottom-3 rounded-full bg-[#00000069] backdrop-filter backdrop-blur-[5px]">
          <Image
            src={'/images/eth.webp'}
            width={22}
            height={22}
            alt='mini-logo'
            className="rounded-full"
          />
          <span className="text-xs text-white pr-2">{ token ? reduceAmount(formatEther(token.price)) : "0" } ETH</span>
        </div>
      </section>

      <section id="live" className="mt-5 flex">
        <div className="text-xs flex gap-3 items-center bg-[#D2FAE5] dark:bg-black dark:text-white px-3 py-[6px] rounded-full">
          <span>Sale Live</span>
          <div className="w-2 h-2 bg-[#0CAF60] rounded-full"></div>
        </div>
      </section>

      <h2 className="mt-2 font-bold text-black dark:text-white text-[15px]">{project?.title}</h2>
      <h5 className="text-[] dark:text-[#868686] text-xs mt-1">Fair Launch</h5>

      <section id="title" className="gap-2 mt-4 flex items-center">
        <Image
          src={'/images/usdt.png'}
          width={22}
          height={22}
          alt='mini-logo'
          className="rounded-full"
        />
        <span className="text-[15px] font-bold text-[#1BA9F8]">{ token?.price ? reduceAmount(Number(formatEther(BigInt(String(token.price)))) * ethPrice) : 0} USDT</span>
      </section>

      <section id="progress" className="mt-3 text-[#868686]">
        <h2 className="text-sm mb-2">
          Progress ({hardcap > 0 ? Number(formatEther(fundsRaised))*100/Number(formatEther(hardcap)) : 0} %)
        </h2>
        <Progress percent={hardcap > 0 ? Number(formatEther(fundsRaised))*100/Number(formatEther(hardcap)) : 0}/>
        <div className="mt-2 flex justify-between text-sm">
          <span>{ formatEther(fundsRaised) } ETH</span>
          <span>{ formatEther(hardcap) } ETH</span>
        </div>
      </section>

      <section id="liquidity%" className="flex justify-between text-black dark:text-[#C0C0C0] text-sm mt-5">
        <span>Liquiduty %:</span>
        <span>55%</span>
      </section>
      <section id="LockupTime" className="flex justify-between text-black dark:text-[#C0C0C0] text-sm mt-1">
        <span>Lockup Time:</span>
        <span>{new Date(endTime*1000).toDateString()}</span>
      </section>

      <section id="actions" className="mt-5 max-w-1/2 flex justify-between items-center text-xs">
        <div className="flex truncate items-center gap-2 rounded-full bg-[#E5EBFF] dark:bg-black p-2 pr-3 text-[#0776DA] dark:text-white">
          <Icon icon="fa6-regular:clock" width={22}/>
          <span className="truncate">{`${days}d ${hours}h ${minutes}m ${seconds}s`}</span>
        </div>

        <section className="flex gap-[6px]">
          <button className="dark:bg-[#020110] bg-[#E5EBFF] px-[10px] rounded-xl hover:opacity-60">
            <Icon icon="mdi:bell-outline" width={22} className="text-[#2B6EC8]"/>
          </button>
          <button className="dark:bg-[#020110] bg-[#E5EBFF] px-[10px] rounded-xl hover:opacity-60">
            <Icon icon="ph:heart-bold" width={22} className="text-[#2B6EC8]"/>
          </button>
          <button onClick={() => router.push(`/${id}`)} className="rounded-2xl truncate bg-[#2B6EC8] px-5 text-white py-3">View</button>
        </section>
      </section>

      <div className="px-2 py-[1px] rounded-lg top-0 right-3 -translate-y-1/2 absolute bg-[#FFE7E4] text-[#FF6A55] text-[12px] font-bold">{hardcap > 0 ? Number(formatEther(fundsRaised))*100/Number(formatEther(hardcap)) : 0}%</div>
    </div>
  )
};

export default Card;
