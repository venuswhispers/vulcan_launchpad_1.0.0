import { useContext } from "react";

import { ToastContext } from "@/contexts/toastContext";

/**
 * 
 * @returns context { showNotification(text:string) }
 */
const useToastr = () => {
  const context = useContext(ToastContext);
  if ( !context ) throw new Error("No notification")
  return context;
}

export default useToastr;