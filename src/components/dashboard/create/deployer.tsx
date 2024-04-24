"use client";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import InputInfo from "@/components/dashboard/create/atoms/infoInput";
import InputToken from "@/components/dashboard/create/atoms/tokenAddressInput";
import InfoShower from "@/components/dashboard/create/atoms/infoShower";
import { reduceAmount, parseNumber } from "@/utils";
import { Dropdown } from "flowbite-react";
import { useAtom } from "jotai";
import { useReadContracts, useReadContract } from "wagmi";
import { Contract, ethers } from "ethers";
//hooks
import useToastr from "@/hooks/useToastr";
import useAuth from "@/hooks/useAuth";
//abis
import ERC20 from "@/constants/abis/erc20.json";
import FACTORY from "@/constants/abis/factory.json";
import DAI from "@/constants/abis/dai.json";
//addresses
import { FACTORY_ADDRESSES, DAI_ADDRESSES } from "@/constants/constants";
//progress Modal
import Progress from "@/components/dashboard/create/progress";
//methods
import { uploadToPinata, uploadToIPFS } from "@/utils";
//constants
import { cyptoSIDAO } from '@/constants/config';
 
import {
  walletAtom,
  previewAtom,
  tokenAddressAtom,
  titleAtom,
  descriptionAtom,
  hardCapAtom,
  softCapAtom,
  youtubeLinkAtom, 
  endTimeAtom, 
  twitterAtom, 
  facebookAtom,
  instagramAtom,
  linkedinAtom,
  farcasterAtom,
  lensAtom,
  tokenPriceAtom,
  icoAtom,
  amountAtom,
  nameAtom
} from "@/store";
import { formatEther, formatUnits, parseEther, parseUnits, toEventHash } from "viem";
import useActiveWeb3 from "@/hooks/useActiveWeb3";

interface IProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const Create = ({ step, setStep }: IProps) => {
  //atoms
  const [preview] = useAtom(previewAtom);
  const [price, setPrice] = useAtom(tokenPriceAtom);

