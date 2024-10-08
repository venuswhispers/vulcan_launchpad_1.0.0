export type ACCOUNT = {
    address: string;
    balanceDecimals?: number;
    balanceFormatted?: string;
    balanceSymbol?: string;
    displayBalance?: string;
    displayName: string;
    ensAvatar?: string;
    ensName?: string;
    hasPendingTransactions: boolean;
};
export type RAINBOW_CHAIN = {
    hasIcon: boolean;
    iconUrl?: string;
    iconBackground?: string;
    id: number;
    name?: string;
    unsupported?: boolean;
};

export type CHAIN = {
    name: string,
    symbol: string,
    ticker: string,
    rpc: string,
    chainId: number,
    explorer: string,
    logo: string,
    istestnet?: boolean
}