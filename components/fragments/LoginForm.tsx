'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { setCookie } from 'cookies-next';

import authApi from 'api/authApi';

// import { useAppDispatch } from 'hooks';
// import { setIsLoading, setToggleLogin } from '../../redux/headerSlice'
const LoginForm = ({ error }: any) => {
  const router = useRouter();
  // const useDispatch = useAppDispatch();
  const [emailErr, setEmailErr] = useState('');
  const [passErr, setPassErr] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      let res: any = await authApi.login(data);
      localStorage.setItem('ACCESS_TOKEN', res.authorization.token);
      setCookie('ACCESS_TOKEN', res.authorization.token);
      toast.success('Đăng nhập thành công');
      router.push('/');
    } catch (e: any) {
      if (e.data.message === 'Email does not exist') {
        setEmailErr('Email không tồn tại!');
        setTimeout(() => {
          setEmailErr('');
        }, 3000);
      } else if (e.data.message === 'Password incorrect') {
        setPassErr('Mật khẩu không đúng!');
        setTimeout(() => {
          setPassErr('');
        }, 3000);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 py-6"
    >
      <div className="space-y-6">
        <div className="w-[300px]">
          <div className="relative flex justify-between text-primary">
            <input
              {...register('email', {
                required: true,
                maxLength: 40,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              })}
              className={`peer w-full border-b-2 border-b-gray-400 bg-transparent p-2 text-sm font-bold  placeholder-transparent autofill:!bg-yellow-200  focus:border-b-primary focus:outline-none`}
              placeholder="Email or Phone"
              autoComplete="off"
            />
            <label
              htmlFor="email"
              className="pointer-events-none absolute left-0 -top-3.5 text-sm font-bold transition-all peer-placeholder-shown:top-3
                        peer-placeholder-shown:left-[11px] peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400"
            >
              Email or Phone
            </label>
          </div>
          {errors.email?.type === 'required' && (
            <small className="text-red-600"> Tên đăng nhập là bắt buộc!</small>
          )}
          {errors.email?.type === 'pattern' && (
            <small className="text-red-600"> Email không hợp lệ!</small>
          )}
          {emailErr && <small className="text-red-600"> {emailErr} </small>}
        </div>
        <div className="w-[300px]">
          <div className="relative flex justify-between text-primary">
            <input
              {...register('password', {
                required: true,
                minLength: 6,
                maxLength: 40,
              })}
              className={`peer w-full border-b-2 border-b-gray-400 bg-transparent p-2 text-xl placeholder-transparent focus:border-b-primary focus:outline-none`}
              placeholder="Password"
              type="password"
            />
            <label
              htmlFor="password"
              className="pointer-events-none absolute left-0 -top-3.5 text-sm font-bold transition-all peer-placeholder-shown:top-3
                        peer-placeholder-shown:left-[11px] peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400"
            >
              Password
            </label>
          </div>
          {errors.password?.type === 'required' && (
            <small className="text-red-600"> Mật khẩu là bắt buộc!</small>
          )}
          {errors.password?.type === 'minLength' && (
            <small className="text-red-600"> Mật khẩu quá ngắn!</small>
          )}
          {errors.password?.type === 'maxLength' && (
            <small className="text-red-600"> Mật khẩu quá dài!</small>
          )}
          {passErr && <small className="text-red-600"> {passErr} </small>}
        </div>
      </div>
      <button
        type="submit"
        className="button-effect bg-gradient-primary mt-4 h-14 w-[300px] rounded-xl font-bold text-slate-200 "
      >
        {' '}
        Đăng Nhập{' '}
      </button>
      <div className="flex w-[300px] justify-between text-xs">
        <div className="flex gap-1 text-center ">
          <input type="checkbox" />
          <label htmlFor="">Nhớ mật khẩu</label>
        </div>
        <span className="text-red-600 underline">Quên mật khẩu?</span>
      </div>
      {error && (
        <small className="font-bold italic text-red-500">
          {' '}
          Email này đã được trong một tài khoản khác!
        </small>
      )}
      <div className="flex w-[300px] items-center gap-1 text-gray-500">
        <div className="h-[1px] flex-1 bg-gray-500"></div>
        <small>Hoặc</small>
        <div className="h-[1px] flex-1 bg-gray-500"></div>
      </div>
    </form>
  );
};

export default LoginForm;
