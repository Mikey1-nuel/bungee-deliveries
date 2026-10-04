// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDw35aV9bnT8YFVfFtz2qVXpT_eatI4x9s",
  authDomain: "bungee-deliveriees-94526.firebaseapp.com",
  projectId: "bungee-deliveriees-94526",
  storageBucket: "bungee-deliveriees-94526.firebasestorage.app",
  messagingSenderId: "465349183822",
  appId: "1:465349183822:web:cd721f82b2a4062681361f",
  measurementId: "G-MEQHMNNPKC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);