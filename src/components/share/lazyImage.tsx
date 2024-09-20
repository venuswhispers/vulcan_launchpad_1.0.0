"use client"
import React from 'react';
import Image from 'next/image';
import { Skeleton } from "@nextui-org/react";

interface IProps {
  src: string,
  className?: string
}

const LazyImage = ({ src, className }: IProps) => {
 
  const [loaded, setLoaded] = React.useState<boolean>(false);

  return (
    <div className='w-full h-full relative'>
      <Image
        src={src}
        key={src}
        width={0}
        alt=""
        height={0}
        onLoad={() => setLoaded(true)}
        sizes="100vw"
        priority={false}
        className={`w-full h-full object-contain dark:bg-black bg-gray-100  rounded-2xl ${className}`}
      />
      <Skeleton className={`rounded-lg absolute top-0 left-0 w-full dark:bg-[#363639] bg-gray-400 ${ loaded && 'hidden' } ${className}`}>
        <div className={`dark:bg-gray-700 bg-gray-400 aspect-square w-full h-full rounded-[19px]`}></div>
      </Skeleton>
    </div>
  )
}

export default LazyImage;