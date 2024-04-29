export interface IVulcan {
    status: number,
    softcap: number,
    fundsRaised: number,
    startTime: number,
    endTime: number,
    hardcap: number,
    title: string,
    tokensFullyCharged: boolean,
    address: string
}

export type INVEST = {
    investor: string,
    contributor: string,
    amount: bigint,
    timestamp: number
}

export type REFUND = {
    refunded: boolean;
    refunder: string;
    timestamp: number;
    hash: string;
}

export type DISTRIBUTION = {
    distributed: boolean;
    distributor: string;
    timestamp: number;
    hash: string;
}