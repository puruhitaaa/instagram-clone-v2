import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD2tr1m_Mg1dF2B-G2D4TNGuiANMT8HN9M',
  authDomain: 'fir-d-ig-clone.firebaseapp.com',
  projectId: 'fir-d-ig-clone',
  storageBucket: 'fir-d-ig-clone.appspot.com',
  messagingSenderId: '131071585271',
  appId: '1:131071585271:web:e43bb178ab5cac306a9cf2',
};

const app = !getApps.length
  ? initializeApp(firebaseConfig, 'firebase-client-side')
  : getApp();
const storage = getStorage(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, auth, storage, firestore };
