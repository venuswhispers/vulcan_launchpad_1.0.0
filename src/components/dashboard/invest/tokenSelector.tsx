import React from "react";
import Image from "next/image";
//typs
import { TOKEN } from "@/types";
/**
 * Propstype...
 */
type PropsType = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: (token: TOKEN) => void;
  tokens: TOKEN[];
};

const TokenSelector = (props: PropsType) => {
  /**
   * when token is selected
   * @param token
   */
  const handleSelect = (token: TOKEN) => {
    props.setToken(token);
    props.setVisible(false);
  };

  return (
    <div
      className={`absolute top-full mt-2 z-10 left-0 w-full mb-10 ${
        !props.visible && "hidden"
      }`}
    >
      <div
        className="fixed opacity-0 top-0 left-0 right-0 bottom-0"
        onClick={() => {
          props.setVisible(false);
        }}
      ></div>
      <div className="relative tokens overflow-y-auto bg-[#eee9e9] dark:bg-[#171A1F] rounded-md px-3 py-5 w-full !z-40">
        <div className="w-full border-b border-dashed border-white dark:border-[#ffffff25]"></div>
        {props.tokens.map((_token: TOKEN, index: Number) => (
          <div
            onClick={() => handleSelect(_token)}
            key={index + ""}
            className="hover:dark:bg-[#12151a] rounded hover:bg-[#ffffff81] px-2 cursor-pointer w-full flex gap-3 py-4 items-center border-b border-dashed border-white dark:border-[#ffffff25]"
          >
            <Image
              src={_token.image}
              width={30}
              height={30}
              alt={_token.image + ""}
              className={`rounded-full`}
            />
            {_token.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenSelector;
