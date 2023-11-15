// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqt0Sz5njoLgRww7RKoaqlazeshp6w_nQ",
  authDomain: "netflix-clone-d2cbf.firebaseapp.com",
  projectId: "netflix-clone-d2cbf",
  storageBucket: "netflix-clone-d2cbf.appspot.com",
  messagingSenderId: "344806613731",
  appId: "1:344806613731:web:2b726c6d48e4eb4ac4dbd6"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export {auth, db}
