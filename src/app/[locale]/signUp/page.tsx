'use client';

import React from 'react';
import AuthForm from '@/src/components/AuthForm/AuthForm';
import Loader from '@/src/components/Loader/Loader';
import { useAuth } from '@/src/hooks/useAuthRedirect';
import { useTranslations } from 'next-intl';

const SignUp: React.FC = () => {
  const { loading, signUp } = useAuth();
  const t = useTranslations('SignUp');

  const handleSignUp = async (email: string, password: string, username?: string) => {
    await signUp(email, password, username);
  };

  return (
    <>
      {loading && <Loader />}
      <AuthForm title={t('title')} onSubmit={handleSignUp} />
    </>
  );
};

export default SignUp;
