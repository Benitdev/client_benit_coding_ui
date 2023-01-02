import ButtonAddNew from '@/components/common/button/ButtonAddNew';
import ButtonBack from '@/components/common/button/ButtonBack';
import DashboardHeader from '@/components/fragments/DashboardHeader';
import CardAddNew from '@/components/modules/card/CardAddNew';
import CardRow from '@/components/modules/card/CardRow';
import { useQuery } from '@tanstack/react-query';
import cardApi from 'api/cardApi';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import CardManage from '@/components/modules/card/CardManage';

type Props = any;

const page = (props: Props) => {
  const { user } = props.params;
  return (
    <div className="relative flex flex-col p-5 lg:p-10" aria-label="main">
      <DashboardHeader user={user} />
      <CardManage user={user} />
    </div>
  );
};

export default page;
