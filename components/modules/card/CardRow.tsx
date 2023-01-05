'use client';

import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

import ButtonAction from '@/components/common/button/ButtonAction';
import { IconEdit, IconTrash } from '@/components/common/icons';
import IconQuestion from '@/components/common/icons/IconQuestion';
import LabelStatus from '@/components/common/label/LabelStatus';
import { cardStatus, userRole } from 'constant/global-constant';
import useAuth from 'hooks/useAuth';
import Link from 'next/link';
import CardPreview from './CardPreview';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const CardRow = ({ card, setIsShowAddNew, setCardEditting }: any) => {
  const user: any = {};
  const renderStatus = (status: string) => {
    switch (status) {
      case cardStatus.APPROVED:
        return <LabelStatus className="bg-green-500">Approved</LabelStatus>;
      case cardStatus.PENDING:
        return <LabelStatus className="bg-orange-500">Pending</LabelStatus>;
      default:
        return <LabelStatus className="bg-red-500">Rejected</LabelStatus>;
    }
  };
  const handleDeleteCard = async (id: number) => {
    if (user?.role !== userRole.ADMIN) {
      return;
    }
  };
  /*  const { setIsShowReasonModal, setReason } = globalStore(
    (state) => ({
      setReason: state.setReason,
      isShowReasonModal: state.isShowReasonModal,
      setIsShowReasonModal: state.setIsShowReasonModal,
    }),
    shallow,
  ); */
  /*  const handleShowReason = (reason) => {
    setIsShowReasonModal(true);
    setReason(reason);
  }; */
  return (
    <div className="row-item grid grid-cols-11 rounded-xl bg-gray-900/70">
      {/* <td>
          <Checkbox></Checkbox>
        </td> */}
      <div className="col-span-2 !text-left">{card.title}</div>
      <div className="capitalize">{card.filter_name}</div>
      <div>{renderStatus(card.status)}</div>
      <div>
        {/* {new Date(card.created_at).toLocaleDateString('vi-VI')} */}
        <ReactTimeAgo date={card.created_at} locale="en-US" />
      </div>
      <div className="col-span-2">
        <div className="flex flex-col gap-1">
          <p>{card.userFullname || 'Admin'}</p>
          <p className="text-sm text-slate-500">{card.userEmailAddress}</p>
        </div>
      </div>
      <div className="col-span-2">
        <CardPreview
          htmlCode={card.html_code}
          cssCode={card.css_code}
          jsCode={card.js_code}
          className="h-[150px] w-full border border-slate-200/10"
        />
      </div>
      <div className="col-span-2 flex justify-center">
        <div className="flex items-center gap-x-5">
          <ButtonAction
            className="hover:border-yellow-400 hover:text-yellow-400"
            // onClick={() => handleShowReason(card.reason || '')}
          >
            <IconQuestion />
          </ButtonAction>
          <ButtonAction
            className="hover:border-blue-500 hover:text-blue-500"
            onClick={() => {
              setIsShowAddNew(true);
              setCardEditting(card);
            }}
          >
            <IconEdit></IconEdit>
          </ButtonAction>

          {user?.role !== userRole.ADMIN && (
            <ButtonAction
              className="hover:border-red-500 hover:text-red-500"
              //   onClick={() => handleDeleteCard(card.id)}
            >
              <IconTrash></IconTrash>
            </ButtonAction>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardRow;
