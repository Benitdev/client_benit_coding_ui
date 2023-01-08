'use client';

import ButtonAddNew from '@/components/common/button/ButtonAddNew';
import { SkeletonCard } from '@/components/common/Skeleton/SkeletonCard';
import CardAddNew from '@/components/modules/card/CardAddNew';
import CardRow from '@/components/modules/card/CardRow';
import { useQuery } from '@tanstack/react-query';
import cardApi from 'api/cardApi';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import Input from '@/components/common/input/Input';
import InputCard from '@/components/common/input/InputCard';
import Button from '@/components/common/button/Button';
import { useDebounce } from 'hooks';
import CardFilter from '@/components/common/dropdown/CardFilter';
import Status from '@/components/common/dropdown/Status';

type Props = any;

const CardManage = ({ user }: Props) => {
  const [filter, setFilter] = useState<any>({});
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState<number>(1);
  const nameDebounce = useDebounce(name, 500);

  const [isShowAddNew, setIsShowAddNew] = useState<boolean>(false);
  const [cardEditting, setCardEditting] = useState(null);
  const { data, isLoading } = useQuery({
    queryKey: [
      'cards',
      {
        page,
        title: nameDebounce,
        filter_id: filter.id,
        status,
        user_id: user.role == 'USER' ? user.id : null,
      },
    ],
    queryFn: cardApi.getCardList,
    keepPreviousData: true,
  });
  const handleFilterByTitle = (e: any) => {
    setName(e.target.value);
  };
  const resetSearch = () => {
    setName('');
    setStatus('');
    setFilter({});
  };
  const pageLength = data?.cards.last_page > 5 ? 5 : data?.cards.last_page;
  return (
    <>
      <div className="flex items-center justify-between pl-4">
        <span className="font-bold text-gray-400">Role: {user.role}</span>
        <div className="mb-10 grid grid-cols-1 flex-wrap gap-5 lg:flex lg:justify-end">
          <div className="w-full lg:w-[200px]">
            <InputCard
              name="filter"
              placeholder="Search by title"
              onChange={handleFilterByTitle}
            ></InputCard>
          </div>
          <div className="w-full lg:w-[200px]">
            <CardFilter value={filter} setValue={setFilter} />
          </div>
          <div className="w-full lg:w-[200px]">
            <Status value={status} setValue={setStatus} />
          </div>
          <Button
            onClick={resetSearch}
            className="button-effect h-full w-full !bg-slate-900 p-2 lg:w-auto"
          >
            Clear filter
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <div className="relative h-full rounded-xl bg-black/70 px-4 py-3">
          <div className="table">
            <ul>
              <li className="col-span-2">Title</li>
              <li>Filter</li>
              <li>Status</li>
              <li className="">Updated at</li>
              <li className="col-span-2">Author</li>
              <li className="col-span-2">Preview</li>
              <li className="col-span-2 !text-center">Actions</li>
            </ul>

            <div className="space-y-3">
              {isLoading ? (
                Array(3)
                  .fill(0)
                  .map((_, index: any) => (
                    <SkeletonCard
                      key={index}
                      type={'card-row'}
                      className="h-[174px]"
                    />
                  ))
              ) : (
                <>
                  {data?.cards.data.length === 0 && (
                    <div>
                      <span>No data</span>
                    </div>
                  )}
                  {data?.cards.data.length > 0 &&
                    data?.cards.data.map((card: any) => (
                      <CardRow
                        key={card.id}
                        card={card}
                        role={user.role}
                        setIsShowAddNew={setIsShowAddNew}
                        setCardEditting={setCardEditting}
                      ></CardRow>
                    ))}
                </>
              )}
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-xl bg-black/70 px-3 py-1">
            <div className="flex items-center gap-2 text-gray-400">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className={clsx('h-4 w-4', {
                    'text-white': page !== 1,
                  })}
                />
              </button>
              {page > 4 ? (
                <>
                  <button onClick={() => setPage(1)}>1</button>
                  <span>...</span>
                </>
              ) : null}
              {Array.from({ length: 5 }, (_, index: any) => {
                const pageIndex = page - 2 + index;

                if (pageIndex > 0 && pageIndex <= pageLength)
                  return (
                    <button
                      className={clsx({
                        'text-white underline': pageIndex == page,
                      })}
                      key={index}
                      onClick={() => setPage(pageIndex)}
                    >
                      {pageIndex}
                    </button>
                  );
              })}
              {page < pageLength - 3 ? (
                <>
                  <span>...</span>
                  <button onClick={() => setPage(pageLength)}>
                    {pageLength}
                  </button>
                </>
              ) : null}
              <button
                disabled={page === pageLength}
                onClick={() => setPage(page + 1)}
              >
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className={clsx('h-4 w-4', {
                    'text-white': page !== pageLength,
                  })}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ButtonAddNew
        handleOnClick={() => {
          setIsShowAddNew(true);
          setCardEditting(null);
        }}
      />
      <AnimatePresence>
        {isShowAddNew ? (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-xl"
          >
            <CardAddNew
              setIsShowAddNew={setIsShowAddNew}
              user={user}
              card={cardEditting}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default CardManage;
