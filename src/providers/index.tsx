"use client";
import React from "react";
import ThemeProvider from "@/providers/themeProvider";
import JotaiProvider from "@/providers/jotaiProvider";
import ToastProvider from "@/contexts/toastContext";

const ThemeClient = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem > 
      <ToastProvider>
        <JotaiProvider>
          {children}
        </JotaiProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default ThemeClient;
