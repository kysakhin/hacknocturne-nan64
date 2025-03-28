import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAD34nIvl8NJjopr4LsE1hMemoDphJ61bM",
  authDomain: "swap-env.firebaseapp.com",
  projectId: "swap-env",
  storageBucket: "swap-env.firebasestorage.app",
  messagingSenderId: "174003289456",
  appId: "1:174003289456:web:db510ddd3e5b9065a1a3b5",
  measurementId: "G-X4PGY0G81E"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
