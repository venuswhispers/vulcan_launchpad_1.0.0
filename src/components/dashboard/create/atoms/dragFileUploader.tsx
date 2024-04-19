"use client";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import Dropzone from 'react-dropzone';
import { useAtom } from "jotai";
import { previewAtom } from "@/store";
import { Preview } from "@/types";
import useToastr from "@/hooks/useToastr";

const acceptables = [
  'video/mp4',
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/gif', 
  'image/webp'
]

const Uploader = ({isInvalid}: {isInvalid: boolean}) => {

  const { showToast } = useToastr ();
  const [preview, setPreview] = useAtom(previewAtom);
  const [selected, setSelected] = React.useState<string>("");

  const onDrop = (files: File[]) => {
    try {
      const file: File = files[0];

      if (!file) throw "Emptry file";
      if (!acceptables.includes(file.type)) throw "Invalid acceptable file type.";
      if (file.size > 1024*1024*1024) throw "Overflow maximum file size (1GB).";

      setSelected (file.name);
  
      const reader = new window.FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        const _file: Preview = { type: file.type, data: String(reader.result) };
        setPreview(_file);
      }
    } catch (err) {
      showToast(String(err), "warning"); 
      setPreview (undefined);
      setSelected ("");
    }
  }

  return (
    <Dropzone onDrop={onDrop} multiple={false}>
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div>
          <div
            {...getRootProps({ className: 'dropzone' })}
            id="upload"
            className={`bg-[#F0F8FF] cursor-pointer ${isDragActive && '!border-[#98bdea52] border-dashed'} dark:bg-[#020111] border-2 border-[#98bdea17] py-16 rounded-2xl mt-3 flex justify-center items-center`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col gap-3 cursor-pointer hover:opacity-60 items-center">
                <Icon icon="line-md:cloud-upload-outline-loop" width={30} />
                <p className="dark:text-[#777E90] text-[#777E90] text-xs text-center">
                  { selected ? selected : "PNG, GIF, WEBP, MP4. Max 1Gb." }
                </p>
            </div>
          </div>
          <p className="text-red-800 text-[11px] px-2 h-3">{ ( isInvalid && !preview ) ? 'Select logo Image for your project' : '' }</p>
        </div>
      )}
      
    </Dropzone>
  );
};

export default Uploader;
