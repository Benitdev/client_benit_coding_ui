'use client';

import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import clsx from 'clsx';
import { cardStatus } from 'constant/global-constant';

const Status = ({ value, setValue }: any) => {
  const [visibleFilter, setVisibleFilter] = useState(false);

  return (
    <div className="relative w-full select-none">
      <Tippy
        interactive
        visible={visibleFilter}
        offset={[0, 5]}
        placement="bottom"
        maxWidth={300}
        render={(attrs) => (
          <div
            className="w-[200px] rounded-xl border border-primary bg-slate-900/80 py-2 px-4 text-center text-sm backdrop-blur-sm"
            tabIndex={-1}
            {...attrs}
          >
            <div
              className={clsx(
                'cursor-pointer rounded p-3 capitalize hover:bg-white/20 hover:text-pink-500',
                {
                  'bg-white/20 text-pink-500': value == cardStatus.PENDING,
                },
              )}
              onClick={() => {
                setValue(value == cardStatus.PENDING ? '' : cardStatus.PENDING);
                setVisibleFilter(false);
              }}
            >
              Pending
            </div>
            <div
              className={clsx(
                'cursor-pointer rounded p-3 capitalize hover:bg-white/20 hover:text-pink-500',
                {
                  'bg-white/20 text-pink-500': value == cardStatus.APPROVED,
                },
              )}
              onClick={() => {
                setValue(
                  value == cardStatus.APPROVED ? '' : cardStatus.APPROVED,
                );
                setVisibleFilter(false);
              }}
            >
              Approved
            </div>
            <div
              className={clsx(
                'cursor-pointer rounded p-3 capitalize hover:bg-white/20 hover:text-pink-500',
                {
                  'bg-white/20 text-pink-500': value == cardStatus.REJECTED,
                },
              )}
              onClick={() => {
                setValue(
                  value == cardStatus.REJECTED ? '' : cardStatus.REJECTED,
                );
                setVisibleFilter(false);
              }}
            >
              Rejected
            </div>
          </div>
        )}
        onClickOutside={() => setVisibleFilter(false)}
      >
        <div
          className={clsx(
            'flex w-full cursor-pointer items-start rounded-lg border bg-transparent p-4 text-base  capitalize outline-none transition-all focus:border-primary',
            {
              'border-primary text-white': value != '',
              'border-slate-700 text-gray-400': value == '',
            },
          )}
          onClick={() => setVisibleFilter(!visibleFilter)}
        >
          {value || 'Select Status'}
        </div>
      </Tippy>
    </div>
  );
};

export default Status;
