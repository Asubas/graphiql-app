'use client';

import React from 'react';
import AuthForm from '@/src/components/AuthForm/AuthForm';
import Loader from '@/src/components/Loader/Loader';
import { useAuth } from '@/src/hooks/useAuthRedirect';
import { useTranslations } from 'next-intl';

const SignIn: React.FC = () => {
  const { loading, signIn } = useAuth();
  const t = useTranslations('SignIn');

  const handleSignIn = async (email: string, password: string) => {
    await signIn(email, password);
  };

  return (
    <>
      {loading && <Loader />}
      <AuthForm title={t('title')} onSubmit={handleSignIn} />
    </>
  );
};

export default SignIn;
