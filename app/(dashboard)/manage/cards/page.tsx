'use client';

import ButtonAddNew from '@/components/common/button/ButtonAddNew';
import ButtonBack from '@/components/common/button/ButtonBack';
import CardAddNew from '@/components/modules/card/CardAddNew';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

type Props = {};

const page = (props: Props) => {
  const [isShowAddNew, setIsShowAddNew] = useState<boolean>(false);
  const handleOnClick = () => {
    setIsShowAddNew(!isShowAddNew);
  };
  const back = '';
  return (
    <div className="relative p-5 lg:p-10" aria-label="main">
      <div className="mb-10 flex flex-col items-start gap-5">
        {back && <ButtonBack href={back} />}
        <h1 className="inline-flex items-center gap-x-3 text-4xl font-bold tracking-wider text-white">
          <span>Add new Card UI</span>
        </h1>
      </div>
      <div></div>
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
            className="fixed inset-0 flex items-center justify-center bg-black/50"
          >
            <CardAddNew setIsShowAddNew={setIsShowAddNew} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default page;
