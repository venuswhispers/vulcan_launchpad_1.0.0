"use client";
import React from "react";
import { type Chain, type Address, type Client } from "viem";
import { useAccount, useSignMessage } from "wagmi";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import useWeb3 from "@/hooks/useActiveWeb3";



interface IContext {
  chain: Chain | undefined,
  address: Address | undefined;
  chainId: number | undefined;
  isConnected: boolean;
  isConnecting: boolean;
  isReconnecting: boolean;
  isDisconnected: boolean;
  connector: any | undefined;
  signer: any | undefined;
}

export const AuthContext = React.createContext<IContext | undefined>(undefined);

const AuthProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {

  const { address, chain, signer, isConnected, isConnecting, isReconnecting, connector, isDisconnected, chainId } = useActiveWeb3();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { signMessageAsync } = useSignMessage();

  React.useEffect(() => {
    if (!chain || !address) return;
    console.log(address, chain.id)
    const handleAuth = async () => {
      const { message }: any = await requestChallengeAsync({
        address: address as string,
        chainId: chain.id,
      });

      const signature = await signMessageAsync({ message });

      console.log(signature)

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
    if (isConnected) {
      handleAuth();
    }
  }, [isConnected]);
  

  return (
    <AuthContext.Provider
      value={{
        chain,
        address,
        isConnected,
        isConnecting,
        isReconnecting,
        isDisconnected,
        connector,
        chainId,
        signer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
