import React from "react";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface IProps {
  setShowIntroduction: React.Dispatch<React.SetStateAction<boolean>>,
  url: string
}

const IntroductionModal = ({ setShowIntroduction, url }: IProps) => {
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-50 bg-[#0000003a] backdrop-filter backdrop-blur-[10px] flex justify-center px-2 items-center">
      <div className="fixed top-0 left-0 right-0 bottom-0" onClick={() => setShowIntroduction(false)} ></div>
      <div className="w-[1000px] mt-20">
        <div className="w-full border-2 border-[#a56bec86] bg-[#ffffff31] pt-4 rounded-2xl introduction shadow-xl">
          <div className="w-full bg-[#100E28] rounded-b-2xl aspect-video">
            <ReactPlayer
              controls
              url={url}
              width="100%"
              height="100%"
              playing={true}
            />
          </div>
        </div>
        <div className="bg-[#443A73] w-[95%] h-3 mx-auto rounded-b-full"></div>
      </div>
    </div>
  );
};

export default IntroductionModal;
