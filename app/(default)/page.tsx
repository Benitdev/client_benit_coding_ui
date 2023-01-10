import Banner from '@/components/fragments/Banner';
import HomeCard from '@/components/fragments/HomeCard';
import cardApi from 'api/cardApi';

type Props = {};

const page = async (props: Props) => {
  const { filterList } = await cardApi.getFilter();
  return (
    <div>
      <Banner />
      <HomeCard filterList={filterList} />
      <div className="h-screen"></div>
    </div>
  );
};

export default page;
