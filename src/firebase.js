// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB29qXAa6ENPrEoVxIuNWYcRiIzqxfP6M8",
  authDomain: "project-auth-916cf.firebaseapp.com",
  projectId: "project-auth-916cf",
  storageBucket: "project-auth-916cf.firebasestorage.app",
  messagingSenderId: "712151199823",
  appId: "1:712151199823:web:d7e4f30c62c8760d503a3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;