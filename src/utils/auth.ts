import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import app from './firebaseConfig';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    return user;
  } catch (err) {
    if (err instanceof Error) {
      alert(err.message);
    } else {
      alert(`Unexpected error:${err}`);
    }
  }
};

export {
  auth,
  signInWithGoogle,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
};
