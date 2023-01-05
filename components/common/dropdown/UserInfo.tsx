'use client';

import Avatar from '@/components/fragments/Avatar';
import Tippy from '@tippyjs/react/headless';
import authApi from 'api/authApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { setCookie } from 'cookies-next';

type Props = {
  user: any;
};

const UserInfo = ({ user }: Props) => {
  const router = useRouter();
  const [visibleUserInfo, setVisibleUserInfo] = useState(false);
  const handleLogout = async () => {
    await authApi.logout();
    setCookie('ACCESS_TOKEN', null);
    router.refresh();
  };
  return (
    <Tippy
      interactive
      visible={visibleUserInfo}
      offset={[0, 20]}
      render={(attrs) => (
        <div
          className="w-[180px] rounded-xl border border-primary bg-black/10 py-2 px-4 text-center text-sm"
          tabIndex={-1}
          {...attrs}
        >
          <Link
            href={'/user'}
            className="block cursor-pointer py-1 hover:text-primary"
          >
            {' '}
            Thông tin tài khoản{' '}
          </Link>
          <Link
            href={'/manage/cards'}
            className="block cursor-pointer py-1 hover:text-primary"
          >
            Trang quản lí
          </Link>
          <div
            onClick={handleLogout}
            className="mt-2 cursor-pointer border-t-[1px] border-slate-400 py-2 hover:text-primary"
          >
            {' '}
            Đăng xuất{' '}
          </div>
        </div>
      )}
      onClickOutside={() => setVisibleUserInfo(false)}
    >
      <button
        className="flex items-center gap-x-3"
        onClick={() => setVisibleUserInfo(!visibleUserInfo)}
      >
        <Avatar className="h-10 w-10 text-xl"></Avatar>
        <p>
          <span>Hello,</span>
          <strong className="font-secondary bg-gradient-primary ml-1 bg-clip-text font-bold text-transparent">
            {user?.name || user?.fullname || 'Benit'}
          </strong>
        </p>
      </button>
    </Tippy>
  );
};

export default UserInfo;
