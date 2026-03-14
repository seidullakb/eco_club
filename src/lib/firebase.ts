import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUBNMs1Csn5Tm2E3b_R2Sl9xr6ZZQI5rk",
  authDomain: "gen-lang-client-0998395099.firebaseapp.com",
  projectId: "gen-lang-client-0998395099",
  storageBucket: "gen-lang-client-0998395099.firebasestorage.app",
  messagingSenderId: "41809863279",
  appId: "1:41809863279:web:633aad44a84a4e09eaa39a",
  firestoreDatabaseId: "ai-studio-67a35c05-dbb9-4e01-81d2-dd32ffa3629f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();