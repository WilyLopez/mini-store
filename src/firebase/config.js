// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuqcvga-PQ0X7awo1Q26D_UG5_aMtDCxs",
  authDomain: "productos-cd8e4.firebaseapp.com",
  projectId: "productos-cd8e4",
  storageBucket: "productos-cd8e4.firebasestorage.app",
  messagingSenderId: "622162993490",
  appId: "1:622162993490:web:049647f13a6cdaa84e9a8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);