import authApi from 'api/authApi';

const authUtils = {
  isAuthenticated: async (token: string | undefined) => {
    if (!token) return false;
    try {
      const res: any = await authApi.verifyToken(token);
      return res.data.user;
    } catch {
      return false;
    }
  },
};

export default authUtils;
