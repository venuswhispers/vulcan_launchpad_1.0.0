import { atom } from 'jotai';
import { IVulcan } from '@/types';
export const vulcansAtom = atom<IVulcan[]>([]);
export const keywordAtom = atom<string>("");