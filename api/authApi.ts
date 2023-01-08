import axios from 'axios';
import { LoginForm } from 'types';
import axiosClient from './axiosClient';

const authApi = {
  login: (body: LoginForm) => axiosClient.post('auth/login', body),
  loginSocial: (provider: string, code: string) =>
    axios.get(`http://localhost:8000/auth/callback/${provider}`, {
      params: {
        code,
      },
    }),
  register: (body: any) => axiosClient.post('auth/register', body),
  logout: () => axiosClient.post('auth/logout'),
  verifyToken: (token: string) => {
    return axios.post(
      'http://localhost:8000/api/auth/verify-token',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      },
    );
  },
};

export default authApi;
