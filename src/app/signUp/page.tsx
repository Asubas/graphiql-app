'use client';

import React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth } from '../../utils/auth';
import { db } from '../../utils/firestore';
import { toast } from 'react-toastify';
import { FirebaseError } from 'firebase/app';
import AuthForm from '@/src/components/AuthForm/AuthForm';

const SignUp: React.FC = () => {
  const handleSignUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
      });

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
