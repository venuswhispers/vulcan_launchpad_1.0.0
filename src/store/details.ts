import { atom } from 'jotai';

//current modal setting

export const titleAtom = atom<string>("");
export const hardCapAtom = atom<string>("");
export const softCapAtom = atom<string>("");
export const youtubeLinkAtom = atom<string>("");
export const tokenPriceAtom = atom<string>("");
export const endTimeAtom = atom<string>("");
export const descriptionAtom = atom<string>("");
export const walletAtom = atom<string>("");
export const checkedAtom = atom<boolean>(false);