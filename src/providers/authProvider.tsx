"use client"
import React from "react";
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
import { baseURL } from "@/constants/config";


interface IContext {
  signIn: () => Promise<void>,
  signUp: (data: TRegister) => Promise<void>
  isAuthenticated: boolean,
  isAuthenticating: boolean,
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
  const [isAuthenticating, setIsAuthenticating] = React.useState<boolean>(false);
  const [user, setUser] = useAtom (userAtom);

  const _setAuth = (user: IUSER|undefined, token: string|undefined) => {
    
    axios.defaults.headers.common['x-auth-token'] = token;
    if (token) {
      console.log("set auth token");
      localStorage.setItem("accessToken-", token);
    } else {
      console.log("remove auth token");
      localStorage.removeItem("accessToken-");
      router.push("/");
    }
    setIsAuthenticated (token ? true : false);
    setUser (user);
  }

  /**
   * signin with SIWE
   * @returns 
   */
  const signIn = async () => {
    try {
      if (!chain) throw "chain is not defined...";
      if (!address) throw "address is not defined..."
      setIsAuthenticating (true);
      const { data : msgData } = await api.post(`/user/request-message`, { chain: 1, address });

      const { id, message, profileId, user }: TMsg = msgData;

      if (!id || !message || !profileId) { 
        showToast("Undefined Message.", 'warning');
        return;
      }

      if (!user) {
        router.push("/register");
        showToast("Please create your profile.", 'warning');
        return;
      }
 
      const signature = await signMessageAsync({ message });
      const { data : signData } = await api.post(`/user/signin`, { message, signature });

      if (signData === "none") {
        router.push("/register");
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
    } finally {
      setIsAuthenticating (false);
    }
  };
  /**
   * user registration
   * @param data 
   * @returns 
   */
  const signUp = async (data: TRegister) => {

    try {
      if (!chainId) throw "chain is not defined...";
      if (!address) throw "address is not defined...";
      
      const { data : msgData } = await api.post(`/user/request-message`, { chain: chainId, address });
      const { id, message, profileId, user }: TMsg = msgData;
      
      if (!id || !message || !profileId) { 
        showToast("Undefined Message.", 'warning');
        return;
      }

      if (user) {
        showToast("User already exists.", 'warning');
        return;
      }
      
      const signature = await signMessageAsync({ message });

      const { data : registerData } = await api.post(`/user/signup`, { message, signature, user: data });

      if (registerData === 'exists') {
        showToast("User already exists.", 'warning');
      } else {
        const { data: _user }: any = jwt.decode(registerData);
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

  /**
   * sign with token
   * @param token 
   */
  const signWithJWT = async ( token: string ) => {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;
      const { data } = await axios.get(`${baseURL}/user/signinWithToken`);
      if (data === "none") {
        throw "none user";
      } else {
        const { data: _user }: any = jwt.decode(data);
        _setAuth (_user, data);
      }
    } catch (err) {
      _setAuth (undefined, undefined);
    }
  }

  //@ when wallet is connected, signin with SIWE
  React.useEffect(() => {
    if (isConnected && typeof window !== 'undefined') {
      const jwt = window.localStorage.getItem("accessToken-");
      console.log("jwt ------------------->", jwt);
      if (jwt) {
        signWithJWT (jwt);
      } else {
        signIn ();
      }
    } else {
      setUser (undefined);
      setIsAuthenticated (false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, chain, address]);

  //@ disconnect
  React.useEffect(() => {
    if (isDisconnected && user && isAuthenticated) {
      _setAuth (undefined, undefined);
    }  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisconnected]);
  

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        isAuthenticated, 
        isAuthenticating,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
