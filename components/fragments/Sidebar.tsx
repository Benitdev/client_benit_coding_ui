'use client';

import clsx from 'clsx';
import { menus } from 'constant/global-constant';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  return (
    <div
      aria-label="sidebar"
      className="relative hidden border-r border-black/30 bg-black/30 p-5 shadow-lg shadow-black backdrop-blur-2xl lg:block"
    >
      <Logo />
      <ul className="flex flex-col gap-y-2">
        {menus.map((item, index) => (
          <MenuItem key={index} menu={item}></MenuItem>
        ))}
      </ul>
    </div>
  );
};

function MenuItem({ menu }: any) {
  const currentRoute = usePathname();
  return (
    <li>
      <Link
        href={menu.link}
        className={clsx(
          'flex items-center gap-x-3 rounded-lg px-4 py-3 hover:bg-primary/60',
          {
            'bg-primary/60': currentRoute === menu.link,
          },
        )}
      >
        <span className="w-5">
          <menu.icon />
        </span>
        <span>{menu.title}</span>
      </Link>
    </li>
  );
}

function Logo({}) {
  return (
    <Link
      href="/"
      className="mt-5 mb-10 flex items-center justify-start gap-x-3 px-4 text-sm font-bold"
    >
      <img src="/logo.png" alt="codingui" className="max-w-[25px]" />
      <span>CodingUI</span>
    </Link>
  );
}
export default Sidebar;
