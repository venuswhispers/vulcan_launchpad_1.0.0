"use client";
import React from "react";
import Header from "@/components/dashboard/header";
import Image from "next/image";
import { Tooltip, Popover } from "flowbite-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Contract } from "ethers";
import ReactPlayer from "react-player";
import dynamic from "next/dynamic";
const History = dynamic(() => import("@/components/dashboard/history"), { ssr: false });
const Displayer = dynamic(() => import("@/components/dashboard/create/atoms/quillDisplayer"), { ssr: false });
const Invest = dynamic(() => import("@/components/dashboard/invest/invest"), { ssr: false });
//hooks
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import useToastr from "@/hooks/useToastr";
import { useBalance } from "wagmi";
//abis
import ICO from "@/constants/abis/ICO.json";
import axios from "axios";
import { baseURL } from "@/constants/config";
// types
import { IUSER, IProject, IToken, INVEST, REFUND, DISTRIBUTION } from "@/types";
// utils
import { formatEther, formatUnits, parseEther, parseUnits } from "viem";
import { reduceAmount } from "@/utils";
// constants
import { CHAIN_DATA } from "@/constants/constants";

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
  const [creator, setCreator] = React.useState<IUSER | undefined>(undefined);
  const [tokensAvailable, setTokensAvailable] = React.useState<bigint>(BigInt("0"));
  const [tokensFullyCharged, setTokensFullyCharged] = React.useState<boolean>(false);
  const [owner, setOwner] = React.useState<string>("");
  const [showInvestModal, setShowInvestModal] = React.useState<boolean>(false);
  const [ethPrice, setEthPrice] = React.useState<number>(3000);
  const [myInvestment, setMyInvestment] = React.useState<bigint>(BigInt("0"));
  const [investments, setInvestments] = React.useState<INVEST[]>([]);
  const [invetors, setInvestors] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showHistory, setShowHistory] = React.useState<boolean>(false);
  const [refund, setRefund] = React.useState<REFUND>({     
    refunded: false,
    refunder: "",
    timestamp: 0
  });
  const [distribution, setDistribution] = React.useState<DISTRIBUTION>({     
    distributed: false,
    distributor: "",
    timestamp: 0
  });
  const [ICOStatus, setICOStatus] = React.useState<number>(0);

  const { showToast } = useToastr ();

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

  async function _myInvestment(_contract: Contract) {
    try {
      const __myInvestment = await _contract.investments (address);
      console.log(__myInvestment)
      setMyInvestment (__myInvestment);
    } catch (er) {
      console.log("failed to catch my investment of ICO");
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
          const type = blob.type.split("/")[0]; // Get the main type (image, video, etc.)
          setMediaType(type);
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
      setOwner(_creator);
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
      const _investments: INVEST[] = __history.map((_item: any[]) => ({ investor: String(_item[0]), contributor: String(_item[1]), amount: BigInt(_item[2]), timestamp: Number(_item[3]) }))
      setInvestments (_investments);
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
   * fetch ICO status
   * @param _contract 
   */
  async function _ICOStatus (_contract: Contract) {
    try {
      const _status: number = await _contract.getICOState ();
      setICOStatus (_status);
      if (_status === 1) {
        const _refund = await _contract.refund ();
        setRefund({
          refunded: _refund[0],
          refunder: _refund[1],
          timestamp: _refund[2]
        });
      } else if (_status === 2 || _status === 3) {
        const _distribute = await _contract.distribute();
        setDistribution({
          distributed: _distribute[0],
          distributor: _distribute[1],
          timestamp: _distribute[2]
        });
      }
    } catch (err) {
      console.log("Failed to fetch ICO investors");
    }
  }

  // console.log({
  //   distribution,
  //   refund,
  //   ICOStatus
  // })



  const maxTokens = React.useMemo(() => {
    if (!token || !contract || tokensAvailable === BigInt("0")) {
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
    // my ICO investment
    _myInvestment(_contract);
    // ICO history
    _history (_contract);
    // get ICO investors
    _investors (_contract);
    // get tokensAvailable
    _tokensAvailable (_contract);
    // get ICO status
    _ICOStatus (_contract);

    const _lister = await _contract.lister();
    console.log("lister---------------------", _lister);
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
  console.log(Number(fundsRaised), useBalance({address: params.id}).data?.value);

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
    underline: boolean
  ) => (
    <div
      className={`flex h-12 gap-4 justify-between text-sm items-center ${
        underline && "border-b"
      } border-[#E6E8EC] dark:border-[#ededee1a]`}
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

      const _tx = await contract?.finish ();
      await _tx.wait ();

      console.log(_tx);

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
              <>
                <Icon icon="tabler:credit-card-refund" width={20} height={20}/> FINISH WITH FAILED
              </>
          }
        </button>
      )
    } else if (ICOStatus === 1 && refund.refunded) {
      return (
        <div className="flex gap-1 items-center">
          <h3 className="rounded-lg text-red-700 py-3 font-bold text-lg">
            Refunded as Failure
          </h3>
          <Tooltip className="relative z-50" content={`Completed by ${refund.refunder} on ${new Date(refund.timestamp*1000).toLocaleString()}`}>
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
                <Icon icon="icon-park-outline:funds" width={20} height={20}/> FINISH WITH SUCCESS
              </>
          }
        </button>
      )
    } else if (ICOStatus === 2 && distribution.distributed) {
      return (
        <div className="flex gap-1 items-center">
          <h3 className="rounded-lg text-green-500 py-3 font-bold text-lg">
            Distributed After Reaching Softcap
          </h3>
          <Tooltip className="relative z-50" content={`Completed by ${distribution.distributor} on ${new Date(distribution.timestamp*1000).toLocaleString()}`}>
            <Icon icon="ep:info-filled" className="dark:text-[#a48ccf] text-[#5a4483] cursor-pointer hover:opacity-60" />
          </Tooltip>
        </div>
      )
    } else {
      return (
        <div className="flex gap-1 items-center">
          <h3 className="rounded-lg text-green-500 py-3 font-bold text-lg">
            Distributed After Reaching Hardcap
          </h3>
          <Tooltip className="relative z-50" content={`Completed by ${distribution.distributor} on ${new Date(distribution.timestamp*1000).toLocaleString()}`}>
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
          visible={showInvestModal} 
          setVisible={setShowInvestModal}
          token={token}
          price={price}
          contract={contract}
          ethPrice={ethPrice}
          refresh={_getICOInfo}
          myInvestment={myInvestment}
          maxTokens={maxTokens}
        /> 
      }
      { showHistory && 
        <History 
          investments={investments} 
          setVisible={setShowHistory} 
          explorer={CHAIN_DATA[String(chainId)].explorer}
        /> 
      }
      <h1 className="text-[#141416] dark:text-[#FAFCFF] text-lg py-4 px-1">
        All Launchpads
      </h1>
      <div className="dark:bg-[#100E28] bg-white px-3 xs:px-6 py-6 rounded-2xl grid grid-cols-1 gap-12 w1300:gap-8 w1300:grid-cols-[55%_calc(45%-32px)]">
        <section>
          <div className="w-full min-h-[230px] bg-black rounded-2xl flex items-center">
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
          </div>

          <div className="w-full px-1">
            <div className="flex justify-between mt-5 flex-col xs:flex-row items-center gap-2 xs:gap-1">
              <h3 className="dark:text-[#CCCCCC] text-[#101010] text-lg font-bold">
                {project?.title} #001
              </h3>
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
                  <Tooltip className="relative z-50" content={`Totally ${invetors.length} investors with ${investments.length} times`}>
                    <Icon icon="ep:info-filled" width={17} height={17} className="dark:text-[#a48ccf] text-[#5a4483] cursor-pointer hover:opacity-60" />
                  </Tooltip>
              </div>
            </div>
            {_renderCoolDownItem("Charged Tokens", formatUnits(tokensAvailable, Number(token?.decimal)), true)}
            {_renderItem("Token Price", formatEther(price))}
            {_renderCoolDownItem(
              "Start Date",
              new Date(startTime * 1000).toDateString(),
              true
            )}
            {_renderCoolDownItem(
              "Ending Date",
              new Date(endTime * 1000).toDateString(),
              true
            )}
            {_renderCoolDownItem(
              "Time Remaining",
              `${days}d ${hours}h ${minutes}m ${seconds}s`,
              false
            )}
          </div>
          <div className="mt-5 flex flex-col xs:flex-row gap-3 justify-between">
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
        </section>

        <section>
          <h1 className="text-[#23262F] dark:text-[#CCCCCC] text-2xl font-bold">
            Building an open digital economy
          </h1>
          <div className="mt-5 mb-5 aspect-[2/1] flex justify-center items-center">
            {mediaType === "video" ? (
              <video
                className="w-full rounded-xl"
                src={project ? project.logo : "/images/spade.png"}
                controls
              />
            ) : mediaType === "image" ? (
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
              ""
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
                cryptocurrency will change market structures, and maybe even the
                architeecture of the internet itself.
              </div>
            </div>
            <div className="border-l-[3px] pl-3 mt-2 border-[#0CAF60]">
              <h2 className="dark:text-[#CCCCCC] text-[#010914] text-[15px] font-bold">
                Michael Saylor
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
