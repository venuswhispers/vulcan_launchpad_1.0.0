import { atom } from 'jotai';
import { IVulcan } from '@/types';
export const vulcansAtom = atom<IVulcan[]>([]);
export const keywordAtom = atom<string>("");
export const ethPriceAtom = atom<number>(3600);