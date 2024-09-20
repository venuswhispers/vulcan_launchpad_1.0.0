"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter, usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import { copyToClipboard } from "@/utils";
import useToastr from "@/hooks/useToastr";
import { CHAIN_DATA } from "@/constants/constants";

interface INav {
  title: string;
  url: string;
  icon: string;
  soon?: true;
}

const navs: INav[] = [
  { 
    title: "My Dashboard", 
    url: "/", 
    icon: "radix-icons:dashboard" 
  },
  { 
    title: "Current ICOs", 
    url: "/live/", 
    icon: "fluent:live-24-regular" 
  },
  { 
    title: "Archived ICOs", 
    url: "/done/", 
    icon: "hugeicons:wallet-done-02" 
  },
  { 
    title: "Launch ICO", 
    url: "/create/", 
    icon: "bi:gem" 
  },
  { 
    title: "News", 
    url: "/news/", 
    icon: "emojione-monotone:newspaper",
    soon: true
  },
  { title: "Tutorials", 
    url: "/tutorials/", 
    icon: "ic:round-school",
    soon: true
  },
  { title: "Videos", 
    url: "/videos/", 
    icon: "icon-park-outline:video",
    soon: true
  },
  {
    title: "Evangalists",
    url: "/evangilists/",
    icon: "simple-icons:marketo",
    soon: true,
  },
  {
    title: "Accreditors",
    url: "/accreditors/",
    icon: "ph:user-circle-light",
    soon: true,
  },
  { 
    title: "Help", 
    url: "/help/", 
    icon: "ri:file-list-3-line" 
  },
];

