"use client";
import React from "react";
import { type Chain, type Address, type Client } from "viem";
import { useSignMessage } from "wagmi";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import axios from 'axios';
import { SERVER_URL } from "@/constants/config";
import { useAtom } from "jotai";
import { isAuthenticatedAtom, userAtom } from "@/store/user";
import { IUSER, TRegister } from '@/types/user';
import { TMsg } from "@/types/user";
import jwt from 'jsonwebtoken';
import useToastr from "@/hooks/useToastr";
import { useRouter } from "next/navigation";
import useAPI from "@/hooks/useAPI";


interface IContext {
  signIn: () => Promise<void>,
  signUp: (data: TRegister) => Promise<void>
  isAuthenticated: boolean,
  user: IUSER|undefined
}

export const AuthContext = React.createContext<IContext | undefined>(undefined);

const AuthProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  //hooks
  const { address, chain, signer, isConnected, isConnecting, isReconnecting, connector, isDisconnected, chainId } = useActiveWeb3();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
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
        throw "not defined message"
      }

      const signature = await signMessageAsync({ message });
      
      const { data : signinData } = await api.post(`/user/signin`, { message, signature });
      console.log(signinData);
      if (signinData.status === "SUCCESS") {
        const { data: _user }: any = jwt.decode(signinData.data);
        if (_user) {
          _setAuth (_user, signinData.data);
          showToast ("Signin Success", "success");
        } else {
          throw "Empty user"
        }
      } else if (signinData.status === "NONE") {
        _setAuth (undefined, undefined);
        router.push("/profile/create");
        throw "Please create your profile";
      } else {
        throw signinData.data;
      }
    } catch (err) {
      if (String(err).includes("User rejected the request")) {
        showToast("User rejected the request.", 'warning');
      } else {
        showToast(String(err), 'warning');
      }
      console.log(err);
    }
  };

  const signUp = async (user: TRegister) => {

    try {
      if (!chainId) throw "chain is not defined...";
      if (!address) throw "address is not defined...";
      
      const { data : msgData } = await api.post(`/user/request-message`, { chain: chainId, address });
      const { id, message, profileId }: TMsg = msgData;
      
      if (!id || !message || !profileId) { 
        throw "not defined message"
      }
      
      const signature = await signMessageAsync({ message });

      const { data : registerData } = await api.post(`/user/signup`, { message, signature, user });
      console.log(registerData);
      const { status, data: payload } = registerData;
      
      if (status === "SUCCESS") {
        const { data: _user }: any = jwt.decode(payload);
        if (_user) {
          _setAuth (_user, payload);
          showToast ("Profile created Successfully.", "success");
        } else {
          throw "Empty user"
        }
      } else {
        showToast (payload, "warning");
      }
    } catch (err) {
      console.log(err);
      if (String(err).includes("User rejected the request.")) {
        showToast ("User rejected the request", "warning");
      } else {
        showToast (String(err), "error");
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
