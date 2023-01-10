'use client';

import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import Swal from 'sweetalert2';

import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

import ButtonAction from '@/components/common/button/ButtonAction';
import { IconEdit, IconTrash } from '@/components/common/icons';
import IconQuestion from '@/components/common/icons/IconQuestion';
import LabelStatus from '@/components/common/label/LabelStatus';
import { cardStatus, userRole } from 'constant/global-constant';
import useAuth from 'hooks/useAuth';
import CardPreview from './CardPreview';
import cardApi from 'api/cardApi';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import ModalReject from '@/components/common/modal/ModalReject';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const CardRow = ({ card, setIsShowAddNew, setCardEditting, role }: any) => {
  const queryClient = useQueryClient();
  const [toggleReasonModal, setToggleReasonModal] = useState<boolean>(false);
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
  const handleDeleteCard = async (id: string) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        background: '#0f182c',
        color: '#fff',
        iconColor: '#d64930',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await cardApi.deleteCardById(id);
          queryClient.invalidateQueries({ queryKey: ['cards'] });
          toast.success('Delete card successfully');
        }
      });
    } catch (e) {
      console.log(e);
      toast.error('Delete card failed!!!');
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
          <p>
            {card.credit}{' '}
            <small className="capitalize text-slate-400">({role})</small>
          </p>
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
            onClick={() => setToggleReasonModal(true)}
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

          {role === userRole.ADMIN && (
            <ButtonAction
              className="hover:border-red-500 hover:text-red-500"
              onClick={() => handleDeleteCard(card.id)}
            >
              <IconTrash></IconTrash>
            </ButtonAction>
          )}
        </div>
      </div>
      {toggleReasonModal && (
        <ModalReject
          setToggleReasonModal={setToggleReasonModal}
          cardId={card.id}
          status={card.status}
        />
      )}
    </div>
  );
};

export default CardRow;
