'use client';

import ButtonAction from '@/components/common/button/ButtonAction';
import { IconEdit, IconTrash } from '@/components/common/icons';
import IconQuestion from '@/components/common/icons/IconQuestion';
import LabelStatus from '@/components/common/label/LabelStatus';
import { cardStatus, userRole } from 'constant/global-constant';
import useAuth from 'hooks/useAuth';
import Link from 'next/link';

const CardRow = ({ card }: any) => {
  const user: any = {};
  const renderStatus = (status: number) => {
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
    <tr>
      {/* <td>
          <Checkbox></Checkbox>
        </td> */}
      <td>
        <Link href={`/manage/update-card?id=${card.id}`} className="text-white">
          {card.title}
        </Link>
      </td>
      <td className="capitalize">{card.filter}</td>
      <td>{renderStatus(card.status)}</td>
      <td>{new Date(card.created_at).toLocaleDateString('vi-VI')}</td>
      <td>
        <div className="flex flex-col gap-1">
          <p>{card.userFullname || 'Admin'}</p>
          <p className="text-sm text-slate-500">{card.userEmailAddress}</p>
        </div>
      </td>
      <td>
        <div className="flex items-center gap-x-5">
          <ButtonAction
            className="hover:border-slate-400text-slate-400 hover:text-slate-400"
            // onClick={() => handleShowReason(card.reason || '')}
          >
            <IconQuestion />
          </ButtonAction>
          <Link href={`/manage/update-card?id=${card.id}`}>
            <ButtonAction className="hover:border-blue-500 hover:text-blue-500">
              <IconEdit></IconEdit>
            </ButtonAction>
          </Link>

          {user?.role === userRole.ADMIN && (
            <ButtonAction
              className="hover:border-red-500 hover:text-red-500"
              //   onClick={() => handleDeleteCard(card.id)}
            >
              <IconTrash></IconTrash>
            </ButtonAction>
          )}
        </div>
      </td>
    </tr>
  );
};

export default CardRow;
