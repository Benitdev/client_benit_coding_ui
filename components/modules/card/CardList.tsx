'use client';

import Button from '@/components/common/button/Button';
import CardLoading from '@/components/common/Skeleton/CardLoading';
import Card from '@/components/fragments/Card';
import useDebounce from '@/hooks/useDebounce';
import { fetchSubCategory } from '@/lib/getCategories';
import { useInfiniteQuery } from '@tanstack/react-query';
import cardApi from 'api/cardApi';
import { cardStatus } from 'constant/global-constant';
import React, { useState } from 'react';
import FilterMenu from '../filter/FilterMenu';

const CardList = ({ filter, title }: any) => {
  const [status, setStatus] = useState('');
  // const nameDebounce = useDebounce(name, 500);
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['cards', { title: title, filter_id: filter.id, status }],
      queryFn: cardApi.getHomeCard,
      getNextPageParam: (lastPage, pages) => lastPage.cards.next_cursor,
      keepPreviousData: true,
    });
  return (
    <div>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, index) => <CardLoading key={index}></CardLoading>)
          : data?.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.cards.data.map((card: any) => (
                  <Card
                    key={card.id}
                    title={card.title}
                    htmlCode={card.html_code}
                    cssCode={card.css_code}
                    jsCode={card.js_code}
                    author={card.credit}
                  ></Card>
                ))}
              </React.Fragment>
            ))}
      </div>
      <Button
        isLoading={isLoading}
        className="button-effect bg-gradient-primary mx-auto mt-10 w-[200px]"
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={fetchNextPage}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Load More'
          : 'Nothing more to load'}
      </Button>
    </div>
  );
};

export default CardList;
