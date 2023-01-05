'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const FilterMenu = ({ setFilter, filterList }: any) => {
  const [activeCard, setActiveCard] = useState('all');
  console.log('cc');
  return (
    <div
      className="hidden-scroll scrollbar-style mb-10 flex gap-x-7 overflow-x-auto whitespace-nowrap border-b border-b-slate-800 text-xl font-bold"
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
