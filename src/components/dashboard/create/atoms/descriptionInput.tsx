import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import dynamic from "next/dynamic";
import { Quill } from "react-quill";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
//@ts-ignore
import ImageUploader from "quill-image-uploader";
import { Tooltip } from "@nextui-org/react";
Quill.register("modules/imageUploader", ImageUploader);

interface IProps {
  className?: string,
  onChange: (e: string) => void,
  value: string,
  title: string,
  placeholder: string,
  message: string,
  isInvalid: boolean,
  info: string,
  readOnly?: boolean
}

const modules = {
  // #3 Add "image" to the toolbar
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "image"],
    ["clean"]
  ],
  // # 4 Add module and upload function
  // imageUploader: {
  //   upload: (file: any) => {
  //     return new Promise((resolve, reject) => {
  //       const formData = new FormData();
  //       formData.append("image", file);

  //       fetch(
  //         "https://api.imgbb.com/1/upload?key=334ecea9ec1213784db5cb9a14dac265",
  //         {
  //           method: "POST",
  //           body: formData
  //         }
  //       )
  //         .then((response) => response.json())
  //         .then((result) => {
  //           console.log(result);
  //           resolve(result.data.url);
  //         })
  //         .catch((error) => {
  //           reject("Upload failed");
  //           console.error("Error:", error);
  //         });
  //     });
  //   }
  // }
}
  
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

const Input = ({title, className, onChange, value, placeholder, isInvalid, message, info, readOnly = false}: IProps) => {

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
        className={`w-full max-w-full ${ readOnly && 'displayer p-3 dark:bg-[#020111] bg-[#F0F8FF] rounded-md' }`} 
        theme="snow"
        readOnly={readOnly}
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
