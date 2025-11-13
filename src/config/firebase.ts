import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCvxbfCKsrAFP74czasZDsZsZ6hJkzkAOA",
  authDomain: "authsec-dfeb9.firebaseapp.com",
  databaseURL: "https://authsec-dfeb9-default-rtdb.firebaseio.com",
  projectId: "authsec-dfeb9",
  storageBucket: "authsec-dfeb9.firebasestorage.app",
  messagingSenderId: "491740541704",
  appId: "1:491740541704:web:86644204db1cbc4359f2bd",
  measurementId: "G-Z3HRC7TLX4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
