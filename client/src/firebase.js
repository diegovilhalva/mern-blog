// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-6f089.firebaseapp.com",
  projectId: "mern-blog-6f089",
  storageBucket: "mern-blog-6f089.appspot.com",
  messagingSenderId: "389188984389",
  appId: "1:389188984389:web:60ff3365bfea4358670d2c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);