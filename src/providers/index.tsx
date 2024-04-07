"use client";
import React from "react";
import ThemeProvider from "@/providers/themeProvider";
import JotaiProvider from "@/providers/jotaiProvider";
import ToastProvider from "@/providers/toastProvider";
import ActiveWeb3Provider from "@/providers/web3Provider";
import RainbowProvider from "@/providers/rainbowProvider";
import AuthProvider from "@/providers/authProvider";

const ThemeClient = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
    </ThemeProvider>
  );
};

export default ThemeClient;