  const [tokenAddress, setTokenAddress] = useAtom(tokenAddressAtom);
  const [wallet, setWallet] = useAtom(walletAtom);
  const [title,] = useAtom(titleAtom);
  const [hardCap,] = useAtom(hardCapAtom);
  const [softCap,] = useAtom(softCapAtom);
  const [youtubeLink,] = useAtom(youtubeLinkAtom);
  const [endTime,] = useAtom(endTimeAtom);
  const [description,] = useAtom(descriptionAtom);
  const [twitter,] = useAtom<string>(twitterAtom);
  const [linkedin,] = useAtom<string>(linkedinAtom);
  const [facebook,] = useAtom<string>(facebookAtom);
  const [instagram,] = useAtom<string>(instagramAtom);
  const [farcaster,] = useAtom<string>(farcasterAtom);
  const [lens,] = useAtom<string>(lensAtom);
  const [ico, setIco] = useAtom<string>(icoAtom);
  const [, setAmount] = useAtom<string>(amountAtom);
  const [, setTokenName] = useAtom<string>(nameAtom); 
  //states
  const [isInvalid, setIsInvalid] = React.useState<boolean>(false);
  const [isInvalidTokenAddress, setIsInvalidTokenAddress] = React.useState<boolean>(false);
  const [changedTokenAddress, setChangedTokenAddress] = React.useState<boolean>(false);
  const [isPayingSpamFilterFee, setIsPayingSpamFilterFee] = React.useState<boolean>(false);
  const [showProgressModal, setShowProgressModal] = React.useState<boolean>(false);
  const [percent, setPercent] = React.useState<number>(0);
  const [currency, setCurrency] = React.useState<string>("ETH");
  const [stepper, setStepper] = React.useState<number>(0);
  const [paid, setPaid] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  //hooks
  const { showToast } = useToastr();
  const { user, isAuthenticated } = useAuth();
  //web3
  const { address, chainId, signer } = useActiveWeb3();
  //eth price
  const [ethPrice, setEthPrice] = React.useState<number | undefined>(undefined);
  //useContracts
  const { data: token, isPending: tokenPending } = useReadContracts({
    contracts: [
      {
        address: `0x${tokenAddress.substring(2, tokenAddress.length)}`,
        abi: ERC20,
        functionName: "name",
      },
      {
        address: `0x${tokenAddress.substring(2, tokenAddress.length)}`,
        abi: ERC20,
        functionName: "symbol",
      },
      {
        address: `0x${tokenAddress.substring(2, tokenAddress.length)}`,
        abi: ERC20,
        functionName: "decimals",
      },
      {
        address: `0x${tokenAddress.substring(2, tokenAddress.length)}`,
        abi: ERC20,
        functionName: "totalSupply",
      },
    ],
  });
  // @dev current DAI balance
  const _daiBalance = useReadContract({
    address: chainId ? `0x${DAI_ADDRESSES[chainId]}` : undefined,
    abi: DAI,
    functionName: "balanceOf",
    args: [address],
  });
  const daiBalance = React.useMemo(() => {
    if (!_daiBalance.isPending && _daiBalance.isSuccess) {
      return formatEther(BigInt(String(_daiBalance.data)));
    } else {
      return 0;
    }
  }, [_daiBalance]);
  // @token infos
  const [name, symbol, decimals, totalSupply] = token || [];
  // @contracts
  const [contractDAI, setContractDAI] = React.useState< Contract | undefined > ( undefined );
  const [contractFactory, setContractFactory] = React.useState< Contract | undefined > (undefined);
  // @validate valid token address
  React.useEffect(() => {
    if (
      name &&
      symbol &&
      decimals &&
      totalSupply &&
      name.status === "success" &&
      symbol.status === "success" &&
      decimals.status === "success" &&
      totalSupply.status === "success"
    ) {
      setIsInvalidTokenAddress(false);
    } else {
      setIsInvalidTokenAddress(true);
    }
  }, [name, symbol, decimals, totalSupply]);

