import { cookies } from 'next/headers';
import authUtils from 'utils/checkAuth';

const useAuth = () => {
  const nextCookies = cookies();
  const cookie = nextCookies.get('ACCESS_TOKEN');
  return authUtils.isAuthenticated(cookie?.value);
};

export default useAuth;
