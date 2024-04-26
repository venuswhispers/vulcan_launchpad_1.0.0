import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Loader = ({ children, loading = false }: { children: React.ReactNode, loading: boolean }) => {
  return (
    <React.Fragment>
      {
        loading ? 
        <div className="flex justify-center items-center pt-40">
          <Icon icon="mingcute:loading-fill" className="spin" width={50} height={50}/>
        </div> :
        children
      }
    </React.Fragment>
  );
};

export default Loader;
