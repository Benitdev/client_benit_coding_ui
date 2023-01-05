import DashboardHeader from '@/components/fragments/DashboardHeader';
import CardManage from '@/components/modules/card/CardManage';
import useAuth from 'hooks/useAuth';

type Props = any;

const page = async (props: Props) => {
  const user = await useAuth();
  return (
    <div className="relative flex flex-col p-5 lg:p-10" aria-label="main">
      <DashboardHeader user={user} />
      <CardManage user={user} />
    </div>
  );
};

export default page;
