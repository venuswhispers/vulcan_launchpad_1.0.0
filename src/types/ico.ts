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
    amount: number,
    timestamp: number
}