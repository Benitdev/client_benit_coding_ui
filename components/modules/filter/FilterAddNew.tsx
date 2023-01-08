import Button from '@/components/common/button/Button';
import InputCard from '@/components/common/input/InputCard';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueryClient } from '@tanstack/react-query';
import filterApi from 'api/filterApi';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';

type Props = {};

const FilterAddNew = ({ setIsShowAddNew, userRole }: any) => {
  const ref = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleAddNew = async () => {
    try {
      setLoading(true);
      const res = await filterApi.addFilter({
        filter_name: ref.current?.value,
        status: userRole == 'USER' ? 'pending' : 'approved',
      });
      queryClient.invalidateQueries({ queryKey: ['filter'] });
      setLoading(false);
      toast.success('Thêm Filter Thành Công!');
      setIsShowAddNew(false);
    } catch (e) {
      toast.error('Gặp vấn đề gì đó ~~');
      setLoading(false);
    }
  };
  return (
    <div className="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-slate-900 p-5">
      <FontAwesomeIcon
        icon={faClose}
        className="absolute top-4 right-4 z-10 h-8 w-8 cursor-pointer text-gray-300 hover:text-primary"
        onClick={() => {
          setIsShowAddNew(false);
        }}
      />
      <div className="mt-8">
        <InputCard
          ref={ref}
          name="add-filter-name"
          placeholder="Add filter name"
        ></InputCard>
      </div>
      <Button
        isLoading={loading}
        className="button-effect mx-auto mt-4 bg-primary"
        onClick={handleAddNew}
      >
        Add Filter
      </Button>
    </div>
  );
};

export default FilterAddNew;
