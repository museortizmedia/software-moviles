import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import {
  getAuth,
  signInAnonymously
} from "firebase/auth";

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

const STORAGE_KEY = "trail_user";

/* LOGIN */
export const loginAnon = async () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return saved;

  const res = await signInAnonymously(auth);
  const uid = res.user.uid;

  localStorage.setItem(STORAGE_KEY, uid);

  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      points: 0,
      missions: {
        photo: false,
        move: false,
        still: false
      }
    });
  }

  return uid;
};

/* GET USER */
export const getUserData = async (uid: string) => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.data();
};

/* UPDATE */
export const updateUserProgress = async (
  uid: string,
  id: string,
  points: number
) => {
  await updateDoc(doc(db, "users", uid), {
    points,
    [`missions.${id}`]: true,
    updatedAt: Date.now()
  });
};

/* LOGOUT */
export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
};