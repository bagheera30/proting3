// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2ip1fBp_Wx0Pqm4V1msMKq3yi6srYOqs",
  authDomain: "wspend-509a7.firebaseapp.com",
  projectId: "wspend-509a7",
  storageBucket: "wspend-509a7.appspot.com",
  messagingSenderId: "347758885980",
  appId: "1:347758885980:web:7f623f6bdb427fae097a99",
  measurementId: "G-NEKF4K0ZJK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
