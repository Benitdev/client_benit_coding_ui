'use client';

import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

import ButtonAction from '@/components/common/button/ButtonAction';
import ButtonAddNew from '@/components/common/button/ButtonAddNew';
import { IconEdit, IconTrash } from '@/components/common/icons';
import InputCard from '@/components/common/input/InputCard';
import LabelStatus from '@/components/common/label/LabelStatus';
import { useQuery } from '@tanstack/react-query';
import cardApi from 'api/cardApi';
import { filterStatus } from 'constant/global-constant';
import { AnimatePresence, motion } from 'framer-motion';
import TimeAgo from 'javascript-time-ago';
import { useState } from 'react';
import ReactTimeAgo from 'react-time-ago';
import FilterAddNew from './FilterAddNew';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const FilterManage = ({ user }: any) => {
  const [isShowAddNew, setIsShowAddNew] = useState<boolean>(false);
  const [filterEditting, setFilterEditting] = useState(null);
  const { data, isLoading } = useQuery({
    queryKey: ['filter'],
    queryFn: cardApi.getFilter,
  });
  return (
    <div className="mt-10">
      <div className="table overflow-x-auto rounded-xl bg-black/70 px-4 py-3">
        <table className="w-full border-collapse">
          <thead className="text-xl font-extrabold text-white">
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>CreatedAt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.filterList.map((filter: any) => (
              <FilterRow
                key={filter.id}
                filter={filter}
                role={user.role}
                setIsShowAddNew={setIsShowAddNew}
                setFilterEditting={setFilterEditting}
              ></FilterRow>
            ))}
          </tbody>
        </table>
      </div>
      <ButtonAddNew
        handleOnClick={() => {
          setIsShowAddNew(true);
          setFilterEditting(null);
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
            <FilterAddNew
              setIsShowAddNew={setIsShowAddNew}
              userRole={user.role}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

const FilterRow = ({
  filter,
  role,
  setIsShowAddNew,
  setFilterEditting,
}: any) => {
  const renderStatus = (status: string) => {
    switch (status) {
      case filterStatus.APPROVED:
        return <LabelStatus className="bg-green-500">Approved</LabelStatus>;
      case filterStatus.REJECTED:
        return <LabelStatus className="bg-red-500">Rejected</LabelStatus>;
      default:
        return <LabelStatus className="bg-orange-500">Pending</LabelStatus>;
    }
  };
  const handleDeleteFilter = async (id: number) => {};
  return (
    <tr>
      <td className="capitalize">{filter.filter_name}</td>
      <td>{renderStatus(filter.status)}</td>
      <td>
        <ReactTimeAgo date={filter.created_at} locale="en-US" />
      </td>
      <td>
        <div className="flex items-center gap-x-5">
          <ButtonAction
            className="hover:border-blue-500 hover:text-blue-500"
            onClick={() => {
              setIsShowAddNew(true);
              setFilterEditting(filter);
            }}
          >
            <IconEdit></IconEdit>
          </ButtonAction>
          <ButtonAction
            className="hover:border-red-500 hover:text-red-500"
            onClick={() => handleDeleteFilter(filter.id)}
          >
            <IconTrash></IconTrash>
          </ButtonAction>
        </div>
      </td>
    </tr>
  );
};

export default FilterManage;
