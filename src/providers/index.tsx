"use client";
import React from "react";
import ThemeProvider from "@/providers/themeProvider";

const ThemeClient = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem > 
      {children}
    </ThemeProvider>
  );
};

export default ThemeClient;
