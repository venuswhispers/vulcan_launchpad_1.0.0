"use client";
import React from "react";
import { useTheme } from "next-themes";
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
  AvatarComponent
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/constants/wagmiConfig";
import { useAtom } from "jotai";
import { userAtom } from "@/store/user";

const queryClient = new QueryClient();

const RainbowProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const [user] = useAtom(userAtom);

  const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => (
    user?.avatar ? 
    <img
      src={user.avatar}
      width={size}
      height={size}
      className="rounded-full"
    /> :
    <img
      src={'/favicon.svg'}
      width={size}
      height={size}
      className="rounded-full"
    />
  )

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider avatar={CustomAvatar} theme={theme !== "dark" ? darkTheme() : lightTheme()}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default RainbowProvider;
