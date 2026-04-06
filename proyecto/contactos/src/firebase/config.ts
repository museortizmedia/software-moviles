// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1uj3TID1THiGin3rn3_wgVsToTrF3kIs",
  authDomain: "tu-guia-jamundi.firebaseapp.com",
  projectId: "tu-guia-jamundi",
  storageBucket: "tu-guia-jamundi.firebasestorage.app",
  messagingSenderId: "196563286873",
  appId: "1:196563286873:web:c6ccb9a82565756c212a48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);