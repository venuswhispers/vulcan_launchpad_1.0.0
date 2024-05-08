"use client";
import React from "react";
import Header from "@/components/dashboard/header";
import Image from "next/image";
import { Tooltip } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Skeleton } from "@nextui-org/react";
import { Contract } from "ethers";
// dynamic imports
import dynamic from "next/dynamic";
const Refund = dynamic(() => import("@/components/dashboard/invest/refund"), { ssr: false });
const Invest = dynamic(() => import("@/components/dashboard/invest/invest"), { ssr: false });
const Distribution = dynamic(() => import("@/components/dashboard/invest/distribution"), { ssr: false });
const History = dynamic(() => import("@/components/dashboard/invest/history"), { ssr: false });
const Displayer = dynamic(() => import("@/components/dashboard/create/atoms/quillDisplayer"), { ssr: false });
const SuccessModal = dynamic(() => import("@/components/dashboard/invest/investSuccess"), { ssr: false });
const IntroductionMovie = dynamic(() => import("@/components/dashboard/introMovie"), { ssr: false });
//hooks
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import useToastr from "@/hooks/useToastr";
//abis
import ICO from "@/constants/abis/ICO.json";
import axios from "axios";
import { baseURL } from "@/constants/config";
// types
import { IUSER, IProject, IToken, HISTORY, REFUND, DISTRIBUTION, CONTRIBUTION, INVESTMENT } from "@/types";
// utils
import { formatEther, formatUnits, parseEther, parseUnits } from "viem";
import { reduceAmount } from "@/utils";
// constants
import { CHAIN_DATA, DATES } from "@/constants/constants";
import useAPI from "@/hooks/useAPI";
// atoms
import { fromAmountAtom, toAmountAtom, ethAmountAtom, hashAtom } from "@/store";
import { useAtom } from "jotai";

