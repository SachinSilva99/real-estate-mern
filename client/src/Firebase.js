// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-8ec44.firebaseapp.com",
  projectId: "real-estate-8ec44",
  storageBucket: "real-estate-8ec44.appspot.com",
  messagingSenderId: "404100171986",
  appId: "1:404100171986:web:0db58f365930a3ea49050b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
