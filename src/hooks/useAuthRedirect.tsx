import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/src/utils/auth';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/src/utils/firestore';
import { toast } from 'react-toastify';
import { FirebaseError } from 'firebase/app';
import { useTranslations } from 'next-intl';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [tokenExpirationTime, setTokenExpirationTime] = useState<number | null>(null);
  const router = useRouter();
  const t = useTranslations('Toasts');

  const handleTokenExpiration = useCallback(() => {
    toast.info('Your session has expired. You will be redirected to the main page.');
    setUser(null);
    document.cookie = 'token=; path=/; max-age=0;';
    router.push('/');
  }, [router]);

  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult();
          const expirationTime = new Date(idTokenResult.expirationTime).getTime();

          setTokenExpirationTime(expirationTime);
          setUser(user);

          const timeUntilExpiration = expirationTime - new Date().getTime();
          setTimeout(() => {
            handleTokenExpiration();
          }, timeUntilExpiration);
        } catch (error) {
          toast.error('Error retrieving token information');
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [handleTokenExpiration, router]);

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
      const idTokenResult = await user.getIdTokenResult();
      const token = idTokenResult.token;
      document.cookie = `token=${token}; path=/; max-age=3600;`;
      localStorage.getItem('history') ? localStorage.removeItem('history') : '';
      router.push('/');
    } catch (error) {
      const firebaseError = error as FirebaseError;
      if (firebaseError) {
        if (firebaseError.code === 'auth/email-already-in-use') {
          toast.error(t('userExists'));
        } else if (firebaseError.code === 'auth/invalid-email') {
          toast.error(t('invalidEmail'));
        } else {
          toast.error(t('unexpectedError'));
        }
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        const expirationTime = new Date(idTokenResult.expirationTime).getTime();
        const token = idTokenResult.token;
        document.cookie = `token=${token}; path=/; max-age=3600;`;
        setTokenExpirationTime(expirationTime);

        const timeUntilExpiration = expirationTime - new Date().getTime();
        setTimeout(() => {
          handleTokenExpiration();
        }, timeUntilExpiration);

        setUser(user);
        toast.success('You are successfully logged in');
      }

      router.push('/');
      toast.success('You are successfully logged in');
    } catch (error) {
      const firebaseError = error as FirebaseError;
      if (firebaseError) {
        if (firebaseError.code === 'auth/invalid-credential') {
          toast.error(t('userDoesNotExist'));
        } else if (firebaseError.code === 'auth/too-many-requests') {
          toast.error(t('manyRequests'));
        }
      } else {
        toast.error(t('unexpectedError'));
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      toast.success('You have successfully logged out.');
      document.cookie = 'token=; path=/; max-age=0;';
      router.push('/');
      location.reload();
    } catch (error) {
      toast.error('Failed to log out. Please try again.');
    }
  };

  return { loading, user, signUp, signIn, signOut };
}
