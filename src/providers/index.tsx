"use client";
import React from "react";
import ThemeProvider from "@/providers/themeProvider";
import JotaiProvider from "@/providers/jotaiProvider"

const ThemeClient = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem > 
      <JotaiProvider>
        {children}
      </JotaiProvider>
    </ThemeProvider>
  );
};

export default ThemeClient;
