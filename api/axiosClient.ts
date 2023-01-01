import axios from 'axios';
import { getCookie } from 'cookies-next';

const baseUrl = 'http://127.0.0.1:8000/api/';
const getToken = () => getCookie('ACCESS_TOKEN');
const axiosClient = axios.create({
  baseURL: baseUrl,
});
axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${getToken()}`,
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) {
      return alert(err);
    }
    throw err.response;
  },
);

export default axiosClient;
