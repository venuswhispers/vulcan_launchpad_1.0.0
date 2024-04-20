import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Dropdown } from "flowbite-react";
import { Button, Popover } from "flowbite-react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import useActiveWeb3 from "@/hooks/useActiveWeb3";

const WalletConnectButton = () => {
  const router = useRouter();
  const { signIn, isAuthenticated, user } = useAuth();
  const { isConnected } = useActiveWeb3();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const _handleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const _renderSignActions = () => {
    if (!isAuthenticated) {
      return (
        <div
          onClick={_handleSignIn}
          className="flex gap-2 items-center cursor-pointer dark:hover:bg-[#040413] px-3 py-2 hover:bg-[#b6bcc2]"
        >
          {!isLoading ? (
            <Icon
              icon="material-symbols:lab-profile-outline"
              width={20}
              height={20}
            />
          ) : (
            <Icon icon="eos-icons:bubble-loading" width={20} height={20} />
          )}
          SignIn
        </div>
      );
    } else {
      return (
        <div
          onClick={() => router.push("/profile")}
          className="flex gap-2 items-center cursor-pointer dark:hover:bg-[#040413] px-3 py-2 hover:bg-[#b6bcc2]"
        >
          <Icon
            icon="material-symbols:lab-profile-outline"
            width={20}
            height={20}
          />
          Profile
        </div>
      );
    }
  };

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="text-sm flex gap-1 items-center truncate text-nowrap cursor-pointer py-[6px] px-2 rounded-xl font-bold hover:opacity-60 bg-[#2B6EC8] !text-white"
                  >
                    <Icon
                      width={28}
                      height={25}
                      icon="fluent:wallet-credit-card-32-regular"
                    />
                    <span className="hidden xs:inline">Connect Wallet</span>
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="founded-full border-[#E6E8EC] dark:border-[#e6e8ec17] p-1 flex items-center dark:bg-black rounded-full text-red-500 hover:text-red-400 text-sm truncate cursor-pointer"
                  >
                    <Icon
                      icon="ic:sharp-do-not-disturb"
                      width={32}
                      height={32}
                    />
                    <span className="pr-2 truncate md:inline hidden">
                      Wrong Network
                    </span>
                  </button>
                );
              }
              return (
                <div className="flex gap-1 sm:gap-2 text-sm font-bold">
                  <button
                    onClick={openChainModal}
                    className="founded-full p-[5px] flex items-center dark:border-black border-[2px] font-bold bg-[#DBE6FF] dark:bg-black rounded-full dark:text-[#5D5F68] hover:dark:text-white cursor-pointer"
                    type="button"
                  >
                    {chain.hasIcon && chain.iconUrl && (
                      <Image
                        src={chain.iconUrl}
                        width={32}
                        height={32}
                        alt={chain.name ?? "Chain icon"}
                        priority={true}
                        className="rounded-full"
                      />
                    )}
                    <div className="pl-2 pr-3 truncate md:inline hidden">
                      {chain.name}
                    </div>
                  </button>
                  <Popover
                    className="border-none outline-none"
                    content={
                      <div className="flex flex-col gap-2 dark:bg-[#1F2937] bg-white border border-gray-200 rounded-lg dark:border-none">
                        <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          <span className="block text-sm">
                            {isAuthenticated && user
                              ? "@" + user.fullName
                              : "@Vulcan Pad"}
                          </span>
                        </div>
                        {_renderSignActions()}
                        <div
                          onClick={openAccountModal}
                          className="flex gap-2 rounded-b-md items-center cursor-pointer dark:hover:bg-[#040413] px-3 py-2 hover:bg-[#b6bcc2]"
                        >
                          <Icon icon="tabler:logout" width={20} height={20} />
                          Disconnect
                        </div>
                      </div>
                    }
                    arrow={false}
                    trigger="hover"
                  >
                    <button
                      // onClick={openAccountModal}
                      type="button"
                      className="founded-full border-[2px] dark:border-[#e6e8ec17] p-[5px] flex items-center dark:bg-black rounded-full dark:text-[#5D5F68] hover:dark:text-white !outline-none cursor-pointer"
                    >
                      {user && user.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.avatar}
                          width={32}
                          height={32}
                          alt={"wallet avatar"}
                          // priority={true}
                          className="rounded-full aspect-square"
                        />
                      ) : (
                        <Icon
                          icon="flowbite:user-solid"
                          width={32}
                          height={32}
                          className="rounded-full bg-[#46455367] dark:text-black dark:bg-[#868592c4] opacity-50"
                        />
                      )}
                      {/* {account.displayName} */}
                      {account.displayBalance && (
                        <div className="pl-2 pr-3 truncate md:inline hidden dark:text-white text-[#23262F]">
                          {account.displayBalance.substring(
                            0,
                            account.displayBalance.length - 3
                          )}
                          <span className="text-[#45B26B]">ETH</span>
                        </div>
                      )}
                    </button>
                  </Popover>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletConnectButton;
