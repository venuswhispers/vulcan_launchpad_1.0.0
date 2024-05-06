"use client";
import React from "react";
import { type Chain, type Address, type Client } from "viem";
import { useSignMessage } from "wagmi";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import axios from 'axios';
import { useAtom } from "jotai";
import { isAuthenticatedAtom, userAtom } from "@/store/user";
import { IUSER, TRegister } from '@/types';
import { TMsg } from "@/types/user";
import jwt from 'jsonwebtoken';
import useToastr from "@/hooks/useToastr";
import { useRouter } from "next/navigation";
import useAPI from "@/hooks/useAPI";


interface IContext {
  signIn: () => Promise<void>,
  signUp: (data: TRegister) => Promise<void>
  isAuthenticated: boolean,
  user: IUSER | undefined
}

export const AuthContext = React.createContext<IContext | undefined>(undefined);

const AuthProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  //hooks
  const { address, chain, signer, isConnected, isConnecting, isReconnecting, connector, isDisconnected, chainId } = useActiveWeb3();
  const { signMessageAsync } = useSignMessage();
  const { showToast } = useToastr ();
  const api = useAPI ();
  const router = useRouter ();
  //atoms
  const [isAuthenticated, setIsAuthenticated] = useAtom (isAuthenticatedAtom);
  const [user, setUser] = useAtom (userAtom);

  const _setAuth = (user: IUSER|undefined, token: string|undefined) => {
    axios.defaults.headers.common['x-auth-token'] = token;
    setIsAuthenticated (true);
    setUser (user);
  }
  //disconnect
  React.useEffect(() => {
    if (isDisconnected) {
      setUser (undefined);
      setIsAuthenticated (false);
      router.push("/");
    }  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisconnected]);

  const signIn = async () => {
    try {
      if (!chain) throw "chain is not defined...";
      if (!address) throw "address is not defined..."

      const { data : msgData } = await api.post(`/user/request-message`, { chain: 1, address });
      const { id, message, profileId }: TMsg = msgData;

      if (!id || !message || !profileId) { 
        showToast("Undefined Message.", 'warning');
        return;
      }

      const signature = await signMessageAsync({ message });
      
      const { data : signData } = await api.post(`/user/signin`, { message, signature });
      console.log(signData);

      if (signData === "none") {
        _setAuth (undefined, undefined);
        router.push("/profile/create");
        showToast("Please create your profile.", 'warning');
      } else {
        const { data: _user }: any = jwt.decode(signData);
        _setAuth (_user, signData);
        showToast ("Signin Success", "success");
      }
    } catch (err: any) {
      if (err.code === 4001) {
        showToast("User rejected the request.", 'warning');
      } else if (err.code === 'ERR_BAD_RESPONSE') {
        showToast("Signin failed. Please try again.", 'warning');
      } 
    }
  };

  const signUp = async (user: TRegister) => {

    try {
      if (!chainId) throw "chain is not defined...";
      if (!address) throw "address is not defined...";
      
      const { data : msgData } = await api.post(`/user/request-message`, { chain: chainId, address });
      const { id, message, profileId }: TMsg = msgData;
      
      if (!id || !message || !profileId) { 
        showToast("Undefined Message.", 'warning');
        return;
      }
      
      const signature = await signMessageAsync({ message });

      const { data : registerData } = await api.post(`/user/signup`, { message, signature, user });
      console.log({
        jwt: registerData
      });

      if (registerData === 'exists') {
        showToast("User already exists.", 'warning');
      } else {
        const { data: _user }: any = jwt.decode(registerData);
        console.log(_user);
        _setAuth (_user, registerData);
        showToast ("Profile created Successfully.", "success");
      }
    } catch (err: any) {
      console.log(err);
      if (err.code === 4001) {
        showToast("User rejected the request.", 'warning');
      } else if (err.code === 'ERR_BAD_RESPONSE' || err.code === "ERR_NETWORK") {
        showToast("Register failed. Please try again.", 'warning');
      } 
    }
  }

  React.useEffect(() => {
    if (isConnected) {
      signIn ();
    } else {
      setUser (undefined);
      setIsAuthenticated (false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, chain, address]);
  

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        isAuthenticated, 
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
