import Image from 'next/image';
import Link from 'next/link';
import Avatar from './Avatar';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import UserInfo from '../common/dropdown/UserInfo';

type Props = {
  user?: any;
};

const Header = ({ user }: Props) => {
  return (
    <header className="container mx-auto border-b border-slate-800 py-5 px-6 text-slate-200">
      <div className="flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-x-3 font-bold">
          <div className="relative h-6 w-5">
            <Image src="/logo.png" alt="codingUI" fill sizes="20vw"></Image>
          </div>
          <span>CodingUI</span>
        </Link>
        {user?.email && <UserInfo user={user} />}
        {!user?.email && (
          <div className="flex items-center gap-x-3">
            <Link
              href="/manage/cards"
              className="flex items-center rounded-lg px-6 py-3 text-sm font-medium text-white"
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className="bg-gradient-secondary button-effect flex items-center rounded-lg px-6 py-3 text-sm font-medium text-white"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
