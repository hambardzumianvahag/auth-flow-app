// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { useEffect, useState } from "react";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAg0Wdo_s5YHP-yA3aNYf61iHqImVaROgQ",
  authDomain: "auth-flow-app-9023b.firebaseapp.com",
  projectId: "auth-flow-app-9023b",
  storageBucket: "auth-flow-app-9023b.appspot.com",
  messagingSenderId: "726382979191",
  appId: "1:726382979191:web:680c789a80999c1362be72",
  measurementId: "G-C6LZDGPF9Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  return {
    currentUser,
  };
};

export { auth, db, collection, addDoc, getDocs, doc, updateDoc, useAuth };
