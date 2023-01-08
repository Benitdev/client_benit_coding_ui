import Banner from '@/components/fragments/Banner';
import HomeCard from '@/components/fragments/HomeCard';
import CardList from '@/components/modules/card/CardList';
import FilterMenu from '@/components/modules/filter/FilterMenu';
import cardApi from 'api/cardApi';

/* export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0; */

type Props = {};

const page = async (props: Props) => {
  const { filterList } = await cardApi.getFilter();
  // console.log(filterList);
  return (
    <div>
      <Banner />
      <HomeCard filterList={filterList} />
      <div className="h-screen"></div>
    </div>
  );
};

export default page;
