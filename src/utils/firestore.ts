import { getFirestore, query, getDocs, collection, where, addDoc } from 'firebase/firestore';
import app from './firebaseConfig';

const db = getFirestore(app);

const addUserToFirestore = async (user: any) => {
  try {
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export { db, addUserToFirestore };
