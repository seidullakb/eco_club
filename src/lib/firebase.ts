import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCm3Q_sq22UnkphghGj3bU24bXkFtJrxSo",
  authDomain: "eco-project-5f7ad.firebaseapp.com",
  projectId: "eco-project-5f7ad",
  storageBucket: "eco-project-5f7ad.firebasestorage.app",
  messagingSenderId: "265580291341",
  appId: "1:265580291341:web:2de5c8a675ea7f2d973c44",
  measurementId: "G-XWJZLVP2RW"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