const Sider = () => {
  //hooks
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  //state
  const [current, setCurrent] = React.useState<string>("Dashboard");
  const [isCollapse, setIsCollapse] = React.useState<boolean>(true);
  //web3
  const { address, chain } = useActiveWeb3();
  //hooks
  const { showToast } = useToastr();

  const _renderThemeSwitch = () => (
    <div className="relative flex bg-[#EFF3FF] dark:bg-[#050606] rounded-xl w-full px-2 py-1 mt-4">
      <div
        className={`absolute left-1 dark:left-[calc(50%-4px)] rounded-lg h-[calc(100%-8px)] w-[50%] z-0 bg-gradient-to-r from-[#FF6802] to-[#EE0E72]  transition-[left] duration-200`}
      ></div>
      <div
        onClick={() => setTheme("dark")}
        className={`flex z-10 justify-center cursor-pointer items-center gap-2 dark:text-[#6F767E] text-white text-sm px-2 py-1 w-1/2`}
      >
        <Image
          src={theme !== "dark" ? "/images/sun.svg" : "/images/sun-light.svg"}
          width={24}
          height={24}
          alt={"sun"}
          priority={true}
        />
        Light
      </div>
      <div
        onClick={() => setTheme("light")}
        className={`flex z-10 justify-center cursor-pointer items-center gap-2 text-[#6F767E] dark:text-white text-sm px-2 py-1 w-1/2`}
      >
        <Image
          src={theme !== "dark" ? "/images/moon-light.svg" : "/images/moon.svg"}
          width={24}
          height={24}
          alt={"sun"}
          priority={true}
        />
        Dark
      </div>
    </div>
  );

  const _gotoURL = (url: string) => {
    router.push(url);
  };

  const _renderNavItem = ({ title, icon, url, soon }: INav) => (
    <li
      key={title}
      onClick={() => _gotoURL(url)}
      className={`w-full px-1 flex justify-between gap-2 items-center text-black dark:text-white text-[15px] py-[10px] ${
        pathname === url &&
        "bg-[#2B6EC8] !px-5 !py-4 font-bold !text-white my-1"
      }  rounded-2xl cursor-pointer hover:font-bold`}
    >
      <div className="flex gap-2">
        <Icon icon={icon} width={22} /> {title}
      </div>
      {soon && (
        <span
          className={`text-[9px] text-center text-[#0776DA] bg-[#E5F6FF] dark:bg-[#e5f6ff13] rounded-full px-2 py-1 ${
            pathname === url && "dark:text-white text-blue-600"
          }`}
        >
          Coming Soon
        </span>
      )}
    </li>
  );

  const handleCollapse = () => {
    setIsCollapse((prev) => !prev);
  };

  const handleCopyAddress = async () => {
    showToast("Copied address to clipboard", "success");
    await copyToClipboard(String(address));
  };

  return (
    <>
      {!isCollapse && (
        <div
          onClick={handleCollapse}
          className="fixed md:hidden top-0 left-0 right-0 bottom-0 backdrop-filter backdrop-blur-[10px] z-10"
        ></div>
      )}
      <div
        className={`fixed ${
          isCollapse ? "-left-[300px]" : "left-4"
        } transition-all duration-200 bottom-4 z-20 top-4 md:static md:flex md:overflow-auto flex-none flex-col justify-between bg-white dark:bg-[#100E28] w-[300px] border-2 border-[#E3E3E3] dark:border-[#100E28] rounded-xl sider`}
      >
        <div className="w-full h-full overflow-y-scroll overflow-x-hidden vulcan-sider">
          <div className="w-[300px]">
            <section id="sider-info" className="">
              <div className="flex justify-center items-center border-b-2 border-[#E3E3E3] dark:border-[#100E28] p-6">
                <Image
                  src={
                    theme !== "dark"
                      ? "/images/logo.dark.svg"
                      : "/images/logo.svg"
                  }
                  width={110}
                  height={110}
                  alt={"sun"}
                  priority={true}
                />
              </div>
              <div className="flex justify-center items-center flex-col mt-4">
                {user && user.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.avatar}
                    key={user.avatar}
                    width={70}
                    height={70}
                    alt={"avatar"}
                    className="rounded-xl aspect-square"
                    // priority={true}
                  />
                ) : (
                  <Icon
                    icon="flowbite:user-solid"
                    width={70}
                    height={70}
                    className="rounded-3xl bg-[#46455367] dark:bg-[#919097e0] opacity-50"
                  />
                )}
                <h3 className="text-black font-sans dark:text-white font-bold mt-3 text-lg">
                  {user && user.fullName ? user.fullName : "Unknown"}
                </h3>
                <div className="text-sm text mt-1 flex items-center gap-1">
                  {isAuthenticated ? (
                    <>
                      <span>verified</span>
                      <Icon
                        className="text-[#0CAF60] text-[18px]"
                        icon="ic:baseline-verified"
                      />
                    </>
                  ) : (
                    <>
                      <span>Not Verified</span>
                      <Icon
                        className="text-[#0CAF60] text-[18px]"
                        icon="octicon:unverified-24"
                      />
                    </>
                  )}
                </div>
                {address && (
                  <div className="dark:text-white text-black text-xs mt-5 flex gap-1">
                    <span
                      onClick={handleCopyAddress}
                      className="hover:underline cursor-pointer"
                    >
                      {address.substring(0, 13) +
                        "...." +
                        address.substr(address.length - 13, 13)}
                    </span>{" "}
                    <Icon
                      className="cursor-pointer"
                      width={15}
                      onClick={() =>
                        window.open(
                          `${CHAIN_DATA[String(chain?.id)]?.explorer}/address/` + address
                        )
                      }
                      height={15}
                      icon="fluent:open-16-filled"
                    />
                  </div>
                )}
              </div>
              <ul className="mt-4 p-6">
                {navs.map((_nav: INav) => _renderNavItem(_nav))}
              </ul>
            </section>
            <section id="theme-switcher" className="p-6">
              {_renderThemeSwitch()}
            </section>
          </div>
        </div>
        <Icon
          onClick={handleCollapse}
          icon="material-symbols:arrow-forward-ios"
          width={30}
          className={`absolute cursor-pointer hover:opacity-60 right-0 top-1/2 translate-x-full -translate-y-1/2 !z-50 md:hidden dark:text-white ${
            !isCollapse && "hidden"
          }`}
        />
      </div>
    </>
  );
};

export default Sider;
