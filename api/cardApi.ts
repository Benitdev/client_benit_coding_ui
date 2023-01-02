import axiosClient from './axiosClient';

const cardApi = {
  getCard: () => axiosClient.get('/cards') as any,
  addCard: (body: any) => axiosClient.post('/cards/add-card', body),
};

export default cardApi;
