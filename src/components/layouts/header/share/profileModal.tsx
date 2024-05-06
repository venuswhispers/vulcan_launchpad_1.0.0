import React from 'react';
import {User, Link, Snippet, Avatar, Button} from "@nextui-org/react";
import useActiveWeb3 from '@/hooks/useActiveWeb3';
import { useAccountModal, useConnectModal, useChainModal } from "@rainbow-me/rainbowkit";
import { Icon } from '@iconify/react/dist/iconify.js';
import { ACCOUNT, RAINBOW_CHAIN } from '@/types';
import useAuth from "@/hooks/useAuth";
import { useRouter } from 'next/navigation';
import useToastr from '@/hooks/useToastr';

interface IProps {
  chain: RAINBOW_CHAIN,
  account: ACCOUNT,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ProfileModal = ({ chain, account, setVisible }: IProps) => {

  const { address } = useActiveWeb3 ();
  const { openChainModal } = useChainModal ();
  const { openAccountModal } = useAccountModal ();
  const { signIn, isAuthenticated, user } = useAuth();
  const { isConnected } = useActiveWeb3();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { connectModalOpen, openConnectModal } = useConnectModal ();
  const router = useRouter();
  const { showToast } = useToastr();

  const _handleSignIn = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await signIn();
      setVisible (false);
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
          className='flex gap-2 w-full'
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
          SIGN IN
        </div>
      );
    } else {
      return (
        <div
          onClick={() => router.push("/profile")}
          className='flex gap-2 w-full'
        >
          <Icon
            icon="material-symbols:lab-profile-outline"
            width={20}
            height={20}
          />
          PROFILE
        </div>
      );
    }
  };

  return (
    <div className='fixed bg-white dark:bg-[#100E28] z-50 right-1 top-1 rounded-lg sm:left-auto left-1 sm:right-4 sm:top-4 sm:w-96 shadow-md dark:shadow-[#ffffff23]'>
      <div className='fixed top-0 left-0 bottom-0 right-0' onClick={ () => setVisible(false) }></div>
   
      <Icon onClick={() => setVisible(false)} icon="ion:close"  className='absolute right-4 top-4 cursor-pointer hover:opacity-50 z-50' width={20}/>
      <div className='relative p-5 border-b dark:border-gray-800 border-gray-200'>
        <div className='flex gap-2'>
          <Avatar radius="md" showFallback src={ user && user.avatar ? user.avatar : '' }/>
          {
            user && 
            <div className='flex items-center text-[16px]'>
              <h3>@{ user?.fullName }</h3>
            </div>
          }
        </div>
        <div className='flex mt-5 items-center'>
          <div className='flex-none flex justify-center items-center'>
            <div className='w-10 flex justify-center items-center flex-none aspect-square rounded-full dark:bg-gray-700 bg-gray-300'>
              <Avatar src={ chain.iconUrl } className="w-6 h-6 text-tiny"  />
            </div>
          </div>
          <div className='flex grow flex-col items-center'>
            <div className='pl-3 flex w-full justify-between items-center'>
              <h3 className='flex'>{ chain.name }</h3>
              { 
                account.displayBalance && 
                <h3>{ account.displayBalance }</h3>
              }
            </div>
            <div className='pl-3 flex w-full justify-between items-center'>
              <Snippet disableTooltip  size='lg' className='bg-transparent opacity-50 dark:text-white -mt-1 -mb-2 p-0 text-black' hideSymbol codeString={address}>{ address ? address.substring(0,4) + "...." + address.substr(address.length - 4, 4) : '' }</Snippet>
              <h3 className='opacity-50 cursor-pointer hover:underline'>ADD FUNDS</h3>
            </div>
          </div>
        </div>
        <div className='flex mt-5 items-center'>
          <div className='flex-none flex justify-center items-center'>
            <div className='w-10 flex justify-center items-center flex-none aspect-square rounded-full dark:bg-gray-700 bg-gray-300'>
              <Icon icon="ic:twotone-link" width={22} />
            </div>
          </div>
          <div className='flex grow items-center'>
            <div className='pl-3 flex w-full justify-between'>
              <h3 onClick={() => { openChainModal ? openChainModal(): {} }} className='cursor-pointer opacity-50 hover:opacity-100'>Switch Chain</h3>
              <h3 onClick={() => { openAccountModal ? openAccountModal(): {} }} className='cursor-pointer opacity-50 hover:opacity-100'>Disconnect</h3>
            </div>
          </div>
        </div>
      </div>

      <div className='py-2 relative border-b dark:border-gray-800 border-gray-200'>
        <div className='px-6 py-3 flex gap-2 hover:dark:bg-[#1e1a42] hover:bg-[#28235352] cursor-pointer text-[16px] font-normal'>
          { _renderSignActions() }
        </div>
      </div>
      <div className='px-5 relative py-3 flex gap-2'>
        <Button isIconOnly className='dark:bg-[#554C5F] bg-[#554c5f5e] rounded-md' size='sm' aria-label="Like">
          <Icon icon="line-md:twitter-x-alt" className='text-black dark:text-white' width={18}/>
        </Button>
        <Button isIconOnly className='dark:bg-[#554C5F] bg-[#554c5f5e] rounded-md' size='sm' aria-label="Like">
          <Icon icon="bi:discord" className='text-black dark:text-white' width={18}/>
        </Button>
        <Button isIconOnly className='dark:bg-[#554C5F] bg-[#554c5f5e] rounded-md' size='sm' aria-label="Like">
        <Icon icon="ant-design:instagram-filled" className='text-black dark:text-white' width={18}/>
        </Button>
      </div>
    </div>
  )
}

export default ProfileModal;