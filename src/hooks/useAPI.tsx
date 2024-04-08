import React from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { useAtom } from "jotai";
import { userAtom, isAuthenticatedAtom } from "@/store/user";

const useAPI = () => {

  const [, setUser] = useAtom (userAtom);
  const [, setIsAuthenticated] = useAtom (isAuthenticatedAtom);
  
  const api = axios.create({
    baseURL: 'http://localhost:5050/api',
    // baseURL: 'https://tradecopiersignalsbackend.onrender.com/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response.status === 401) {
        // if (localStorage.getItem('token')) {
        //   localStorage.setItem('expired', true);
        // }
        axios.defaults.headers.common['x-auth-token'] = undefined;
        setUser (undefined);
        setIsAuthenticated (false);
      }
      return Promise.reject(err);
    }
  );

  return api;
};

export default useAPI;
