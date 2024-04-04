import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Displayer = ({ value }: { value: string }) => {
  return (
    <div className="displayer">
      <ReactQuill
        className="w-full max-w-full displayer"
        theme="snow"
        value={value}
        readOnly
      />
    </div>
  );
};

export default Displayer;
