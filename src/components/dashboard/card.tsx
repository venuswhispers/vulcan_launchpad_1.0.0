/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Image from "next/image";
import Progress from "@/components/dashboard/utils/progress";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { Skeleton, Tooltip } from "@nextui-org/react";
import { Contract, providers } from "ethers";
import { formatEther, formatUnits } from "viem";
import { baseURL } from "@/constants/config";
import { useAsyncEffect } from "use-async-effect"
import useToastr from "@/hooks/useToastr";
import useAPI from "@/hooks/useAPI";

// components
import LazyImage from "../share/lazyImage";
//hooks
import useActiveWeb3 from "@/hooks/useActiveWeb3";
//abis
import ICO from "@/constants/abis/ICO.json";
import axios from "axios";
import { reduceAmount } from "@/utils";
// atoms
import { ethPriceAtom } from "@/store/icos";
// types
import { IUSER, IProject, IToken, METATYPE } from "@/types";
// jotai
import { useAtom } from "jotai";
// constants
import { CHAIN_DATA } from "@/constants/constants";
import useAuth from "@/hooks/useAuth";

interface IProps {
  info: METATYPE;
}

const Card = ({ info }: IProps) => {
  const { address, chainId, signer } = useActiveWeb3();
  const { user } = useAuth();
  const { showToast } = useToastr();
  const api = useAPI();
  const [contract, setContract] = React.useState<Contract | undefined>(
    undefined
  );
  const [token, setToken] = React.useState<IToken | undefined>(undefined);
  const [project, setProject] = React.useState<IProject | undefined>(undefined);
  const [hardcap, setHardcap] = React.useState<bigint>(BigInt("0"));
  const [softcap, setSoftcap] = React.useState<bigint>(BigInt("0"));
  const [fundsRaised, setFundsRaised] = React.useState<bigint>(BigInt("0"));
  const [endTime, setEndTime] = React.useState<number>(0);
  const [startTime, setStartTime] = React.useState<number>(0);
  const [distance, setDistance] = React.useState<number>(0);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const [mediaType, setMediaType] = React.useState<string>("");
  const [status, setStatus] = React.useState<number>(0);
  const [creator, setCreator] = React.useState<IUSER | undefined>(undefined);
  const [owner, setOwner] = React.useState<string>("");
  const [tokensFullyCharged, setTokensFullyCharged] =
    React.useState<boolean>(false);
  const [ethPrice] = useAtom<number>(ethPriceAtom);

  const { chain } = useActiveWeb3();

  /**
   * get token data
   * @param _contract Contract
   */
  async function _token(_contract: Contract) {
    try {
      const __token = await _contract.tokenInfo();
      setToken(__token);
    } catch (err) {
      console.log("failed fetch token data");
    }
  }
  /**
   * get ICO hardcap
   * @param _contract
   */
  async function _hardcap(_contract: Contract) {
    try {
      const __hardcap = await _contract.hardcap();
      setHardcap(__hardcap);
    } catch (err) {
      console.log("failed fetch ICO hardcap");
    }
  }
  /**
   * get ICO softcap
   * @param _contract
   */
  async function _softcap(_contract: Contract) {
    try {
      const __softcap = await _contract.softcap();
      setSoftcap(__softcap);
    } catch (err) {
      console.log("failed fetch ICO softcap");
    }
  }
  /**
   * get ICO fundsRaised
   * @param _contract
   */
  async function _fundsRaised(_contract: Contract) {
    try {
      const __fundsRaised = await _contract.fundsRaised();
      setFundsRaised(__fundsRaised);
    } catch (err) {
      console.log("failed fetch ICO fundsRaised");
    }
  }
  /**
   * fetch ICO endTime
   * @param _contract
   */
  async function _startTime(_contract: Contract) {
    try {
      const __startTime = await _contract.startTime();
      setStartTime(__startTime);
    } catch (err) {
      console.log("failed fetch ICO startTime");
    }
  }
  /**
   * fetch ICO endTime
   * @param _contract
   */
  async function _endTime(_contract: Contract) {
    try {
      const __endTime = await _contract.endTime();
      setEndTime(__endTime);
    } catch (err) {
      console.log("failed fetch ICO endTime");
    }
  }
  /**
   * test if ICO is fully charged to reach hardcap and start
   * @param _contract
   */
  async function _tokensFullyCharged(_contract: Contract) {
    try {
      const __tokensFullyCharged = await _contract.tokensFullyCharged();
      setTokensFullyCharged(__tokensFullyCharged);
    } catch (err) {
      console.log("failed to test if ICO is fully charged with tokens");
    }
  }
  /**
   * fetch project data
   * @param _contract
   */
  async function _project(_contract: Contract) {
    try {
      const _projectURI = await _contract.projectURI();
      const response = await fetch(_projectURI);
      const __project = await response.json();
      setProject(__project);
    } catch (err) {
      console.log("failed fetch project data");
    }
  }
  /**
   * fetch ICO status
   * @param _contract
   */
  async function _status(_contract: Contract) {
    try {
      const __status = await _contract.getICOState();
      setStatus(Number(__status));
    } catch (err) {
      console.log("Failed to fetch current status of ICO");
    }
  }
  /**
   * fetch IOC creator's information
   * @param _contract
   */
  async function _user(_contract: Contract) {
    try {
      const _creator = await _contract.creator();
      setOwner(_creator);
      const { data: user } = await axios.get(`${baseURL}/user/${_creator}`);
      setCreator(user);
    } catch (err) {
      console.log("Failed to fetch ICO creator's information");
    }
  }

  const handleLike = async () => {
    console.log(chainId, info.id, user);
    try {
      if (!user) return showToast("Please signin before start", "warning");
      const res = await api.post("/user/like", { chainId, address: info.id });
    } catch (err) {
      console.log(err);
      showToast("Operation Failed, Try again!", "warning");
    }
  }

  const _getICOInfo = async (_contract: Contract) => {
    // token data
    _token(_contract);
    // hardcap
    _hardcap(_contract);
    // softcap
    _softcap(_contract);
    // funds raised
    _fundsRaised(_contract);
    // ico endtime
    _endTime(_contract);
    // ico startime
    _startTime(_contract);
    // project data
    _project(_contract);
    // test if tokens are fully charged
    _tokensFullyCharged(_contract);
    // ICO status
    _status(_contract);
    // creator data
    _user(_contract);
  };

  React.useEffect(() => {
    timerRef.current = setInterval(async () => {
      const _now = Math.floor(Date.now() / 1000);
      const _distance = endTime - _now;
      setDistance(_distance);
      if ((_distance < 0 || isNaN(_distance)) && timerRef.current) {
        clearInterval(timerRef.current);
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      //@ts-ignore
      clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endTime]);

  const [days, hours, minutes, seconds] = React.useMemo(() => {
    let days: string | number = Math.floor(distance / (60 * 60 * 24));
    let hours: string | number = Math.floor(
      (distance % (60 * 60 * 24)) / (60 * 60)
    );
    let minutes: string | number = Math.floor((distance % (60 * 60)) / 60);
    let seconds: string | number = Math.floor(distance % 60);

    days = days > 9 ? days : days > 0 ? "0" + days : "0";
    hours = hours > 9 ? hours : hours > 0 ? "0" + hours : "0";
    minutes = minutes > 9 ? minutes : minutes > 0 ? "0" + minutes : "0";
    seconds = seconds > 9 ? seconds : seconds > 0 ? "0" + seconds : "0";

    return [days, hours, minutes, seconds];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distance]);

  useAsyncEffect(async () => {
    const _jsonRpcProvider = new providers.JsonRpcProvider(CHAIN_DATA[info.chainId].rpc);
    const _contract = new Contract(info.id, ICO, _jsonRpcProvider);
    _getICOInfo(_contract);
  }, [])

  const router = useRouter();

  const _renderStatusText = React.useMemo(() => {
    if (status === 0 && !tokensFullyCharged) {
      return (
        <div className="ribbon bg-gradient-to-r from-[#55739b] to-[#03b1cf] shadow-lg">
          <span className="font-bold text-sm text-white [text-shadow:_0_2px_2px_rgb(0_0_0_/_40%)]">
            AWAIT
          </span>
        </div>
      );
    } else if (status === 0 && tokensFullyCharged && Number(fundsRaised) < Number(softcap)) {
      return (
        <div className="ribbon bg-gradient-to-r from-[#a89262] to-[#c4b585] shadow-lg">
          <span className="font-bold text-sm text-white [text-shadow:_0_2px_2px_rgb(0_0_0_/_40%)]">
            Live
          </span>
        </div>
      );
    } else if (status === 0 && tokensFullyCharged && Number(fundsRaised) >= Number(softcap)) {
      return (
        <div className="ribbon bg-gradient-to-r from-[#cfb377] to-[#c4b585] shadow-lg">
          <span className="font-bold text-sm text-white [text-shadow:_0_2px_2px_rgb(0_0_0_/_40%)]">
            PASSING
          </span>
        </div>
      );
    } else if (status === 1) {
      return (
        <div className="ribbon bg-gradient-to-r from-[#ff3c00] to-[#cc2b2b] shadow-lg">
          <span className="font-bold text-black text-sm [text-shadow:_0_2px_2px_rgb(0_0_0_/_40%)]">
            FAILED
          </span>
        </div>
      );
    } else {
      return (
        <div className="ribbon bg-gradient-to-r from-[#a5d23b] to-[#857538] shadow-lg">
          <span className="font-bold text-sm text-white [text-shadow:_0_2px_2px_rgb(0_0_0_/_40%)]">
            SUCCESS
          </span>
        </div>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, tokensFullyCharged]);
  /**
   * render ICO status text
   */
  const _renderStatus = React.useMemo(() => {
    if (status === 0 && !tokensFullyCharged) {
      return ["Await Deposit", "#04B1F5"];
    } else if (status === 0 && tokensFullyCharged) {
      return ["Live", "#0CAF60"];
    } else if (status === 1) {
      return ["Failed", "#9c1f1f"];
    } else {
      return ["Success", "#0CAF60"];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, tokensFullyCharged]);

  return (
    <div className="w-full dark:bg-[#100E28] bg-white p-4 rounded-2xl relative">
      <section id="logo" className="relative w-full rounded-2xl aspect-square">
        {
          !project ?
            <Skeleton className="rounded-lg w-full aspect-square dark:bg-[#363639] bg-gray-400">
              <div className="dark:bg-gray-700 bg-gray-400 aspect-square w-full h-full rounded-[19px]"></div>
            </Skeleton> :
            project.logo.type === "video/mp4" ?
              <video
                className="w-full h-full object-contain dark:bg-black bg-gray-100  rounded-2xl"
                controls
              >
                <source src={project.logo.url} />
              </video> :
              <LazyImage src={project.logo.url} />
        }
        <div className="absolute right-4 -translate-y-1/2 w-1/6 p-1 bg-white rounded-[30%]">
          {creator?.avatar ? (
            <Image
              key={creator.avatar}
              src={creator.avatar}
              width={0}
              height={0}
              alt="mini-logo"
              sizes="100vw"
              className="w-full h-full aspect-square rounded-[30%]"
            />
          ) : (
            <div className="w-full h-full rounded-[30%] aspect-square dark:bg-gray-700 bg-gray-300"></div>
          )}
        </div>
        <div className="absolute flex gap-1 items-center p-2 left-3 bottom-3 rounded-full bg-[#00000069] backdrop-filter backdrop-blur-[5px]">
          <Image
            src={"/images/eth.webp"}
            width={22}
            height={22}
            alt="mini-logo"
            className="rounded-full"
          />
          <span className="text-xs text-white pr-2">
            {token ? reduceAmount(formatEther(token.price)) : "0"} ETH
          </span>
        </div>
        {_renderStatusText}
      </section>

      <section id="live" className="mt-5 flex gap-2">
        <div className="text-xs flex gap-3 items-center bg-[#D2FAE5] dark:bg-black dark:text-white px-3 py-[6px] rounded-full">
          <span>{_renderStatus[0]}</span>
          <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: _renderStatus[1] }}></div>
        </div>
        {address === owner && status === 0 && !tokensFullyCharged && (
          <div
            onClick={() => router.push(`/deposit?chainId=${info.chainId}&id=${info.id}`)}
            className="text-xs flex gap-3 items-center bg-[#48916a] text-white cursor-pointer hover:opacity-60 dark:text-white px-3 py-[6px] rounded-full"
          >
            Deposit Token
          </div>
        )}
      </section>
      {
        project?.title ?
          <h2 className="mt-2 font-bold text-black dark:text-white text-[15px]">
            {project.title}
          </h2> :
          <h2 className="mt-2 font-bold text-black dark:text-white min-h-[18.5px] animate-pulse dark:bg-[#00000088] rounded-full w-2/3 bg-gray-300"></h2>
      }
      <h5 className="text-[] dark:text-[#868686] text-xs mt-1">Fair Launch</h5>

      <section id="title" className="gap-2 mt-4 flex items-center">
        <Image
          src={"/images/usdt.png"}
          width={22}
          height={22}
          alt="mini-logo"
          className="rounded-full"
        />
        <span className="text-[15px] font-bold text-[#1BA9F8]">
          {token?.price
            ? reduceAmount(
              Number(formatEther(BigInt(String(token.price)))) * ethPrice
            )
            : 0}{" "}
          USDT
        </span>
      </section>

      <section id="progress" className="mt-3 text-[#868686]">
        <h2 className="text-sm mb-2">
          Progress ({hardcap > 0 ? reduceAmount((Number(formatEther(fundsRaised)) * 100) / Number(formatEther(hardcap))) : 0}{" "}%)
        </h2>
        <Progress
          hardcap={Number(formatEther(hardcap))}
          softcap={Number(formatEther(softcap))}
          fundsRaised={Number(formatEther(fundsRaised))}
        />
        <div className="mt-2 flex justify-between text-sm">
          <span>{reduceAmount(formatEther(fundsRaised))} ETH</span>
          <span>{reduceAmount(formatEther(hardcap))} ETH</span>
        </div>
      </section>

      <section
        id="Start Time"
        className="flex justify-between text-black dark:text-[#C0C0C0] text-sm mt-4"
      >
        <span>Start Time:</span>
        <span>{new Date(startTime * 1000).toDateString()}</span>
      </section>
      <section
        id="LockupTime"
        className="flex justify-between text-black dark:text-[#C0C0C0] text-sm mt-1"
      >
        <span>Lockup Time:</span>
        <span>{new Date(endTime * 1000).toDateString()}</span>
      </section>

      <section
        id="actions"
        className="mt-5 max-w-1/2 flex gap-2 justify-between items-center text-xs"
      >
        <div className="flex truncate items-center gap-2 rounded-full bg-[#E5EBFF] dark:bg-black p-2 pr-3 text-[#0776DA] dark:text-white">
          <Icon icon="fa6-regular:clock" width={22} />
          <span className="truncate">{`${days}d ${hours}h ${minutes}m ${seconds}s`}</span>
        </div>

        <section className="flex gap-1">
          {/* <button onClick={handleLike} className="dark:bg-[#020110] bg-[#E5EBFF] px-[10px] rounded-xl hover:opacity-60">
            <Icon icon="ph:heart-bold" width={22} className="text-[#2B6EC8]" />
            <Icon icon="tabler:heart-filled" width={22} className="text-[#2B6EC8]" />
          </button> */}
          <button
            onClick={() => router.push(`/details?chainId=${info.chainId}&id=${info.id}`)}
            className="rounded-xl truncate bg-[#2B6EC8] px-2 text-white py-3"
          >
            View
          </button>
          <a
            href={`${CHAIN_DATA[String(chain?.id)]?.explorer}/address/${info.id}`}
            target="_blank"
            className="dark:bg-[#020110] bg-[#E5EBFF] px-[10px] rounded-xl hover:opacity-60 flex justify-center items-center"
          >
            <Icon
              icon="ic:twotone-travel-explore"
              width={22}
              className="text-[#2B6EC8]"
            />
          </a>
        </section>
      </section>

      <div className="px-2 py-[1px] rounded-lg top-0 right-3 -translate-y-1/2 absolute bg-[#FFE7E4] text-[#FF6A55] text-[12px] font-bold">
        {hardcap > 0 ? reduceAmount((Number(formatEther(fundsRaised)) * 100) / Number(formatEther(hardcap))) : 0}%
      </div>

      <div className="absolute top-3 left-3 p-2">
        <Tooltip className="text-white" showArrow={true} content={CHAIN_DATA[info.chainId].name}>
          <Image
            src={CHAIN_DATA[info.chainId].logo}
            className="rounded-full"
            height={40}
            width={40}
            alt="logo"
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default Card;
