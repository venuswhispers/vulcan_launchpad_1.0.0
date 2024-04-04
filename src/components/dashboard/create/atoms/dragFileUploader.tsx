"use client";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import Image from "next/image";
import { useAtom } from "jotai";
import { useDropzone} from 'react-dropzone';


const Uploader = () => {


  const { getRootProps, getInputProps, isDragActive } = useDropzone();

  

  const readImage = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement & {
      files: FileList;
    }

    console.log(target.files[0]);
    // const reader = new window.FileReader()
    // reader.readAsArrayBuffer(file)
    // reader.onloadend = () => {
    //     setType(file.type);
    //     setBuffer(Buffer(reader.result));
    // }
}

  return (
    <label
        {...getRootProps()}
        htmlFor="project-logo"
        id="upload"
        className="bg-[#F0F8FF] dark:bg-[#020111] border-2 border-[#98bdea17] py-16 rounded-2xl mt-3 flex justify-center items-center"
    >
        <div className="flex flex-col gap-3 cursor-pointer hover:opacity-60 items-center">
            <Icon icon="line-md:cloud-upload-outline-loop" width={30} />
            <p className="dark:text-[#777E90] text-[#777E90] text-xs text-center">
                PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.
            </p>
        </div>
        <input {...getInputProps()} onChange={readImage} id="project-logo" type="file" className="hidden" accept="image/png, image/gif, image/jpeg"/>
    </label>
  );
};

export default Uploader;
