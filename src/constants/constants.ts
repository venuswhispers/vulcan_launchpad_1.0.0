import { CHAIN } from "@/types";

export const CHAIN_IDS = {
  // POLYGON: 137,
  // RINKEBY: 4,
  // ETHEREUM: 1,
  // ETHERGEM: 1987,
  // BSC: 56,
  // GNOSIS: 100,
  // ETC: 61,
  // KLAYTN: 8217,
  // EVMOS: 9001,
  // MOONRIVER: 1285,
  // ARBITRUM: 42161,
  // OPTIMISM: 10,
  // zkSyncTestnet: 280,
  // zkSyncMainnet: 324,
  // GOERLI: 5,
  ARBITRUM: 43114,
  SEPOLIA: 11155111
};

export const DATES = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

export const FACTORY_ADDRESSES: Record<string, string> = {
  [CHAIN_IDS.ARBITRUM]: "", //verified
  // [CHAIN_IDS.SEPOLIA]: "0xF6D158B30F7c9F441c9D665B4DFcBBa3E1082B68", //verified
  [CHAIN_IDS.SEPOLIA]: "0x12C2b34c7D028AdfA8A077d547C6D2FDdEdFFF1B", //verified
};
// export const FACTORY_ADDRESSES: Record<string, string> = {
//   [CHAIN_IDS.ARBITRUM]: "", //verified
//   [CHAIN_IDS.SEPOLIA]: "0x84899F7A39737E835cB581D043B04852cCd255b0", //verified
// };

export const DAI_ADDRESSES: Record<string, string> = {
  [CHAIN_IDS.ARBITRUM]: "", //verified
  [CHAIN_IDS.SEPOLIA]: "dc1a36bc15d5255Bb7061ec78e735e5C4dA4Ce5e", //verified
};

export const CHAIN_DATA: Record<string, CHAIN> = {
  [CHAIN_IDS.ARBITRUM]: {
    chainId: 43114,
    explorer: 'https://arbiscan.io'
  },
  [CHAIN_IDS.SEPOLIA]: {
    chainId: 1115511,
    explorer: 'https://sepolia.etherscan.io'
  }
}

