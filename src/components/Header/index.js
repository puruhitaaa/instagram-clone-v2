import Link from 'next/link';
import Image from 'next/image';
import { HomeIcon } from '@heroicons/react/solid';
import {
  HeartIcon,
  PlusCircleIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
  SearchIcon,
  MenuIcon,
} from '@heroicons/react/outline';
import { signOut } from '@firebase/auth';

import { useAuth } from '../../context/auth';
import Badge from './badge';
import { auth } from '../../lib/firebase';
import { useModal } from '../../context/modal';

const Header = () => {
  const { user, loading } = useAuth();
  const { setShow } = useModal();

  const signOutHandler = () => {
    signOut(auth);
  };

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-10">
      <div className="flex justify-between bg-white max-w-6xl mx-5 lg:mx-auto">
        <div className="relative hidden lg:inline-grid w-24 cursor-pointer">
          <Image
            src="https://links.papareact.com/ocw"
            objectFit="contain"
            layout="fill"
          />
        </div>

        <div className="relative flex-shrink-0 lg:hidden w-7 cursor-pointer">
          <Image
            src="https://links.papareact.com/jjm"
            objectFit="contain"
            layout="fill"
          />
        </div>

        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 border block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:border-blue-500"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="navBtn" />
          <MenuIcon className="h-7 md:hidden cursor-pointer" />

          <>
            <div className="relative navBtn">
              <PaperAirplaneIcon className="navBtn" />
              <Badge amount="9" />
            </div>
            <PlusCircleIcon onClick={() => setShow(true)} className="navBtn" />
            <UserGroupIcon className="navBtn" />
            <HeartIcon className="navBtn" />

            <button
              type="button"
              onKeyDown={signOutHandler}
              onClick={signOutHandler}
            >
              <svg
                className="navBtn cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>

            <Link href={'/profile/' + user?.displayName}>
              <img
                className="h-8 w-8 rounded-full cursor-pointer"
                src={user?.photoURL}
                alt="profile-pic"
              />
            </Link>
          </>
        </div>
      </div>
    </div>
  );
};

export default Header;
