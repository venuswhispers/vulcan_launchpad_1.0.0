import { CHAIN } from "@/types";

export const CHAIN_IDS = {
  // POLYGON: 137,
  // RINKEBY: 4,
  // ETHEREUM: 1,
  // ETHERGEM: 1987,
  // GNOSIS: 100,
  // ETC: 61,
  // KLAYTN: 8217,
  // EVMOS: 9001,
  // MOONRIVER: 1285,
  // OPTIMISM: 10,
  // zkSyncTestnet: 280,
  // ARBITRUM: 42161,
  // zkSyncMainnet: 324,
  // GOERLI: 5,
  BASE: 8453,
  BSC: 56,
  ARBITRUM: 42161,
  SEPOLIA: 11155111
};

export const DATES = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

export const FACTORY_ADDRESSES: Record<string, string> = {
  [CHAIN_IDS.ARBITRUM]: "0x08bD5c00a48b7152D3A41AfaB5884f033e7ac3Ea", //verified
  [CHAIN_IDS.BASE]: "0x18e104Bfb108c65CCCDaf752825C90A05Cb1eD7e", //verified
  [CHAIN_IDS.BSC]: "0x18e104Bfb108c65CCCDaf752825C90A05Cb1eD7e", //verified
  [CHAIN_IDS.SEPOLIA]: "0x709Fc0DB7De3c354f7B165d9E8F5AAaB6Ffc1675", //verified
};
export const DAI_ADDRESSES: Record<string, string> = {
  [CHAIN_IDS.ARBITRUM]: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1", //verified
  [CHAIN_IDS.BASE]: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb", //verified
  [CHAIN_IDS.BSC]: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3", //verified
  [CHAIN_IDS.SEPOLIA]: "dc1a36bc15d5255Bb7061ec78e735e5C4dA4Ce5e", //verified
};

export const cyptoSIDAO: Record<number, string> = {
  [CHAIN_IDS.ARBITRUM]: "0xa736319152057f9c3beb556eee76ea56598ffa13", //verified
  [CHAIN_IDS.BASE]: "0x279d1ECe1eFD6b6a7701F91e446C195dd4BA7ecA", //verified
  [CHAIN_IDS.BSC]: "0x210245828Ea654b8237E6990445D84F0de9Ca77F", //verified
  [CHAIN_IDS.SEPOLIA]: "0x5B98a0c38d3684644A9Ada0baaeAae452aE3267B", //verified
}

export const CHAIN_DATA: Record<string, CHAIN> = {
  [CHAIN_IDS.ARBITRUM]: {
    name: "Arbitrum",
    symbol: "ETH",
    ticker: "ETH",
    rpc: process.env.NEXT_PUBLIC_PRC_ARBITRUM!,
    chainId: 42161,
    explorer: 'https://arbiscan.io/',
    logo: "/images/chains/arb.svg"
  },
  [CHAIN_IDS.SEPOLIA]: {
    name: "Sepolia Eth",
    symbol: "ETH",
    ticker: "ETH",
    rpc: process.env.NEXT_PUBLIC_RPC_SEPOLIA!,
    chainId: 11155111,
    explorer: 'https://sepolia.etherscan.io/',
    logo: "/images/chains/sepolia.svg"
  },
  [CHAIN_IDS.BSC]: {
    name: "BSC Chain",
    symbol: "BNB",
    ticker: "BNB",
    rpc: process.env.NEXT_PUBLIC_PRC_BSC!,
    chainId: 56,
    explorer: 'https://bscscan.com/',
    logo: "/images/chains/bsc.svg"
  },
  [CHAIN_IDS.BASE]: {
    name: "Base Chain",
    symbol: "ETH",
    ticker: "ETH",
    rpc: process.env.NEXT_PUBLIC_PRC_BASE!,
    chainId: 8453,
    explorer: 'https://snowtrace.io',
    logo: "/images/chains/base.svg"
  }
}

