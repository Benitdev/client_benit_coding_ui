import React from 'react';
import ButtonBack from '../common/button/ButtonBack';
import UserInfo from '../common/dropdown/UserInfo';

type Props = {
  back?: string;
  user: any;
};

const DashboardHeader = ({ back, user }: Props) => {
  return (
    <div className="flex items-start justify-between px-10">
      <div className="mb-10 flex flex-col items-start gap-5">
        {back && <ButtonBack href={back} />}
        <h1 className="bg-gradient-secondary inline-flex items-center gap-x-3 bg-clip-text text-4xl font-extrabold capitalize tracking-widest text-transparent">
          Add new Card UI
        </h1>
      </div>
      <div>
        <UserInfo user={user} />
      </div>
    </div>
  );
};

export default DashboardHeader;
