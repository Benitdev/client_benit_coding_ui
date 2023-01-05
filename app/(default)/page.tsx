import Banner from '@/components/fragments/Banner';
import HomeCard from '@/components/fragments/HomeCard';
import CardList from '@/components/modules/card/CardList';
import FilterMenu from '@/components/modules/filter/FilterMenu';
import cardApi from 'api/cardApi';

type Props = {};

const page = async (props: Props) => {
  const { filterList } = await cardApi.getFilter();
  return (
    <div className="">
      <Banner />
      <HomeCard filterList={filterList} />
      <div className="h-screen"></div>
    </div>
  );
};

export default page;
