"use client"
import React from "react";
import Header from '@/components/dashboard/header';
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import Displayer from "@/components/dashboard/create/atoms/quillDisplayer";
import { Contract } from "ethers";
import { formatEther, formatUnits, parseUnits } from  'viem';
import ReactPlayer from 'react-player';
//hooks
import useActiveWeb3 from "@/hooks/useActiveWeb3";
//abis
import ICO from '@/constants/abis/ICO.json';
import axios from 'axios';
import { baseURL } from "@/constants/config";
// types
import { IUser, IProject, IToken } from "@/types";
import { reduceAmount } from "@/utils";

const LaunchPad = ({ params }: { params: { id: string } }) => {

  const { address, chainId, signer } = useActiveWeb3();
  const [contract, setContract] = React.useState<Contract | undefined> (undefined);
  const [token, setToken] = React.useState<IToken|undefined>(undefined);
  const [price, setPrice] = React.useState<bigint>(BigInt("0"));
  const [project, setProject] = React.useState<IProject|undefined>(undefined);
  const [hardcap, setHardcap] = React.useState<bigint>(BigInt("0"));
  const [softcap, setSoftcap] = React.useState<bigint>(BigInt("0"));
  const [fundsRaised, setFundsRaised] = React.useState<bigint>(BigInt("0"));
  const [startTime, setStartTime] = React.useState<number>(0);
  const [endTime, setEndTime] = React.useState<number>(0);
  const [distance, setDistance] = React.useState<number>(0);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const [mediaType, setMediaType] = React.useState<string>("");
  const [creator, setCreator] = React.useState<IUser|undefined>(undefined);
  const [balance, setBalance] = React.useState<string>("0");
  const [tokensFullyCharged, setTokensFullyCharged] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState<number>(0);
  const [owner, setOwner] = React.useState<string>("");


  console.log(Number(hardcap), Number(token?.price), balance, tokensFullyCharged);

  /**
   * get token data
   * @param _contract Contract
   */
    async function _token (_contract: Contract) {
      try {
        const __token = await _contract.tokenInfo ();
        setToken (__token);
        setPrice (__token.price);
        const _decimals = Number(__token.decimal);
        const _balance = await _contract.tokensAvailable ();
        setBalance(formatUnits(_balance, _decimals));
      } catch ( err ) { console.log("failed fetch token data") }
    }
    /**
     * get ICO hardcap
     * @param _contract 
     */
    async function _hardcap (_contract: Contract) {
      try {
        const __hardcap = await _contract.hardcap ();
        setHardcap (__hardcap);
      } catch ( err ) { console.log("failed fetch ICO hardcap") }  
    }
    /**
     * get ICO softcap
     * @param _contract 
     */
    async function _softcap (_contract: Contract) {
      try {
        const __softcap = await _contract.softcap ();
        setSoftcap (__softcap);
      } catch ( err ) { console.log("failed fetch ICO softcap") }
    }
    /**
     * get ICO fundsRaised
     * @param _contract 
     */
    async function _fundsRaised (_contract: Contract) {
      try {
        const __fundsRaised = await _contract.fundsRaised ();
        setFundsRaised (__fundsRaised);
      } catch ( err ) { console.log("failed fetch ICO fundsRaised") }
    }
    /**
     * fetch ICO startTime
     * @param _contract 
     */
    async function _startTime (_contract: Contract) {
      try {
        const __startTime = await _contract.startTime ();
        setStartTime (__startTime);
      } catch ( err ) { console.log("failed fetch ICO startTime") }
    }
    /**
     * fetch ICO endTime
     * @param _contract 
     */
    async function _endTime (_contract: Contract) {
      try {
        const __endTime = await _contract.endTime ();
        setEndTime (__endTime);
      } catch ( err ) { console.log("failed fetch ICO endTime") }
    }
    /**
     * test if ICO is fully charged to reach hardcap and start
     * @param _contract 
     */
    async function _tokensFullyCharged (_contract: Contract) {
      try {
        const __tokensFullyCharged = await _contract.tokensFullyCharged ();
        setTokensFullyCharged (__tokensFullyCharged);
      } catch ( err ) { console.log("failed to test if ICO is fully charged with tokens") }
    }
    /**
     * fetch project data
     * @param _contract 
     */
    async function _project (_contract: Contract) {
      try {
        const _projectURI = await _contract.projectURI ();
        const response = await fetch(_projectURI);
        const __project = await response.json();
        setProject(__project);
    
        fetch(__project.logo)
        .then(response => response.blob())
        .then(blob => {
          const type = blob.type.split('/')[0]; // Get the main type (image, video, etc.)
          setMediaType (type);
        })
        .catch(error => console.error('Error fetching media:', error));
      } catch ( err ) { console.log("failed fetch project data") }
    }
    /**
     * fetch ICO status
     * @param _contract 
     */
    async function _status (_contract: Contract) {
      try {
        const __status = await _contract.getICOState ();
        setStatus (Number(__status));
      } catch (err) { console.log("Failed to fetch current status of ICO") }
    }
    /**
     * fetch IOC creator's information
     * @param _contract 
     */
    async function _user (_contract: Contract) {
      try {
        const _creator = await _contract.creator ();
        setOwner (_creator);
        const { data: user } = await axios.get(`${baseURL}/user/${_creator}`);
        setCreator (user);
      } catch (err) {
        console.log("Failed to fetch ICO creator's information");
      }
    }
  

  const _getICOInfo = async (_contract: Contract) => {
    // token data
    _token (_contract);
    // hardcap
    _hardcap (_contract);
    // softcap
    _softcap (_contract);
    // funds raised
    _fundsRaised (_contract);
    // ico startTime
    _startTime (_contract);
    // ico endtime
    _endTime (_contract);
    // project data
    _project (_contract);
    // test if tokens are fully charged
    _tokensFullyCharged (_contract);
    // ICO status
    _status (_contract);
    // creator data
    _user (_contract);
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
    if (!address || !chainId || !signer || !params.id) {
      return;
    }
    const _contract = new Contract(
      params.id,
      ICO,
      signer
    );
    setContract(_contract);
    _getICOInfo (_contract);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, chainId, signer, params.id]);
  
  const _renderItem = (title: string, value: string) => (
    <div className="flex h-12 gap-4 justify-between text-sm items-center border-b border-[#E6E8EC] dark:border-[#ededee1a]">
      <h2 className="text-[15px] font-bold text-[#6F6F6F] dark:text-[#CCCCCC]">{title}</h2>
      <div className="flex gap-1 items-center">
        <Image
          src={'/images/eth.svg'}
          width={20}
          alt=''
          height={20}
        />
        <div className="text-[15px] flex gap-1 font-bold dark:text-[#B4B4B7] text-[#101010]">
          <h2 className="max-w-[100px] truncate">
            { value }
          </h2>
          ETH
        </div>
      </div>
    </div>
  )
  const _renderCoolDownItem = (title: string, value: string, underline: boolean) => (
    <div className={`flex h-12 gap-4 justify-between text-sm items-center ${ underline && 'border-b' } border-[#E6E8EC] dark:border-[#ededee1a]`}>
      <h2 className="text-[15px] font-bold text-[#6F6F6F] dark:text-[#CCCCCC]">{title}</h2>
      <div className="items-center text-[15px] font-bold dark:text-[#B4B4B7] text-[#101010]">
        { value }
      </div>
    </div>
  )

  return (
    <div className="flex w-full flex-col gap-4">
      <Header/>
      
      <h1 className="text-[#141416] dark:text-[#FAFCFF] text-lg py-4 px-1">All Launchpads</h1>
      <div className="dark:bg-[#100E28] bg-white px-3 xs:px-6 py-6 rounded-2xl grid grid-cols-1 gap-12 w1300:gap-8 w1300:grid-cols-[55%_calc(45%-32px)]" >
        <section>
          <div className="w-full min-h-[230px] bg-black rounded-2xl flex items-center">
            <ReactPlayer
              controls
              className='react-player rounded-[19px]'
              url={project?.youtubeLink ? project.youtubeLink : "/introduction.mp4"}
              width='100%'
              height='100%'
              style={{
                borderRadius: 17,
              }}
            />
          </div>

          <div className="w-full px-1">
            <div className="flex justify-between mt-5 flex-col xs:flex-row items-center gap-2 xs:gap-1">
              <h3 className="dark:text-[#CCCCCC] text-[#101010] text-lg font-bold">{project?.title} #001</h3>
              <div className="flex gap-1 items-center">
                { project?.facebook && <a href={project.facebook} target="_blank" className="p-2 cursor-pointer hover:opacity-60 rounded-full bg-[#EFEFEF]"><Icon icon="iconoir:facebook" width={15} height={15}/></a> }
                { project?.linkedin && <a href={project.linkedin} target="_blank" className="p-2 cursor-pointer hover:opacity-60 rounded-full bg-[#EFEFEF]"><Icon icon="streamline:linkedin" width={15} height={15}/></a> }
                { project?.instagram && <a href={project.instagram} target="_blank" className="p-2 cursor-pointer hover:opacity-60 rounded-full bg-[#EFEFEF]"><Icon icon="fa6-brands:instagram" width={15} height={15}/></a> }
                { project?.twitter && <a href={project.twitter} target="_blank" className="p-2 cursor-pointer hover:opacity-60 rounded-full bg-[#EFEFEF]"><Icon icon="iconoir:twitter" width={15} height={15}/></a> }
              </div>
            </div>
            { _renderItem ("HardCap", formatEther(hardcap)) }
            { _renderItem ("SoftCap", formatEther(softcap)) }
            <div className="flex h-12 gap-4 justify-between text-sm items-center border-b border-[#E6E8EC] dark:border-[#ededee1a]">
              <h2 className="text-[15px] font-bold text-[#6F6F6F] dark:text-[#CCCCCC]">Current Amount raised</h2>
              <div className="flex gap-1 items-center">
                <Image
                  src={'/images/eth.svg'}
                  width={20}
                  alt=''
                  height={20}
                />
                <div className="text-[15px] flex gap-2 font-bold text-[#0CAF60] items-center">
                  <h2 className="max-w-[100px] truncate">
                    {formatEther(fundsRaised) }
                  </h2>
                  ETH
                  <Icon icon="bxs:up-arrow" />
                </div>
              </div>
            </div>
            { _renderCoolDownItem ("Charged Tokens", balance, true) }
            { _renderItem ("Token Price", formatEther(price)) }
            { _renderCoolDownItem ("Start Date", new Date(startTime*1000).toDateString(), true) }
            { _renderCoolDownItem ("Ending Date", new Date(endTime*1000).toDateString(), true) }
            { _renderCoolDownItem ("Time Remaining", `${days}d ${hours}h ${minutes}m ${seconds}s`, false) }
            
          </div>
          <div className="mt-5 flex flex-col xs:flex-row gap-3 justify-between">
            {
              creator &&
              <div className="flex items-center gap-2">
                <Image
                  src={creator.avatar ? creator.avatar : '/images/default.jpg'}
                  width={45}
                  alt=''
                  height={45}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-[#6F6F6F] dark:text-[#CCCCCC]">Owner</span>
                  <span className="dark:text-[#6F6F6F] text-black">@{creator.fullName}</span>
                </div>
              </div>
            }
            <button className="bg-[#2B6EC8] rounded-lg py-3 px-4 text-white font-bold hover:bg-[#2b35c8]">Back this project</button>
          </div>
        </section> 

        <section>
          <h1 className="text-[#23262F] dark:text-[#CCCCCC] text-2xl font-bold">Building an open digital economy</h1>
          <div className="mt-5 mb-5 aspect-[2/1] flex justify-center items-center">
            {
              mediaType === "video" ?
              <video 
                className='w-full rounded-xl'
                src={project ? project.logo : '/images/spade.png'}
                controls
              /> : mediaType === "image" ?
              <Image
                src={project ? project.logo : '/images/spade.png'}
                // className={`${className} ${isImageLoading ? 'hidden' : 'block'}`}
                width={0}
                alt=''
                height={0}
                sizes="100vw"
                className='w-full rounded-xl'
              /> : ""
            }
          </div>
          <div className="mt-5 text-sm text-[#777E90]">
            <Displayer value={project ? project.description : ""}/>
          </div>
          <div className="border border-dashed border-[#ADADAD] rounded-lg p-4 mt-5">
            <div className="flex gap-4">
              <Image
                src={'/images/quote.svg'}
                width={40}
                alt='quote'
                height={40}
              />
              <div className="text-[#010914] dark:text-[#CCCCCC] text-sm">cryptocurrency will change market structures, and maybe even the architeecture of the internet itself.</div> 
            </div>
            <div className="border-l-[3px] pl-3 mt-2 border-[#0CAF60]">
              <h2 className="dark:text-[#CCCCCC] text-[#010914] text-[15px] font-bold">Michael Saylor</h2>
              <h2 className="text-[#A4A8AB] text-[12px]">Business owner</h2>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
};

export default LaunchPad;
