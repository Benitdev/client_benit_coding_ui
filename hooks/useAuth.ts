import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import authUtils from 'utils/checkAuth';

const useAuth = () => {
  const nextCookies = cookies();
  const token =
    nextCookies.get('ACCESS_TOKEN')?.value ??
    (getCookie('ACCESS_TOKEN') as string);
  return authUtils.isAuthenticated(token);
};

export default useAuth;
