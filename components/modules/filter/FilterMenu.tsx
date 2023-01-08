'use client';

import InputCard from '@/components/common/input/InputCard';
import { motion } from 'framer-motion';
import { useState } from 'react';

const FilterMenu = ({ setFilter, filterList, setTitle }: any) => {
  const [activeCard, setActiveCard] = useState('all');
  return (
    <div className="mb-10 flex items-center justify-between border-b border-b-slate-800 ">
      <div
        className="hidden-scroll scrollbar-style flex gap-x-7 overflow-x-auto whitespace-nowrap text-xl font-bold"
        aria-label="tab-v4"
      >
        <FilterItem
          item={{
            filter_name: 'all',
          }}
          onClick={() => {
            setActiveCard('all');
            setFilter({});
          }}
          activeCard={activeCard === 'all'}
        ></FilterItem>
        {filterList.map((item: any) => (
          <FilterItem
            key={item.id}
            onClick={() => {
              setActiveCard(item.filter_name);
              setFilter(item);
            }}
            activeCard={activeCard === item.filter_name}
            item={item}
          ></FilterItem>
        ))}
      </div>
      <div>
        <InputCard
          name="filter"
          placeholder="Search by title"
          className="!p-2"
          onChange={(e: any) => setTitle(e.target.value)}
        ></InputCard>
      </div>
    </div>
  );
};

function FilterItem({ item, activeCard, onClick }: any) {
  return (
    <button
      // key={item}
      className={`relative flex items-center py-3 text-sm font-medium capitalize lg:text-base ${
        activeCard
          ? 'bg-gradient-primary pointer-events-none bg-clip-text text-transparent'
          : 'text-slate-300'
      }`}
      onClick={onClick}
    >
      {item.filter_name}
      {activeCard && (
        <motion.span
          layoutId="filter-menu-underline"
          className="bg-gradient-primary absolute bottom-0 left-0 right-0 h-1 rounded-xl"
        ></motion.span>
      )}
    </button>
  );
}

export default FilterMenu;
