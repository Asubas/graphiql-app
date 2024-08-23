import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { getFirestore, query, getDocs, collection, where, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB8kTL5CaWugn_chBDSV7Mvev_h7wc1TUg',
  authDomain: 'graphiql-app-f6d98.firebaseapp.com',
  projectId: 'graphiql-app-f6d98',
  storageBucket: 'graphiql-app-f6d98.appspot.com',
  messagingSenderId: '815569632859',
  appId: '1:815569632859:web:c7a3aa36eb1a8873b3897e',
  measurementId: 'G-Z7LCFSVCT8',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
