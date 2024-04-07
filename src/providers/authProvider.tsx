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
import { IUSER } from '@/types/user';
import { TMsg } from "@/types/user";
import jwt from 'jsonwebtoken';
import useToastr from "@/hooks/useToastr";
import { useRouter } from "next/navigation";


interface IContext {
  signIn: () => Promise<void>,
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
  const router = useRouter ();
  //atoms
  const [isAuthenticated, setIsAuthenticated] = useAtom (isAuthenticatedAtom);
  const [user, setUser] = useAtom (userAtom);

  const signIn = async () => {
    try {
      if (!chain) throw "chain is not defined...";
      if (!address) throw "address is not defined..."

      const { data : msgData } = await axios.post(`${SERVER_URL}/api/user/request-message`, { chain: chain.id, address });
      const { id, message, profileId }: TMsg = msgData;

      if (!id || !message || !profileId) { 
        throw "not defined message"
      }

      const signature = await signMessageAsync({ message });
      
      const { data : signinData } = await axios.post(`${SERVER_URL}/api/user/signin`, { message, signature });
      console.log(signinData);
      if (signinData.status === "SUCCESS") {
        const { data: _user }: any = jwt.decode(signinData.data);
        if (_user) {
          setUser ({ address: _user.address, fullName: _user.fullName, avatar: _user.avatar });
          setIsAuthenticated (true);
          showToast ("Signin Success", "success");
        } else {
          throw "Empty user"
        }
      } else if (signinData.status === "NONE") {
        router.push("/register");
        throw signinData.data;
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
    // const { message }: any = await requestChallengeAsync({
    //   address: address as string,
    //   chainId: chain.id,
    // });
    // const message = "asdfasdfasdfsdaf";

    // const signature = await signMessageAsync({ message });

    // console.log(signature)

    // redirect user after success authentication to '/user' page
    // const { url } = await signIn("moralis-auth", {
    //   message,
    //   signature,
    //   redirect: false,
    //   callbackUrl: "/user",
    // });
    /**
     * instead of using signIn(..., redirect: "/user")
     * we get the url from callback and push it to the router to avoid page refreshing
     */
    // push(url);
  };

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
        isAuthenticated, 
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
