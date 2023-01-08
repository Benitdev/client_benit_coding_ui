'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Tippy from '@tippyjs/react/headless';
import cardApi from 'api/cardApi';
import clsx from 'clsx';

type Props = {};
const CardFilter = ({ value, setValue }: any) => {
  const [visibleFilter, setVisibleFilter] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ['filter'],
    queryFn: cardApi.getFilter,
  });
  value.filter_name =
    value.filter_name === undefined ? 'Select Filter' : value.filter_name;
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
            {isLoading && (
              <div className="border-white-500 h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"></div>
            )}
            {data?.filterList.map((item: any) => (
              <div
                key={item.id}
                className={clsx(
                  'cursor-pointer rounded p-3 capitalize hover:bg-white/20 hover:text-pink-500',
                  {
                    'bg-white/20 text-pink-500': item.id == value.id,
                  },
                )}
                onClick={() => {
                  setVisibleFilter(false);
                  setValue(item);
                }}
              >
                {item.filter_name}
              </div>
            ))}
          </div>
        )}
        onClickOutside={() => setVisibleFilter(false)}
      >
        <div
          className={clsx(
            'flex w-full cursor-pointer items-start rounded-lg border bg-transparent p-4 text-base  capitalize outline-none transition-all focus:border-primary',
            {
              'border-primary text-white': value.filter_name != 'Select Filter',
              'border-slate-700 text-gray-400':
                value.filter_name == 'Select Filter',
            },
          )}
          onClick={() => setVisibleFilter(!visibleFilter)}
        >
          {value.filter_name}
        </div>
      </Tippy>
    </div>
  );
};

export default CardFilter;
