// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGDK8BJnOJ68xqO9v-hDYvio8ZYBCDmvY",
  authDomain: "reactecom-f8741.firebaseapp.com",
  projectId: "reactecom-f8741",
  storageBucket: "reactecom-f8741.appspot.com",
  messagingSenderId: "1054942735660",
  appId: "1:1054942735660:web:18745a534874ebfb915089"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app)

export {fireDB,auth } ;