import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDHzGHuArCQ-ayaMHPFPEjZf4D3wzq8ZY4",
  authDomain: "autoclientflow.firebaseapp.com",
  projectId: "autoclientflow",
  storageBucket: "autoclientflow.appspot.com",
  messagingSenderId: "580550234743",
  appId: "1:580550234743:web:c55f7ee5d80eaef3316c72"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };