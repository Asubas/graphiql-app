'use client';

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/auth';
import { toast } from 'react-toastify';
import { FirebaseError } from 'firebase/app';
import AuthForm from '@/src/components/AuthForm/AuthForm';
import { useRouter } from 'next/navigation';
import Loader from '@/src/components/Loader/Loader';

const SignIn: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
      toast.success('You are successfully logged in');
    } catch (error) {
      const firebaseError = error as FirebaseError;
      if (firebaseError) {
        if (firebaseError.code === 'auth/invalid-credential') {
          toast.error(
            'User with this credentials is not exist. Please check the email and password.',
          );
        } else if (firebaseError.code === 'auth/too-many-requests') {
          toast.error('Too many requests at the same time. Please try later.');
        }
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <AuthForm title="Sign In" onSubmit={handleSignIn} />
    </>
  );
};

export default SignIn;
