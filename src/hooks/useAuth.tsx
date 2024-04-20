"use client"
import React from "react";
import { AuthContext } from "@/providers/authProvider";

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("");
  } else {
    return context;
  }
};

export default useAuth;