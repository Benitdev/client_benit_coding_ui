'use client';

import { useState } from 'react';
import CardList from '../modules/card/CardList';
import FilterMenu from '../modules/filter/FilterMenu';

type Props = {};

const HomeCard = ({ filterList }: any) => {
  const [filter, setFilter] = useState<any>({});
  return (
    <div className="container mx-auto rounded-xl bg-black/60 p-4 px-8 pb-10 shadow-lg outline outline-primary/60">
      <FilterMenu setFilter={setFilter} filterList={filterList} />
      <CardList filter={filter} />
    </div>
  );
};

export default HomeCard;
