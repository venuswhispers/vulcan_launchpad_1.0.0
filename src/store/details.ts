import { atom } from 'jotai';

import { Preview } from '@/types';

//current modal setting

export const titleAtom = atom<string>("");
export const hardCapAtom = atom<string>("");
export const softCapAtom = atom<string>("");
export const youtubeLinkAtom = atom<string>("");
export const tokenPriceAtom = atom<string>("");
export const endTimeAtom = atom<string>("");
export const descriptionAtom = atom<string>("");
export const checkedAtom = atom<boolean>(false);
export const previewAtom = atom<Preview|undefined>(undefined);


export const nameAtom = atom<string>("");
export const symbolAtom = atom<string>("");
export const decimalAtom = atom<string>("");
export const amountAtom = atom<string>("");
export const addressAtom = atom<string>("");
export const walletAtom = atom<string>("");