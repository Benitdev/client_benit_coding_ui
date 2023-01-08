import axiosClient from './axiosClient';

const filterApi = {
  addFilter: (body: any) => axiosClient.post('/filter/add-filter', body),
};

export default filterApi;
