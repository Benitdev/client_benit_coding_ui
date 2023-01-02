'use client';

import ButtonAddNew from '@/components/common/button/ButtonAddNew';
import { SkeletonCard } from '@/components/common/Skeleton/SkeletonCard';
import CardAddNew from '@/components/modules/card/CardAddNew';
import CardRow from '@/components/modules/card/CardRow';
import { useQuery } from '@tanstack/react-query';
import cardApi from 'api/cardApi';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

type Props = any;

const page = ({ user }: Props) => {
  const [isShowAddNew, setIsShowAddNew] = useState<boolean>(false);
  const handleOnClick = () => {
    setIsShowAddNew(!isShowAddNew);
  };
  const { data, isLoading } = useQuery({
    queryKey: ['cards'],
    queryFn: cardApi.getCard,
  });
  console.log(data);
  return (
    <>
      <div className="flex-1">
        <div className="h-full rounded-xl bg-gray-900/70 px-4 py-3">
          {/* <SkeletonCard type={'card-row'} className="h-16" /> */}

          {isLoading ? (
            <div className="space-y-6 ">
              {Array.from({ length: 6 }, (_, index: any) => (
                <SkeletonCard key={index} type={'card-row'} className="h-16" />
              ))}
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Filter</th>
                  <th>Status</th>
                  <th>CreatedAt</th>
                  <th>Author</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {data?.cards.length === 0 && (
                  <tr>
                    <td colSpan={7}>No data</td>
                  </tr>
                )}
                {data?.cards.length > 0 &&
                  data?.cards.map((card: any) => (
                    <CardRow key={card.id} card={card}></CardRow>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <ButtonAddNew handleOnClick={handleOnClick} />
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
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <CardAddNew setIsShowAddNew={setIsShowAddNew} user={user} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default page;
