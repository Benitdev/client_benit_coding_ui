'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Input from '../common/input/Input';
import useDebounce from '../../hooks/useDebounce';
// import { signIn } from 'next-auth/react'

const RegisterForm = () => {
  const [isExistEmail, setIsExistEmail] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const showErrorMsg = (idInput: string) => {
    return errors[idInput]?.type === 'required';
  };

  const [password, passwordConfirm, email] = watch([
    'password',
    'passwordConfirm',
    'email',
  ]);
  const debouncedEmail = useDebounce(email, 500);
  useEffect(() => {
    if (!debouncedEmail?.trim()) return;
    const handleCheckEmail = async () => {
      try {
        const { data } = await axios.post('/api/users/checkEmail', {
          email: debouncedEmail,
        });
        setIsExistEmail(data);
      } catch (e) {
        console.log(e);
      }
    };
    handleCheckEmail();
  }, [debouncedEmail]);

  const onSubmit = async ({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    passwordConfirm,
  }: any) => {
    if (password === passwordConfirm) {
      try {
        const { data } = await axios.post('/api/users/register', {
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
          passwordConfirm,
        });
        /*    await signIn('credentials', {
          redirect: true,
          username: data.user.email,
          password: password,
          callbackUrl: 'http://localhost:3000/',
        }); */
        // dispatch({ type: 'USER_LOGIN', payload: data })
        // Cookies.set('userInfo', data)
        // router.push(redirect || '/')
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-6 py-6"
    >
      <div className="flex w-[350px] justify-between">
        <div className="w-[150px]">
          <Input
            register={register('firstName', {
              required: true,
              maxLength: 20,
            })}
            name="firstName"
            label="First Name"
          />
          {errors.firstName?.type === 'required' && (
            <small className="text-red-600"> H??? l?? b???t bu???c!</small>
          )}
          {errors.firstName?.type === 'maxLength' && (
            <small className="text-red-600"> T??n qu?? d??i!</small>
          )}
        </div>
        <div className="w-[150px]">
          <Input
            register={register('lastName', {
              required: true,
              maxLength: 20,
            })}
            name="lastName"
            label="Last Name"
          />
          {errors.lastName?.type === 'required' && (
            <small className="text-red-600"> T??n l?? b???t bu???c!</small>
          )}
        </div>
      </div>
      <div className="w-[350px]">
        <Input
          register={register('email', {
            required: true,
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          })}
          name="email"
          label="Email"
        />
        {errors.email?.type === 'required' && (
          <small className="text-red-600"> Email l?? b???t bu???c!</small>
        )}
        {errors.email?.type === 'pattern' && (
          <small className="text-red-600"> Email kh??ng h???p l???! </small>
        )}
        {isExistEmail && (
          <small className="text-red-600"> Email ???? t???n t???i!</small>
        )}
      </div>
      <div className="w-[350px]">
        <Input
          register={register('phoneNumber', {
            required: true,
            pattern: /^[0-9]+$/,
          })}
          name="phoneNumber"
          label="Phone Number"
        />
        {errors.phoneNumber?.type === 'required' && (
          <small className="text-red-600"> SDT l?? b???t bu???c!</small>
        )}
        {errors.phoneNumber?.type === 'pattern' && (
          <small className="text-red-600"> SDT kh??ng h???p l???!</small>
        )}
      </div>
      <div className="w-[350px]">
        <Input
          register={register('password', {
            required: true,
            minLength: 6,
            maxLength: 40,
          })}
          name="password"
          label="Password"
          type="password"
        />
        {errors.password?.type === 'required' && (
          <small className="text-red-600"> M???t kh???u l?? b???t bu???c!</small>
        )}
        {errors.password?.type === 'minLength' && (
          <small className="text-red-600"> M???t kh???u qu?? ng???n!</small>
        )}
      </div>
      <div className="w-[350px]">
        <Input
          register={register('passwordConfirm', {
            required: true,
            minLength: 6,
            maxLength: 40,
          })}
          name="passwordConfirm"
          label="Re-enter Password"
          type="password"
        />
        {errors.passwordConfirm?.type === 'required' && (
          <small className="text-red-600"> M???t kh???u l?? b???t bu???c!</small>
        )}
        {password !== passwordConfirm && passwordConfirm !== '' && (
          <small className="text-red-600"> M???t kh???u kh??ng kh???p!</small>
        )}
      </div>
      <button
        type="submit"
        className="button-effect mt-6 h-14 w-40 rounded-xl bg-primary/70 text-slate-200"
      >
        {' '}
        ????ng K??{' '}
      </button>
    </form>
  );
};

export default RegisterForm;