const LaunchPad = ({ params }: { params: { id: string } }) => {
  // atoms
  const [fromAmount, setFromAmount] = useAtom<string>(fromAmountAtom);
  const [toAmount, setToAmount] = useAtom<bigint>(toAmountAtom);
  const [ethAmount, setEthAmount] = useAtom<bigint>(ethAmountAtom);
  const [hash, setHash] = useAtom<string>(hashAtom);
  // states
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
  const [wallet, setWallet] = React.useState<string>("");
  const [distance, setDistance] = React.useState<number>(0);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const [mediaType, setMediaType] = React.useState<string>("");
  const [creator, setCreator] = React.useState<IUSER | undefined>(undefined);
  const [tokensAvailable, setTokensAvailable] = React.useState<bigint>(BigInt("0"));
  const [tokensFullyCharged, setTokensFullyCharged] = React.useState<boolean>(false);
  const [ethPrice, setEthPrice] = React.useState<number>(3000);
  const [investHistory, setInvestHistory] = React.useState<HISTORY[]>([]);
  const [invetors, setInvestors] = React.useState<string[]>([]);
  const [lister, setLister] = React.useState<string>("");
  const [contributions, setContributions] = React.useState<CONTRIBUTION[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [ICOStatus, setICOStatus] = React.useState<number>(0);
  const [cap, setCap] = React.useState<string>("Hardcap");
  // show Modals
  const [showInvestModal, setShowInvestModal] = React.useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState<boolean>(false);
  const [showHistory, setShowHistory] = React.useState<boolean>(false);
  const [showDistribution, setShowDistribution] = React.useState<boolean>(false);
  const [showRefund, setShowRefund] = React.useState<boolean>(false);
  const [showIntroduction, setShowIntroduction] = React.useState<boolean>(false);

  const [refund, setRefund] = React.useState<REFUND>({     
    refunded: false,
    refunder: "",
    timestamp: 0,
    hash: ""
  });
  const [distribution, setDistribution] = React.useState<DISTRIBUTION>({     
    distributed: false,
    distributor: "",
    timestamp: 0,
    hash: ""
  });

  const { showToast } = useToastr ();
  const api = useAPI ();

  // console.log(
  //   Number(hardcap),
  //   Number(token?.price),
  //   tokensAvailable,
  //   tokensFullyCharged
  // );

  /**
   * get tokens available
   * @param _contract Contract
   */
  async function _tokensAvailable(_contract: Contract) {
    try {
      
      const __tokensAvailable = await _contract.tokensAvailable();
      setTokensAvailable(__tokensAvailable);

    } catch (err) {
      console.log("failed fetch token data");
    }
  }

  /**
   * get token data
   * @param _contract Contract
   */
  async function _token(_contract: Contract) {
    try {
      const __token = await _contract.tokenInfo();
      setToken(__token);
      setPrice(__token.price);
      const _decimals = Number(__token.decimal);
      const _tokensAvailable = await _contract.tokensAvailable();
      setTokensAvailable(_tokensAvailable);

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
   * fetch ICO startTime
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
      const __tokensFullyCharged = await _contract.tokensFullyCharged ();
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

      fetch(__project.logo)
        .then((response) => response.blob())
        .then((blob) => {
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", { logo: __project.logo, type: blob.type });
          // const type = blob.type.split("/")[0]; // Get the main type (image, video, etc.)
          setMediaType(blob.type);
        })
        .catch((error) => console.error("Error fetching media:", error));
    } catch (err) {
      console.log("failed fetch project data");
    }
  }

  /**
   * fetch IOC creator's information
   * @param _contract
   */
  async function _user(_contract: Contract) {
    try {
      const _creator = await _contract.creator();
      // setOwner(_creator);
      const { data: user } = await axios.get(`${baseURL}/user/${_creator}`);
      setCreator(user);
    } catch (err) {
      console.log("Failed to fetch ICO creator's information");
    }
  }

  /**
   * fetch ICO investment history
   * @param _contract 
   */
  async function _history (_contract: Contract) {
    try {
      const __history: any[] = await _contract.getHistory ();
      const _investHistory: HISTORY[] = __history.map((_item: any[]) => ({ investor: String(_item[0]), contributor: String(_item[1]), amount: BigInt(_item[2]), timestamp: Number(_item[3]) }))
      setInvestHistory (_investHistory);
    } catch (err) {
      console.log("Failed to fetch ICO investment history");
    }
  }

  /**
   * fetch ICO investors
   * @param _contract 
   */
  async function _investors (_contract: Contract) {
    try {
      const ___investors: string[] = await _contract.getInvestors ();
      setInvestors (___investors);
    } catch (err) {
      console.log("Failed to fetch ICO investors");
    }
  }

  /**
   * fetch ICO creator's wallet
   * @param _contract 
   */
  async function _creator (_contract: Contract) {
    try {
      const __wallet: string = await _contract.fundsAddress ();
      setWallet (__wallet);
    } catch (err) {
      console.log(err)
      console.log("Failed to fetch ICO creator's wallet that funds will go to");
    }
  }

  /**
   * fetch ICO status
   * @param _contract 
   */
  async function _ICOStatus (_contract: Contract) {
    try {
      const _status: number = await _contract.getICOState ();
      setICOStatus (Number(_status));

      if (_status === 1) {
        const _refund = await _contract.refund ();
        const { data } = await api.get(`/ico/invest/refund?refunder=${_refund[1]}&ico=${params.id}`);
        console.log(data);
        const _hash = data ? data.txHash : "";
        setRefund({
          refunded: _refund[0],
          refunder: _refund[1],
          timestamp: _refund[2],
          hash: _hash
        });
      } else if (_status === 2 || _status === 3) {
        const _distribute = await _contract.distribution();
        const { data } = await api.get(`/ico/invest/distribution?distributor=${_distribute[1]}&ico=${params.id}`);
        const _hash = data ? data.txHash : "";
        setDistribution({
          distributed: _distribute[0],
          distributor: _distribute[1],
          timestamp: _distribute[2],
          hash: _hash
        });
      }
    } catch (err) {
      console.log(err)
      console.log("Failed to fetch ICO distribution");
    }
  }

  // console.log({
  //   distribution,
  //   refund,
  //   ICOStatus
  // })

  const myContribution = React.useMemo(() => {
    if (!address) {
      return BigInt("");
    } else {
      return investHistory.reduce((acc: bigint, item: HISTORY) => item.investor === address ? acc + item.amount : acc, BigInt("0"));
    }
  }, [investHistory, address]);

  const maxTokens = React.useMemo(() => {
    if (!token || !contract || tokensAvailable === BigInt("0") || ICOStatus !== 0 || !tokensFullyCharged) {
      return BigInt("0");
    }
    const _value = BigInt(tokensAvailable) - parseEther("1") * BigInt(fundsRaised) / BigInt(token.price);
    return _value;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fundsRaised, token?.price, tokensAvailable, fundsRaised]);

  const _getICOInfo = async (_contract: Contract) => {
    // token data
    _token(_contract);
    // hardcap
    _hardcap(_contract);
    // softcap
    _softcap(_contract);
    // funds raised
    _fundsRaised(_contract);
    // ico startTime
    _startTime(_contract);
    // ico endtime
    _endTime(_contract);
    // project data
    _project(_contract);
    // test if tokens are fully charged
    _tokensFullyCharged(_contract);
    // creator data
    _user(_contract);
    // ICO history
    _history (_contract);
    // get ICO investors
    _investors (_contract);
    // get tokensAvailable
    _tokensAvailable (_contract);
    // get ICO status
    _ICOStatus (_contract);
    // get ICO wallet that funds will go to
    _creator (_contract);

    const _lister = await _contract.lister();
    setLister (_lister);
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

  //@ts-ignore
  // console.log(Number(fundsRaised), useBalance({address: params.id}).data?.value);

  React.useEffect(() => {
    if (!address || !chainId || !signer || !params.id) {
      return;
    }
    const _contract = new Contract(params.id, ICO, signer);
    setContract(_contract);
    _getICOInfo(_contract);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, chainId, signer, params.id]);

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

  const _fetchDistributionData = async () => {
    try {
      if (!contract) throw "no contract";
      const _contributors = await contract.getContributors ();
      const contributions: CONTRIBUTION[] = await Promise.all(_contributors.map(async(_contributor: string) => {
        const _amount: bigint = await contract.contributions(_contributor);
        return {
          contributor: _contributor,
          amount: _amount
        }
      }));
      setContributions (contributions);
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", distribution)
    if (( ICOStatus === 2 || ICOStatus === 3 ) && distribution.distributed) {
      _fetchDistributionData ();
      setCap(ICOStatus === 2 ? "Softcap": "Hardcap");
      setShowDistribution (true);
    } else if (ICOStatus === 1 && refund.refunded) {
      setShowRefund (true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ICOStatus, distribution, refund])

  const _renderItem = (title: string, value: string) => (
    <div className="flex h-12 gap-4 justify-between text-sm items-center border-b border-[#E6E8EC] dark:border-[#ededee1a]">
      <h2 className="text-[15px] font-bold text-[#6F6F6F] dark:text-[#CCCCCC]">
        {title}
      </h2>
      <div className="flex gap-1 items-center">
        <Image src={"/images/eth.svg"} width={20} alt="" height={20} />
        <div className="text-[15px] flex gap-1 font-bold dark:text-[#B4B4B7] text-[#101010]">
          <h2 className="max-w-[100px] truncate">{value}</h2>
          ETH
        </div>
      </div>
    </div>
  );

  // @dev render cooldown clock counter
  const _renderCoolDownItem = (
    title: string,
    value: string,
    underline: boolean,
    top?: boolean
  ) => (
    <div
      className={`flex h-12 gap-4 justify-between text-sm items-center ${underline && "border-b"} ${top && 'border-t'} border-[#E6E8EC] dark:border-[#ededee1a]`}
    >
      <h2 className="text-[15px] font-bold text-[#6F6F6F] dark:text-[#CCCCCC]">
        {title}
      </h2>
      <div className="items-center text-[15px] font-bold dark:text-[#B4B4B7] text-[#101010]">
        {value}
      </div>
    </div>
  );

  // @dev finish ICO
  const _finish = async () => {

    try {
      setIsLoading(true);

      const _distribution = await contract?.distribution();
      const _refund = await contract?.refund ();

      if (_refund[0] || _distribution[0]) {
        _getICOInfo (contract as Contract);
        return;
      }
     
      const _tx = await contract?.finish ();
      await _tx.wait ();

      if (ICOStatus === 2) {
        await api.post('/ico/invest/distribution', { 
          ico: params.id,
          distributor: String(address),
          txHash: _tx.hash,
          chainId: Number(chainId)
        });
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> success distribute update")
      } else if (ICOStatus === 1) {
        await api.post('/ico/invest/refund', { 
          ico: params.id,
          refunder: String(address),
          txHash: _tx.hash,
          chainId: Number(chainId)
        });
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> success refund update")
      };

      showToast ("Success", "success");
      _getICOInfo (contract as Contract);
    } catch (err) { 
      showToast(String(err), "wanring");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  const _renderActionButton = () => {
    if (ICOStatus === 0) {
      return (
        <button onClick={() => setShowInvestModal(true)} className="bg-[#2B6EC8] text-sm flex gap-1 items-center rounded-lg py-2 pt-3 px-4 text-white font-bold hover:bg-[#2b35c8]">
          <Icon icon="token:bondly" width={20} height={20}/> Back This Project
        </button>
      )
    } else if (ICOStatus === 1 && !refund.refunded) {
      return (
        <button onClick={_finish} className="bg-[#2B6EC8] flex gap-1 text-sm items-center rounded-lg py-2 pt-3 px-4 text-white font-bold hover:bg-[#2b35c8]">
          {
              isLoading ?
              <>
                <Icon icon="eos-icons:bubble-loading" width={20} height={20}/> PROCESSING...
              </> :
              <span className="flex gap-1 items-center">
                <Icon icon="tabler:credit-card-refund" width={20} height={20}/> REFUND ALL
              </span>
          }
        </button>
      )
    } else if (ICOStatus === 1 && refund.refunded) {
      return (
        <div className="flex gap-1 items-center">
          <h3 onClick={() => setShowRefund(true)} className="rounded-lg cursor-pointer text-red-700 underline hover:opacity-60 py-3 font-bold text-lg">
            Refunded as Failure
          </h3>
          <Tooltip className="relative z-50 bg-black text-white p-2" content={`Completed by ${refund.refunder} on ${new Date(refund.timestamp*1000).toLocaleString()}`}>
            <Icon icon="ep:info-filled" className="dark:text-[#a48ccf] text-[#5a4483] cursor-pointer hover:opacity-60" />
          </Tooltip>
        </div>
      )
    } else if (ICOStatus === 2 && !distribution.distributed) {
      return (
        <button onClick={_finish} className="bg-[#2B6EC8] flex gap-1 text-sm items-center rounded-lg py-2 pt-3 px-4 text-white font-bold hover:bg-[#2b35c8]">
          {
              isLoading ?
              <>
                <Icon icon="eos-icons:bubble-loading" width={20} height={20}/> PROCESSING...
              </> :
              <>
                <Icon icon="icon-park-outline:funds" width={20} height={20}/> DISTRIBUTE FUNDS & TOKENS
              </>
          }
        </button>
      )
    } else if (ICOStatus === 2 && distribution.distributed) {
      return (
        <div className="flex gap-1 items-center">
          <h3 onClick={() => setShowDistribution(true)} className="rounded-lg text-green-500 underline hover:opacity-60 cursor-pointer py-3 font-bold text-lg">
            Distributed After Reaching Softcap
          </h3>
          <Tooltip className="relative z-50 bg-black text-white p-2" content={`Completed by ${distribution.distributor} on ${new Date(distribution.timestamp*1000).toLocaleString()}`}>
            <Icon icon="ep:info-filled" className="dark:text-[#a48ccf] text-[#5a4483] cursor-pointer hover:opacity-60" />
          </Tooltip>
        </div>
      )
    } else {
      return (
        <div className="flex gap-1 items-center">
          <h3 onClick={() => setShowDistribution(true)} className="rounded-lg text-green-500 underline hover:opacity-60 cursor-pointer py-3 font-bold text-lg">
            Distributed After Reaching Hardcap
          </h3>
          <Tooltip className="relative z-50 bg-black text-white p-2" content={`Completed by ${distribution.distributor} on ${new Date(distribution.timestamp*1000).toLocaleString()}`}>
            <Icon icon="ep:info-filled" className="dark:text-[#a48ccf] text-[#5a4483] cursor-pointer hover:opacity-60" />
          </Tooltip>
        </div>
      )
    }
  }

  
  return (
    <div className="flex w-full flex-col gap-4">
      <Header />
      { showInvestModal && token && contract && 
        <Invest 
          id={params.id}
          visible={showInvestModal} 
          setVisible={setShowInvestModal}
          setShowSuccessModal={setShowSuccessModal}
          token={token}
          price={price}
          contract={contract}
          ethPrice={ethPrice}
          refresh={_getICOInfo}
          myContribution={myContribution}
          maxTokens={maxTokens}
          totalSupply={token.totalSupply}
          tokensAvailable={tokensAvailable}
        /> 
      }
      { showHistory && 
        <History 
          investments={investHistory} 
          setVisible={setShowHistory} 
          explorer={CHAIN_DATA[String(chainId)].explorer}
        /> 
      }
      {
        showDistribution && contract &&
        <Distribution 
          cap={cap}
          id={params.id}
          setVisible={setShowDistribution} 
          explorer={CHAIN_DATA[String(chainId)].explorer}
          contract={contract}
          wallet={wallet}
          fundsRaised={fundsRaised}
          lister={lister}
          distribution={distribution}
          contributions={contributions}
        />
      }
      {
        showRefund && contract &&
        <Refund 
          id={params.id}
          setVisible={setShowRefund} 
          explorer={CHAIN_DATA[String(chainId)].explorer}
          contract={contract}
          fundsRaised={fundsRaised}
          refund={refund}
          investors={invetors}
          investments={investHistory}
        />
      }
      {
        showSuccessModal && token &&
        <SuccessModal
          setVisible={setShowSuccessModal}
          hash={hash}
          percent={reduceAmount(Number(toAmount) * 100 / Number(formatUnits(token.totalSupply, Number(token.decimal))))}
          tokens={Number(toAmount)}
          ethAmount={ethAmount}
        />
      }
      {
        showIntroduction && 
        <IntroductionMovie 
          setShowIntroduction={setShowIntroduction}
          url={project?.youtubeLink ? project.youtubeLink : "/introduction.mp4"}
        />
      }
      <div className="dark:bg-[#100E28] mt-10 bg-white px-3 xs:px-6 py-6 rounded-2xl grid grid-cols-1 gap-12 w1340:gap-8 w1340:grid-cols-[55%_calc(45%-32px)]">
        <section>
          <div className="w-full aspect-[2/1] bg-black rounded-2xl flex items-center justify-center">
            <Icon width={100}  onClick={() => setShowIntroduction(true)} className="text-white cursor-pointer hover:opacity-60" icon="material-symbols-light:smart-display-outline-rounded" />
          </div>
          {/* <div className="w-full min-h-[230px] bg-black rounded-2xl flex items-center">
            <ReactPlayer
              controls
              className="react-player rounded-[19px]"
              url={
                project?.youtubeLink ? project.youtubeLink : "/introduction.mp4"
              }
              width="100%"
              height="100%"
              style={{
                borderRadius: 17,
              }}
            />
          </div> */}

          <div className="w-full px-1">
            <div className="flex justify-between mt-5 flex-col xs:flex-row items-center gap-2 xs:gap-1">
              <div className="flex gap-2 items-center">
                <h3 className="dark:text-[#CCCCCC] text-[#101010] text-lg font-bold">
                  {project?.title}
                </h3>
                <Tooltip className="relative z-50 bg-black text-white p-2 border-none" content={`view ICO in block scan`}>
                  <a href={`${CHAIN_DATA[String(chainId)].explorer}/address/${params.id}`} target="_blank"><Icon className='cursor-pointer hover:opacity-60 text-black dark:text-white' icon="fluent:open-16-filled" width={22} /></a>
                </Tooltip>
              </div>
              <div className="flex gap-1 items-center">
                {project?.facebook && (
                  <a
                    href={project.facebook}
                    target="_blank"
                    className="p-2 cursor-pointer hover:opacity-60 rounded-full bg-[#EFEFEF]"
                  >
                    <Icon icon="iconoir:facebook" width={15} height={15} />
                  </a>
                )}
                {project?.linkedin && (
                  <a
                    href={project.linkedin}
                    target="_blank"
                    className="p-2 cursor-pointer hover:opacity-60 rounded-full bg-[#EFEFEF]"
                  >
                    <Icon icon="streamline:linkedin" width={15} height={15} />
                  </a>
                )}
                {project?.instagram && (
                  <a
                    href={project.instagram}
                    target="_blank"
                    className="p-2 cursor-pointer hover:opacity-60 rounded-full bg-[#EFEFEF]"
                  >
                    <Icon icon="fa6-brands:instagram" width={15} height={15} />
                  </a>
                )}
                {project?.twitter && (
                  <a
                    href={project.twitter}
                    target="_blank"
                    className="p-2 cursor-pointer hover:opacity-60 rounded-full bg-[#EFEFEF]"
                  >
                    <Icon icon="iconoir:twitter" width={15} height={15} />
                  </a>
                )}
              </div>
            </div>
            {_renderItem("HardCap", formatEther(hardcap))}
            {_renderItem("SoftCap", formatEther(softcap))}
            <div className="flex h-12 gap-4 justify-between text-sm items-center border-b border-[#E6E8EC] dark:border-[#ededee1a]">
              <h2 className="text-[15px] font-bold text-[#6F6F6F] dark:text-[#CCCCCC]">
                Current Amount raised
              </h2>
              <div className="flex gap-1 items-center">
                <Image src={"/images/eth.svg"} width={20} alt="" height={20} />
                <div className="text-[15px] flex gap-2 font-bold text-[#0CAF60] items-center">
                  <h2 className="max-w-[100px] truncate">
                    { formatEther(fundsRaised) }
                  </h2>
                  ETH
                  <Icon icon="bxs:up-arrow" />
                </div>
              </div>
            </div>
            <div className="flex h-12 gap-4 justify-between text-sm items-center border-b border-[#E6E8EC] dark:border-[#ededee1a]">
              <h2 className="text-[15px] font-bold text-[#6F6F6F] dark:text-[#CCCCCC]">
                Current Investors
              </h2>
              <div className="flex gap-1 items-center">
                  <h3 onClick={() => setShowHistory(true)} className="text-[#0CAF60] underline cursor-pointer font-bold text-[15px] hover:underline hover:opacity-60"><span className="dark:text-white font-bold text-gray-700 text-lg">{invetors.length}</span> BACKERS</h3>
                  <Tooltip className="relative z-50 bg-black text-white p-2 border-none" content={`Totally ${invetors.length} investors with ${investHistory.length} times`}>
                    <Icon icon="ep:info-filled" width={17} height={17} className="dark:text-[#a48ccf] text-[#5a4483] cursor-pointer hover:opacity-60" />
                  </Tooltip>
              </div>
            </div>
            {_renderCoolDownItem("Charged Tokens", formatUnits(tokensAvailable, Number(token?.decimal)), true)}
            {_renderItem("Token Price", formatEther(price))}
            {_renderItem("My Contribution", formatEther(myContribution))}
            {_renderCoolDownItem(
              "Start Time",
              DATES[new Date(startTime * 1000).getDay()] + " " + new Date(startTime * 1000).toLocaleString(),
              true
            )}
            {_renderCoolDownItem(
              "End Time",
              DATES[new Date(endTime * 1000).getDay()] + " " + new Date(endTime * 1000).toLocaleString(),
              true
            )}
            {_renderCoolDownItem(
              "Time Remaining",
              `${days}d ${hours}h ${minutes}m ${seconds}s`,
              false
            )}
          </div>
          <div className="mt-5 mb-2 flex flex-col xs:flex-row gap-3 justify-between">
            {creator ? (
              <div className="flex items-center gap-2">
                <Image
                  src={creator.avatar ? creator.avatar : "/images/default.jpg"}
                  width={45}
                  alt=""
                  height={45}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-[#6F6F6F] dark:text-[#CCCCCC]">
                    Owner
                  </span>
                  <span className="dark:text-[#6F6F6F] text-black">
                    @{creator.fullName}
                  </span>
                </div>
              </div>
            ): <div></div>}
            { _renderActionButton () }
          </div>
          {_renderCoolDownItem("Evangalists", "Coming Soon", true, true)}
          {_renderCoolDownItem("Whitelists", "Coming Soon", true)}
        </section>

        <section>
          <h1 className="text-[#23262F] dark:text-[#CCCCCC] text-2xl font-bold">
            Building an open digital economy
          </h1>
          <div className="mt-5 mb-5 aspect-[2/1] flex justify-center items-center">
            {mediaType.toLowerCase().startsWith("video") ? (
              <video
                className="w-full rounded-xl"
                src={project ? project.logo : "/images/spade.png"}
                controls
              />
            ) : mediaType.toLowerCase().startsWith("image") ? (
              <Image
                src={project ? project.logo : "/images/spade.png"}
                // className={`${className} ${isImageLoading ? 'hidden' : 'block'}`}
                width={0}
                alt=""
                height={0}
                sizes="100vw"
                className="w-full rounded-xl"
              />
            ) : (
              <Skeleton className="rounded-lg w-full aspect-video dark:bg-[#363639] bg-gray-400">
                <div className="dark:bg-gray-700 bg-gray-400 aspect-square w-full h-full rounded-[19px]"></div>
              </Skeleton>
            )}
          </div>
          <div className="mt-5 text-sm text-[#777E90]">
            <Displayer value={project?.description ?? ""} />
          </div>
          <div className="border border-dashed border-[#ADADAD] rounded-lg p-4 mt-5">
            <div className="flex gap-4">
              <Image
                src={"/images/quote.svg"}
                width={40}
                alt="quote"
                height={40}
              />
              <div className="text-[#010914] dark:text-[#CCCCCC] text-sm">
                In future versions of Vulcan launchpad, this area will be a chat box for backers and also have top pinned comments by the highest ranked Evangalist for a particular ICO.
              </div>
            </div>
            <div className="border-l-[3px] pl-3 mt-2 border-[#0CAF60]">
              <h2 className="dark:text-[#CCCCCC] text-[#010914] text-[15px] font-bold">
                CryptoSI team
              </h2>
              <h2 className="text-[#A4A8AB] text-[12px]">Business owner</h2>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LaunchPad;
