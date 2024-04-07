import { atom } from 'jotai';

import { IUSER } from '@/types/user';

export const userAtom = atom<IUSER|undefined>(undefined);
export const isAuthenticatedAtom = atom<boolean>(false);