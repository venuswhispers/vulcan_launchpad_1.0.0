import { atom } from 'jotai';

export const hashAtom = atom<string>("");
export const fromAmountAtom = atom<string>("0");
export const toAmountAtom = atom<bigint>(BigInt("0"));
export const ethAmountAtom = atom<bigint>(BigInt("0"));
