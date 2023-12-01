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
  apiKey: "AIzaSyBaxjao4AmdLCiUDsKZ-Ky8LkUyQtr8wC4",
  authDomain: "auth-flow-project-867ab.firebaseapp.com",
  projectId: "auth-flow-project-867ab",
  storageBucket: "auth-flow-project-867ab.appspot.com",
  messagingSenderId: "393097779477",
  appId: "1:393097779477:web:79ab3865c9a092c5cab11c",
  measurementId: "G-7ZY10QKJNB",
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
