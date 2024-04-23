"use client";
import React from "react";
import Header from "@/components/dashboard/header";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Contract } from "ethers";
import { Tooltip } from "flowbite-react";
//hooks
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import ClipboardCopier from "@/components/share/clipCopier";
import QRcode from "react-qr-code";
import { useRouter } from "next/navigation";
//abis
import ICO from "@/constants/abis/ICO.json";
import axios from "axios";
import { baseURL } from "@/constants/config";
// types
import { IUser, IProject, IToken } from "@/types";
import { reduceAmount } from "@/utils";
import { formatUnits } from "viem";
// utils
import { copyToClipboard } from "@/utils";

import useToastr from "@/hooks/useToastr";
import { __private__ } from "@rainbow-me/rainbowkit";

const LaunchPad = ({ params }: { params: { id: string } }) => {
  const { address, chainId, signer } = useActiveWeb3();
  const [contract, setContract] = React.useState<Contract | undefined>(
    undefined
  );
  const [token, setToken] = React.useState<IToken | undefined>(undefined);
  const [price, setPrice] = React.useState<bigint>(BigInt("0"));
  const [project, setProject] = React.useState<IProject | undefined>(undefined);
  const [hardcap, setHardcap] = React.useState<bigint>(BigInt("0"));
  const [softcap, setSoftcap] = React.useState<bigint>(BigInt("0"));
  const [fundsRaised, setFundsRaised] = React.useState<bigint>(BigInt("0"));
  const [startTime, setStartTime] = React.useState<number>(0);
  const [endTime, setEndTime] = React.useState<number>(0);
  const [distance, setDistance] = React.useState<number>(0);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const [mediaType, setMediaType] = React.useState<string>("");
  const [creator, setCreator] = React.useState<IUser | undefined>(undefined);
  const [balance, setBalance] = React.useState<number>(0);

  const { showToast } = useToastr();

  const router = useRouter();

  const handleCopyAddress = async () => {
    showToast("Copied address to clipboard", "success");
    await copyToClipboard(params.id);
  };

  React.useEffect(() => {
    if (!contract) return;
    _getICOInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  const _getICOInfo = async () => {
    const _token = await contract?.tokenInfo();
    if (!_token) return;
    setToken(_token);
    setPrice(_token.price);

    const _hardcap = await contract?.hardcap();
    setHardcap(_hardcap);

    const _startTime = await contract?.startTime();
    setStartTime(Number(_startTime));

    const _softcap = await contract?.softcap();
    setSoftcap(_softcap);

    const _fundsRaised = await contract?.fundsRaised();
    setFundsRaised(_fundsRaised);

    const _endTime = await contract?.endTime();
    setEndTime(Number(_endTime));

    const _decimals = Number(_token.decimal);

    const _balance = await contract?.tokensAvailable();
    setBalance(Number(formatUnits(_balance, _decimals)));
    // setBalance (String(parseUnits(String(Number(_balance)), 18)));

    const _projectURI = await contract?.projectURI();
    const response = await fetch(_projectURI);
    const _project = await response.json();
    setProject(_project);

    const _creator = await contract?.creator();
    const { data: user } = await axios.get(`${baseURL}/user/${_creator}`);
    console.log(_project);
    setCreator(user);
  };

  React.useEffect(() => {
    timerRef.current = setInterval(async () => {
      const _now = new Date().getTime();
      const _distance = endTime - Math.floor(_now / 1000);
      setDistance(_distance);
      if ((_distance < 0 || isNaN(_distance)) && timerRef.current) {
        clearInterval(timerRef.current);
      }
    }, 1000);
    return () => {
      //@ts-ignore
      clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endTime]);


  React.useEffect(() => {
    if (!address || !chainId || !signer || !params.id) {
      return;
    }
    const _contract = new Contract(params.id, ICO, signer);
    setContract(_contract);
  }, [address, chainId, signer, params.id]);

  // const _depositAmountToSoftcap = React.useMemo(() => {
  //   if (Number(price) === 0) {
  //     return BigInt("0");
  //   } else {
  //     return softcap / price;
  //   }
  // }, [price, softcap]);
  //@dev deposit token amount to reach hardcap
  const _depositAmountToHardcap = React.useMemo(() => {
    if (price === BigInt("0") || hardcap === BigInt("0")) {
      return 0;
    } else {
      const _amount =  hardcap / price;
      // return _amount;
      console.log(price, hardcap, _amount)
      return Number(_amount);
    }
  }, [price, hardcap]);


  return (
    <div className="w-full">
      <div className="flex gap-2 justify-between items-center pr-3 mt-5">
        <span
          onClick={() => router.push("/")}
          className="py-2 dark:text-white text-gray-700 cursor-pointer hover:underline flex items-center gap-1 text-sm font-bold px-4"
        >
          <Icon icon="icon-park-solid:back" width={15} height={15} /> Return to
          Vulcan Pad
        </span>
      </div>
      <h2 className="text-lg font-bold text-center dark:text-white mt-20">
        { 
          _depositAmountToHardcap > balance ? 
          <>** You need to deposit <span className="text-lg text-green-600 font-bold">{ String(_depositAmountToHardcap - balance) } tokens</span> to reach your hard cap and start this ICO. **</> :
          <>** ICO have been started **</> 
        }
      </h2>

      <h3 className="text-center dark:text-white text-sm mt-5">( charged { balance } tokens )</h3>

      <div className="dark:text-white text-black text-sm mt-8 flex gap-1 items-center justify-center">
        <span
          onClick={handleCopyAddress}
          className="hover:underline cursor-pointer w-[100px] xs:w-auto truncate"
        >
          {params.id}
        </span>
        <Tooltip content="Copy address" style="dark">
          <ClipboardCopier size={22} text={params.id} />
        </Tooltip>
        <Tooltip content="Go to chain" style="dark">
          <a
            href={`https://sepolia.etherscan.io/address/${params.id}`}
            target="_blank"
          >
            <Icon
              className="cursor-pointer"
              icon="fluent:open-16-filled"
              width={22}
            />
          </a>
        </Tooltip>
      </div>

      <div className="w-full flex justify-center relative mt-5">
        <QRcode value={params.id} width={100} height={100} />
        <Image
          src={"/favicon.svg"}
          width={60}
          height={60}
          alt={"logo"}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
};

export default LaunchPad;
