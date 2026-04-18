import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "trailmissions-c8a39.firebaseapp.com",
  projectId: "trailmissions-c8a39",
  storageBucket: "trailmissions-c8a39.firebasestorage.app",
  messagingSenderId: "931406204355",
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export const loginAnon = async () => {
  const user = await signInAnonymously(auth);
  return user.user.uid;
};

export const logout = async () => {
  await signOut(auth);
};