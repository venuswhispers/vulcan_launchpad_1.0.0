import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { Tooltip } from "@nextui-org/react";

interface IProps {
  className?: string,
  onChange: (e: string) => void,
  value: string,
  title: string,
  placeholder: string,
  message: string,
  isInvalid: boolean,
  info: string
}

const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }]
    ]
  };
  
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font"
  ];

const Input = ({title, className, onChange, value, placeholder, isInvalid, message, info}: IProps) => {

  const [code, setCode] = React.useState("hellllo");
  const handleProcedureContentChange = (content:any, delta:any, source:any, editor:any) => {
    onChange(content);
  };

  return (
    <div className={className}>
      <div className="px-1 py-1 font-bold truncate flex gap-1 items-center">{title} 
        <Tooltip className="relative z-50 bg-black text-white p-2" content={info}>
          <Icon icon="ep:info-filled" className="text-[#9A9FA5] cursor-pointer hover:opacity-60" />
        </Tooltip>
      </div>
      <ReactQuill
        className="w-full max-w-full"
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={handleProcedureContentChange}
      />
      <p className="text-red-800 text-[11px] px-2 h-3">{ isInvalid && (!value || value === '<p><br></p>') ? message : '' }</p>
    </div>
  )
};

export default Input;
