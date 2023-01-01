'use client';

import Tippy from '@tippyjs/react/headless';
import clsx from 'clsx';
import { useState } from 'react';

type Props = {};

const CardFilter = ({ value, setValue }: any) => {
  const [visibleFilter, setVisibleFilter] = useState(false);
  return (
    <div className="relative w-full">
      <Tippy
        interactive
        visible={visibleFilter}
        offset={[0, 5]}
        placement="bottom"
        render={(attrs) => (
          <div
            className="w-[300px] rounded-xl border border-primary bg-black/10 py-2 px-4 text-center text-sm"
            tabIndex={-1}
            {...attrs}
          >
            <ul>
              <li>hello</li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        )}
        onClickOutside={() => setVisibleFilter(false)}
      >
        <div
          className={clsx(
            'flex w-full cursor-pointer items-start rounded-lg border border-slate-700 bg-transparent p-4 text-base text-gray-400 outline-none transition-all focus:border-primary',
            {
              'text-white': value !== 'Select Filter',
            },
          )}
          onClick={() => setVisibleFilter(!visibleFilter)}
        >
          {value}
        </div>
      </Tippy>
    </div>
  );
};

export default CardFilter;
