// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwHyxMUEtoSKrhzq4tS-XbcSTwYpRzk3Q",
  authDomain: "pmt-app-796dc.firebaseapp.com",
  projectId: "pmt-app-796dc",
  storageBucket: "pmt-app-796dc.appspot.com",
  messagingSenderId: "75145987660",
  appId: "1:75145987660:web:a410030240a98219a7d6e9",
  measurementId: "G-V629G0094C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);