import React from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { useAtom } from "jotai";
import { userAtom, isAuthenticatedAtom } from "@/store/user";
import { useRouter } from "next/navigation";
import { baseURL } from "@/constants/config";

const useAPI = () => {
  const router = useRouter ();
  const [, setUser] = useAtom (userAtom);
  const [, setIsAuthenticated] = useAtom (isAuthenticatedAtom);
  
  const api = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response && err.response.status === 401) {
        // if (localStorage.getItem('token')) {
        //   localStorage.setItem('expired', true);
        // }
        axios.defaults.headers.common['x-auth-token'] = undefined;
        setUser (undefined);
        setIsAuthenticated (false);
        router.push("/");
      }
      return Promise.reject(err);
    }
  );

  return api;
};

export default useAPI;
