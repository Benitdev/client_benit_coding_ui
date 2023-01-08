import { useQueryClient } from '@tanstack/react-query';
import cardApi from 'api/cardApi';
import clsx from 'clsx';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../button/Button';
import Label from '../label/Label';
import ModalClose from './ModalClose';

const ModalReject = ({ setToggleReasonModal, cardId, status }: any) => {
  const reason = false;
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const handleApproved = async () => {
    try {
      setLoading(true);
      const res = await cardApi.editCard({ status: 'approved' }, cardId);
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      setLoading(false);
      toast.success('Thêm Card Thành Công!');
    } catch (e) {
      toast.error('Gặp vấn đề gì đó ~~');
      setLoading(false);
    }
  };
  const handleRejected = async () => {
    try {
      setLoading(true);
      const res = await cardApi.editCard({ status: 'rejected' }, cardId);
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      setLoading(false);
      toast.success('Từ Chối Thành Công!');
    } catch (e) {
      toast.error('Gặp vấn đề gì đó ~~');
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-[99] bg-black/60">
      <div className="scrollbar-style relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-slate-900 p-5">
        <ModalClose onClick={() => setToggleReasonModal(false)}></ModalClose>
        <div className="mb-5 flex flex-col gap-y-3">
          <Label className="text-xl">Reason:</Label>
          <p
            className={clsx(
              'rounded-lg border border-slate-600 px-4 py-2 text-sm leading-normal tracking-normal',
              reason ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500',
            )}
          >
            {reason || 'Good job 👍'}
          </p>
          <div className="flex items-center justify-center gap-4">
            {status == 'pending' && (
              <>
                <Button
                  isLoading={loading}
                  className="bg-red-500"
                  onClick={handleRejected}
                >
                  Từ chối
                </Button>
                <Button
                  isLoading={loading}
                  className="bg-green-500"
                  onClick={handleApproved}
                >
                  Phê duyệt
                </Button>
              </>
            )}
            {status == 'rejected' && (
              <Button
                isLoading={loading}
                className="bg-green-500"
                onClick={handleApproved}
              >
                Phê duyệt
              </Button>
            )}
            {status == 'approved' && (
              <Button
                isLoading={loading}
                className="bg-red-500"
                onClick={handleRejected}
              >
                Từ chối
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalReject;