  React.useEffect(() => {
    if (symbol && symbol?.status === "success") {
      setTokenName (String(symbol.result));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol])

  // @get ETH price from chainbase
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
  }, []);

  // @dev load contract from start
  React.useEffect(() => {
    if (!address || !chainId || !signer) {
      return;
    }
    const _contractDAI = new Contract(DAI_ADDRESSES[chainId], DAI, signer);
    setContractDAI(_contractDAI);
    const _contractFactory = new Contract(
      FACTORY_ADDRESSES[chainId],
      FACTORY,
      signer
    );
    setContractFactory(_contractFactory);
  }, [address, chainId, signer]);

  // @dev pay 100DAI of spam filter fee
  const handlePaySpamFilterFee = async () => {

    const _isPaid = await contractFactory?.paidSpamFilterFee(address);
    setPaid (_isPaid);

    if (_isPaid) {
      showToast ("You have already paid spam filter fee.", "success");
      return;
    }

    try {
      setIsPayingSpamFilterFee(true);
      if (!contractDAI || !contractFactory) throw "";

      const _approveTx = await contractDAI.approve(
        FACTORY_ADDRESSES[Number(chainId)],
        parseEther("100")
      );
      await _approveTx.wait();
      const _spamFilterFeeTx = await contractFactory.paySpamFilterFee();
      await _spamFilterFeeTx.wait();
      setPaid (true);
      showToast(
        "You have successfully paid for your spam filter fee with 100 DAI.",
        "warning"
      );
    } catch (err) {
      if (String(err).includes("user rejected transaction")) {
        showToast("User rejected transaction.", "warning");
      } else {
        showToast("Failed Transaction", "error");
      }
      console.log(err);
    } finally {
      setIsPayingSpamFilterFee(false);
    }
  };

  // @user click progress modal's close button
  const handleConfirm = () => {
    if (stepper < 4 && !isLoading) {
      setShowProgressModal (false);
    } else if (stepper === 4 && !isLoading) {
      setShowProgressModal (false);
      setStep (2);
    }
  }

  // @when user click next button
  const handleSave = () => {
    try {
      if (!isAuthenticated) throw "Connect your wallet first.";
      if (!paid) throw "You must pay 100 DAI of spam filter fee.";

      setIsInvalid(true);
      let valid: boolean = true;

      if (isInvalidTokenAddress) {
        showToast("Invalid token address.", "warning");
        valid = false;
      }
      if (!wallet) {
        showToast("Wallet address is required.", "warning");
        valid = false;
      }
      if (!price) {
        showToast("Token Price is required.", "warning");
        valid = false;
      }
      if (valid && preview) {
        handleSubmit();
      }
    } catch (err) {
      showToast(String(err), "warning");
      console.log(err);
    }
  };
  //@dev deposit token amount to reach softcap
  const _depositAmountToSoftcap = React.useMemo(() => {
    const _priceRaw: number = currency === "ETH" ? Number(price) : Number(price) / Number(ethPrice);
    if(isNaN(_priceRaw)) return BigInt("0");
    const _price =  parseEther(_priceRaw.toFixed(20));
    
    if (String(_price) === "0") return BigInt("0");
    
    const _softcap = parseEther(softCap);
    const _amount = _softcap / _price;

    return _amount + BigInt("1");
  }, [currency, price, ethPrice, softCap]);
  //@dev deposit token amount to reach hardcap
  const _depositAmountToHardcap = React.useMemo(() => {
    const _priceRaw: number = currency === "ETH" ? Number(price) : Number(price) / Number(ethPrice);
    if(isNaN(_priceRaw)) return BigInt("0");
    const _price =  parseEther(_priceRaw.toFixed(20));
    
    if (String(_price) === "0") return BigInt("0");
    
    const _hardcap = parseEther(hardCap);
    const _amount = _hardcap / _price;

    return _amount + BigInt("1");
  }, [currency, price, ethPrice, hardCap]);
  // @dev totalSupply
  const _totalSupply = React.useMemo(() => {
    if (totalSupply?.status !== 'success' || totalSupply === undefined || decimals?.status !== 'success' || decimals === undefined) {
      return BigInt("0");
    } else {
      return BigInt(formatUnits(
        BigInt(String(totalSupply.result)),
        Number(decimals?.result)
      ));
    }
  }, [totalSupply, decimals])

  // @deploy smart contract with informations
  const handleSubmit = async () => {

    if (!decimals || !totalSupply || !name || !symbol) return;

    const _priceRaw: number = currency === "ETH" ? Number(price) : Number(price) / Number(ethPrice);
    const _price =  parseEther(_priceRaw.toFixed(20));
    const _totalSupply = BigInt(String(totalSupply.result));
    const _hardcap = parseEther(hardCap);
    const _decimals = BigInt(String(decimals.result));
    const _softcap = parseEther(softCap);

    console.log(_price * _totalSupply / parseUnits ("1", Number(_decimals)), _hardcap);
    // test if totalSupply and tokenPrice is valid
    if (_price * _totalSupply / parseUnits ("1", Number(_decimals)) < _hardcap ) {
      showToast ("Can't reach hardcap with this price and totalSupply", "warning");
      return;
    }

    // set amount
    const _amount = _hardcap / _price ;
    setAmount (String(_amount));

    // progress Modal show
    setShowProgressModal(true);
    setIsLoading(true);
    try {
      // @step1 upload logo to PINATA
      setStepper (1);
      setPercent (0);
      const _logoURI = await uploadToPinata(
        preview?.data as string,
        ({ loaded, total }: { loaded: number; total: number }) => {
          console.log(Math.floor((loaded * 100) / total));
          setPercent(Math.floor((loaded * 100) / total));
        }
      ).catch((err) => {
        console.log(err);
        throw "File upload failed to IPFS. Please retry.";
      });
      console.log("@logoURI: ", _logoURI);
      setStepper(2);
      setPercent(0);

      // @step2 upload project info to PINATA
      const _projectInfo = JSON.stringify({
        title,
        description: description,
        logo: _logoURI,
        youtubeLink,
        twitter,
        instagram,
        linkedin,
        facebook,
        farcaster,
        lens
      });
      const _projectURI = await uploadToIPFS(
        //@ts-ignore
        new File(
          [
            _projectInfo
          ], "metadata.json"
        ),
        ({ loaded, total }: { loaded: number; total: number }) => {
          setPercent(Math.floor((loaded * 100) / total));
        }
      ).catch(err => {
        console.log(err);
        throw "Project Data upload failed to IPFS. Please retry.";
      });
      console.log("@projectURI: ", _projectURI);
      setStepper (3);
      setPercent (0);

      ///@step3 deploy smart contract to chain
      console.log({
        _projectURI,
        _softcap,
        _hardcap,
        time: BigInt(Math.floor(Number(endTime)/1000)),
        name: name.result,
        symbol: symbol.result,
        _price,
        _decimals,
        _totalSupply,
        tokenAddress,
        cyptoSIDAO
      })
      const _tx = await contractFactory?.launchNewICO (
        _projectURI,
        _softcap,
        _hardcap,
        BigInt(Math.floor(Number(endTime)/1000)),
        name.result,
        symbol.result,
        _price,
        _decimals,
        _totalSupply,
        tokenAddress,
        cyptoSIDAO
      );
      await _tx.wait();
      setPaid (false);
      showToast ("ICO ready to launch, please now deposit tokens to be distributed.", "success");

      const _vulcans = await contractFactory?.getVulcans ();
      setIco (_vulcans[_vulcans.length - 1]);
      
      setStepper(4);
      setPercent(0);
    } catch (err) {
      if (String(err).includes("user rejected transaction")) {
        showToast("Reject transation", "warning");
      } else {
        showToast (String(err), "warning");
        // console.log(err);
      }
      setShowProgressModal (false);
    } finally {
      setIsLoading (false);
    }
  };

  return (
    <div className="w-full">
      {showProgressModal && (
        <Progress
          stepper={stepper}
          percent={percent}
          confirm={handleConfirm}
          hash={ico}
        />
      )}
      
      <InputToken
        title="Token Address"
        className="mt-10"
        placeholder="*token address"
        info="*What' the address of your token for ICO?"
        value={tokenAddress}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTokenAddress(e.target.value);
          setChangedTokenAddress(true);
        }}
        isInvalid={isInvalidTokenAddress && (changedTokenAddress || isInvalid)}
        message="Invalid ERC20 token address"
      />
      <InputInfo
        title="Wallet Address"
        className="mt-2"
        placeholder="*wallet address"
        info="*What' wallet address that sale proceeds will go to?"
        value={wallet}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setWallet(e.target.value)
        }
        isInvalid={isInvalid}
        message="input wallet address"
      />
      <div className="flex gap-1 w-full items-center mt-2">
        <InputInfo
          title="Token Price"
          className="w-full"
          placeholder="*token price"
          info="What' token price for ICO?"
          value={price}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPrice(e.target.value)
          }
          isInvalid={isInvalid}
          message="input token price"
        />
        <Dropdown
          label="Dropdown button"
          renderTrigger={() => (
            <div className="w-[100px] mt-[18px]">
              <div className="bg-[#F0F8FF] flex justify-between items-center cursor-pointer transition-all text-[12px] p-3 dark:bg-[#020111] w-full rounded-lg text-blue-gray-700 font-sans font-normal border-[#98bdea1f] outline-none focus:ring-1 focus:ring-[#8ca8cba2] focus:border-[#8ca8cba2] border">
                <span>{currency}</span> <Icon icon="iwwa:arrow-down" />
              </div>
            </div>
          )}
        >
          <Dropdown.Item onClick={() => setCurrency("ETH")}>ETH</Dropdown.Item>
          <Dropdown.Item onClick={() => setCurrency("USD")}>USD</Dropdown.Item>
        </Dropdown>
      </div>
      <div className="flex flex-row-reverse justify-between">
        <h3 className="px-1 text-sm">( 1 ETH = {ethPrice} USD )</h3>
        {ethPrice && (
          <h3 className="px-1 text-sm">
            ( ={" "}
            {currency === "ETH"
              ? reduceAmount(Number(price) * ethPrice)
              : reduceAmount(Number(price) / ethPrice)}{" "}
            {currency === "ETH" ? "USD" : "ETH"} )
          </h3>
        )}
      </div>

      <div className="px-2 pt-2 text-sm">
        <h3 className="flex gap-2">
          <span>* You need to deposit <span className="text-[15px] text-green-600 font-bold">{ String(_depositAmountToHardcap) } tokens</span> to reach your hard cap and start this ICO.</span>
        </h3>
        <h3 className="flex gap-2">
          <span>* If you reach your soft cap, you will distribute <span className="text-[15px] text-green-600 font-bold">{ String(_depositAmountToSoftcap) } tokens</span> and <span className="text-[15px] text-red-600 font-bold">{String(_depositAmountToHardcap - _depositAmountToSoftcap)} tokens</span> will be returned.</span>
        </h3>
      </div>
      { _depositAmountToHardcap > _totalSupply && <span className="text-red-600 text-sm mt-10 px-3">You can&apos;t reach hard cap with this token price and totalSupply.</span> }

      <h2 className="text-lg font-bold mt-12 mb-2">*Token Information</h2>
      <div
        id="information"
        className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2"
      >
        <InfoShower
          title="Token Name"
          info="*what' your token's name?"
          value={
            name?.status === "success" ? String(name.result) : "*token name"
          }
        />
        <InfoShower
          title="Token Symbol"
          info="*what' your token's symbol?"
          value={
            symbol?.status === "success"
              ? String(symbol.result)
              : "*token symbol"
          }
        />
        <InfoShower
          title="Token Decimal"
          info="*what' your token's decimal?"
          value={
            decimals?.status === "success"
              ? String(decimals.result)
              : "*token decimal"
          }
        />
        <InfoShower
          title="Total Supply"
          info="*what' your token's totalSupply?"
          value={String(_totalSupply)}
        />
      </div>

      <h2 className="mt-10 font-bold">
        * Pays non-refundable Spam filter fee - $100 DAI to launch ICO, and
        Depoly contract
      </h2>
      <div className="flex gap-2 items-end">
        <button
          onClick={handlePaySpamFilterFee}
          className="py-2 text-white flex items-center gap-1 mt-3 rounded-lg hover:bg-blue-700 transition-all hover:ring-1 hover:ring-white hover bg-blue-500 text-sm font-bold px-4"
        >
          {isPayingSpamFilterFee ? (
            <>
              <Icon icon="mingcute:loading-fill" className="spin" /> Processing
            </>
          ) : (
            <>
              <Icon icon="ph:currency-eth-duotone" /> Pay Spam Filter Fee
            </>
          )}
        </button>
        {paid && <Icon icon="pajamas:check" width={30} />}
      </div>
      <h3 className="mt-1 px-1 text-xs">*Your DAI balance: {daiBalance}</h3>

      <div className="flex gap-2 justify-between items-center pr-3 mt-10">
        <button
          onClick={handleSave}
          className="py-2 text-white rounded-lg hover:bg-blue-700 transition-all hover:ring-1 hover:ring-white hover bg-blue-500 text-sm font-bold px-4"
        >
          Deploy
        </button>
        <div
          onClick={() => setStep(0)}
          className="flex cursor-pointer hover:opacity-60 gap-2 items-center hover:underline"
        >
          <Icon icon="ion:arrow-undo-sharp" /> Previous
        </div>
      </div>
    </div>
  );
};

export default Create;
