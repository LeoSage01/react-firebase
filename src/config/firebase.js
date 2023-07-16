// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyDrbr5fxAN-NfN4lBjV9doPib-6ccy8oTA",
  authDomain: "fir-course-90eb6.firebaseapp.com",
  projectId: "fir-course-90eb6",
  storageBucket: "fir-course-90eb6.appspot.com",
  messagingSenderId: "404487879479",
  appId: "1:404487879479:web:8948408ce86503fba778b2",
  measurementId: "G-160BD0QWFK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
