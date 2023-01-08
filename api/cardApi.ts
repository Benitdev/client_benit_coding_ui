import axiosClient from './axiosClient';

const cardApi = {
  getCardList: ({ queryKey }: any) => {
    const [_, { page, ...queryParams }] = queryKey;
    for (const property in queryParams) {
      if (!queryParams[property]) delete queryParams[property];
    }
    return axiosClient.get('/cards', {
      params: {
        page,
        ...queryParams,
      },
    }) as any;
  },
  getHomeCard: ({ queryKey, pageParam }: any) => {
    const [_, queryParams] = queryKey;
    for (const property in queryParams) {
      if (!queryParams[property]) delete queryParams[property];
    }
    return axiosClient.get('/cards/home-card', {
      params: {
        cursor: pageParam,
        ...queryParams,
      },
    }) as any;
  },
  addCard: (body: any) => axiosClient.post('/cards/add-card', body),
  editCard: (body: any, id: string) =>
    axiosClient.put(`/cards/edit-card/${id}`, body),
  getCardById: ({ queryKey }: any) => {
    const [_, id] = queryKey;
    return axiosClient.get(`/cards/${id}`) as any;
  },
  deleteCardById: (id: string) =>
    axiosClient.delete('/cards/delete-card/' + id),
  getFilter: () => axiosClient.get('/filter') as any,
};

export default cardApi;
