import { useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  AuthError,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/src/utils/auth';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/src/utils/firestore';
import { toast } from 'react-toastify';
import { FirebaseError } from 'firebase/app';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [tokenExpirationTime, setTokenExpirationTime] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log(idTokenResult);
        const expirationTime = new Date(idTokenResult.expirationTime).getTime();

        setTokenExpirationTime(expirationTime);

        const timeUntilExpiration = expirationTime - new Date().getTime();
        setTimeout(() => {
          handleTokenExpiration();
        }, timeUntilExpiration);

        router.push('/');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleTokenExpiration = () => {
    toast.info('Your session has expired. You will be redirected to the main page.');
    router.push('/');
  };

  const signUp = async (email: string, password: string, username?: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        email: user.email,
        displayName: username,
        createdAt: new Date(),
      });

      toast.success('User is successfully created!');
      router.push('/');
    } catch (error) {
      const firebaseError = error as AuthError;
      if (firebaseError) {
        if (firebaseError.code === 'auth/email-already-in-use') {
          toast.error('User with this email is already registered.');
        } else if (firebaseError.code === 'auth/invalid-email') {
          toast.error('Invalid email address.');
        } else {
          toast.error('An unexpected error occurred. Please try again.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        const expirationTime = new Date(idTokenResult.expirationTime).getTime();

        setTokenExpirationTime(expirationTime);

        const timeUntilExpiration = expirationTime - new Date().getTime();
        setTimeout(() => {
          handleTokenExpiration();
        }, timeUntilExpiration);
      }

      router.push('/');
      toast.success('You are successfully logged in');
    } catch (error) {
      const firebaseError = error as FirebaseError;
      if (firebaseError) {
        if (firebaseError.code === 'auth/invalid-credential') {
          toast.error(
            'User with these credentials does not exist. Please check the email and password.',
          );
        } else if (firebaseError.code === 'auth/too-many-requests') {
          toast.error('Too many requests at the same time. Please try later.');
        }
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, signUp, signIn };
}
