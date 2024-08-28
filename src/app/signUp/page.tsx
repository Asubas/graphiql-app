'use client';

import React from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth } from '../../utils/auth';
import { db } from '../../utils/firestore';
import { toast } from 'react-toastify';
import { FirebaseError } from 'firebase/app';
import AuthForm from '@/src/components/AuthForm/AuthForm';
import { useRouter } from 'next/navigation';

const SignUp: React.FC = () => {
  const router = useRouter();

  const handleSignUp = async (email: string, password: string, username: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
      });

      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        email: user.email,
        displayedName: username,
        createdAt: new Date(),
      });

      router.push('/');
      toast.success('User is successfully created!');
    } catch (error) {
      const firebaseError = error as FirebaseError;
      if (firebaseError) {
        if (firebaseError.code === 'auth/email-already-in-use') {
          toast.error('User with this email is already registered.');
        } else if (firebaseError.code === 'auth/invalid-email') {
          toast.error('Invalid email address.');
        }
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return <AuthForm title="Sign Up" onSubmit={handleSignUp} />;
};

export default SignUp;
