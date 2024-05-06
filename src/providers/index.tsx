"use client";
import React from "react";
import dynamic from "next/dynamic";

const JotaiProvider = dynamic(() => import("@/providers/jotaiProvider"), { ssr: false });
const RainbowProvider = dynamic(() => import("@/providers/rainbowProvider"), { ssr: false });
const ThemeProvider = dynamic(() => import("@/providers/themeProvider"), { ssr: false });
const ToastProvider = dynamic(() => import("@/providers/toastProvider"), { ssr: false });
const AuthProvider = dynamic(() => import("@/providers/authProvider"), { ssr: false });
const ActiveWeb3Provider = dynamic(() => import("@/providers/web3Provider"), { ssr: false });
import { NextUIProvider } from "@nextui-org/react";

const ThemeClient = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextUIProvider>
        <ToastProvider>
          <JotaiProvider>
            <RainbowProvider>
              <ActiveWeb3Provider>
                <AuthProvider>
                  {children}
                </AuthProvider>
              </ActiveWeb3Provider>
            </RainbowProvider>
          </JotaiProvider>
        </ToastProvider>
      </NextUIProvider>
    </ThemeProvider>
  );
};

export default ThemeClient;
