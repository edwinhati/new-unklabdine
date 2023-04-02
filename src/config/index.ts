/* eslint-disable react-hooks/rules-of-hooks */
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDhiEwAk6LLLr5y03R1pDztWPkPBfgzv4s",
//   authDomain: "unklabdine.firebaseapp.com",
//   databaseURL: "https://unklabdine-default-rtdb.firebaseio.com",
//   projectId: "unklabdine",
//   storageBucket: "unklabdine.appspot.com",
//   messagingSenderId: "833575028361",
//   appId: "1:833575028361:web:a300ff9e586984c79be858",
//   measurementId: "G-Q8K5ER6HHE"
// };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  await signInWithPopup(auth, googleProvider);
}

export async function signOut() {
  await auth.signOut();
}

export function getCurrentUser(): Promise<any | null> {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}
