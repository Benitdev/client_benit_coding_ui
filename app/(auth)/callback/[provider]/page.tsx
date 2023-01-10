'use client';

import PageLoading from '@/components/common/loading/PageLoading';
import authApi from 'api/authApi';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const page = ({ searchParams, params: { provider } }: any) => {
  console.log({ searchParams, provider });
  const router = useRouter();
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res: any = await authApi.loginSocial(provider, searchParams.code);
        setCookie('ACCESS_TOKEN', res.data.access_token);
        router.push('/');
      } catch (e) {
        console.log(e);
      }
    };
    fetchToken();
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-10 bg-black/20">
      <PageLoading />
      <div className="ml-10">
        <h1 className="text-xl font-bold">
          Đang đăng nhập bằng{' '}
          <span
            className={`font-extrabold capitalize ${
              provider == 'facebook'
                ? 'text-cyan-500'
                : provider == 'google'
                ? 'text-pink-500'
                : 'text-white'
            }`}
          >
            {provider}
          </span>
        </h1>
        <h2 className="text-center">Vui lòng chờ giây lát!!!</h2>
      </div>
    </div>
  );
};

export default page;
