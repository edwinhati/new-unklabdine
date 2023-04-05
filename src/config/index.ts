/* eslint-disable react-hooks/rules-of-hooks */
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  await signInWithPopup(auth, googleProvider).then((result) => {
    if (result.user.photoURL) {
      localStorage.setItem("photoURL", result.user.photoURL);
    }
    window.location.href = "/";
  });
}

export async function signOut() {
  await auth.signOut();
}

export const firestore = getFirestore(app);

export const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

function getMealtime() {
  const time = new Date().getUTCHours() + 8;
  if (time > 1 && time < 10) {
    return "Breakfast";
  }
  if (time > 10 && time < 15) {
    return "Lunch";
  }
  if (time > 15 && time < 22) {
    return "Dinner";
  }
  return "undefined";
}

export const mealtime = getMealtime();