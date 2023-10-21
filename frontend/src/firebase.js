
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "jobportal-14f3c.firebaseapp.com",
  projectId: "jobportal-14f3c",
  storageBucket: "jobportal-14f3c.appspot.com",
  messagingSenderId: "834653214452",
  appId: "1:834653214452:web:8b9dde4163ddd2a0acb0a1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);