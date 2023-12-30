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
  apiKey: "AIzaSyAsoA6hlbR_rJgj8eIx268SBCLzteOSkFs",
  authDomain: "auth-flow-app-bcbac.firebaseapp.com",
  projectId: "auth-flow-app-bcbac",
  storageBucket: "auth-flow-app-bcbac.appspot.com",
  messagingSenderId: "290255199438",
  appId: "1:290255199438:web:6d08d5a87d12363e47049f",
  measurementId: "G-23N48SPX6J"
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
