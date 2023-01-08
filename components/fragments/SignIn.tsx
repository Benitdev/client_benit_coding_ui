'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';

// import { getProviders, signIn } from 'next-auth/react'

import LoginForm from '../common/form/LoginForm';

import clsx from 'clsx';
import RegisterForm from '../common/form/RegisterForm';
import { useRouter } from 'next/navigation';

const SignIn = ({ error }: any) => {
  const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
  const router = useRouter();
  const [providers, setProviders] = useState<any>();
  useEffect(() => {
    // getProviders().then((providers) => setProviders(providers))
  }, []);
  return (
    <div className="relative mx-auto flex min-h-[500px] w-[400px] flex-col overflow-hidden rounded-xl bg-gray-900/20 shadow-xl shadow-primary/20 backdrop-blur-sm md:w-[450px]">
      <div className="flex items-center justify-center py-4 text-white">
        <button
          className={clsx('relative py-2 px-4 font-bold', {
            'text-primary': showLoginForm,
          })}
          onClick={() => setShowLoginForm(true)}
        >
          {' '}
          Đăng Nhập{' '}
          <AnimatePresence>
            {showLoginForm && (
              <motion.span
                className="absolute bottom-0 right-0 h-2 rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                exit={{ width: 0 }}
                transition={{
                  ease: 'linear',
                }}
              ></motion.span>
            )}
          </AnimatePresence>
        </button>
        <span className="mx-1 block h-8 w-[1px] bg-primary" />
        <button
          className={clsx('relative py-2 px-4 font-bold', {
            'text-primary': !showLoginForm,
          })}
          onClick={() => setShowLoginForm(false)}
        >
          {' '}
          Đăng Ký
          <AnimatePresence>
            {!showLoginForm && (
              <motion.span
                className="absolute bottom-0 left-0 h-2 rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                exit={{ width: 0 }}
                transition={{
                  ease: 'linear',
                }}
              ></motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
      {/* main */}
      <div className="flex flex-1 flex-col justify-between pb-8">
        {/* signin with credential */}
        {showLoginForm ? (
          <>
            <LoginForm error={error} />
            {/* signin with social */}
          </>
        ) : (
          <RegisterForm />
        )}
        <div className="flex flex-col items-center gap-4">
          <a
            href="http://localhost:8000/auth/redirect/facebook"
            className="button-effect flex h-14 w-[300px] items-center justify-center rounded-xl bg-sky-600 font-bold"
          >
            Facebook
          </a>
          <a
            href="http://localhost:8000/auth/redirect/google"
            className="button-effect flex h-14 w-[300px] items-center justify-center rounded-xl bg-pink-600 font-bold"
          >
            Gmail
          </a>
          <a
            href="http://localhost:8000/auth/redirect/github"
            className="button-effect flex h-14 w-[300px] items-center justify-center rounded-xl bg-black font-bold"
          >
            Github
          </a>
        </div>
      </div>
      {/* end main  */}
    </div>
  );
};

export default SignIn;
