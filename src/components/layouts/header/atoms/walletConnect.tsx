import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { Icon } from '@iconify/react/dist/iconify.js';

const WalletConnectButton = () => {
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
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} className="text-sm flex gap-1 items-center truncate text-nowrap cursor-pointer py-[6px] px-2 rounded-xl font-bold hover:opacity-60 bg-[#2B6EC8] !text-white">
                    <Icon width={28} height={25} icon="fluent:wallet-credit-card-32-regular" />
                    <span className='hidden xs:inline'>Connect Wallet</span>
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
                    <Icon icon="ic:sharp-do-not-disturb" width={32} height={32}/>
                    <span className="pr-2 truncate md:inline hidden">Wrong Network</span>
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
                    {chain.hasIcon && chain.iconUrl && 
                      <Image
                        src={chain.iconUrl}
                        width={32}
                        height={32}
                        alt={chain.name ?? 'Chain icon'}  
                        priority={true}    
                        className="rounded-full"
                      />
                    }
                    <div className="pl-2 pr-3 truncate md:inline hidden">{chain.name}</div>
                  </button>
                  <button 
                    onClick={openAccountModal} 
                    type="button"
                    className="founded-full border-[2px] border-[#E6E8EC] dark:border-[#e6e8ec17] p-[5px] flex items-center dark:bg-black rounded-full dark:text-[#5D5F68] hover:dark:text-white cursor-pointer"
                  >
                    <Image
                      src={"/images/man.png"}
                      width={32}
                      height={32}
                      alt={"wallet"}   
                      priority={true}    
                      className="rounded-full"
                    />
                    {/* {account.displayName} */}
                    { 
                      account.displayBalance && 
                      <div className="pl-2 pr-3 truncate md:inline hidden dark:text-white text-[#23262F]">
                        { account.displayBalance.substring(0, account.displayBalance.length - 3) }
                        <span className="text-[#45B26B]">ETH</span>
                      </div>
                    }
                  </button>
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