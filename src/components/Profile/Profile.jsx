// Profile.jsx

import React, { useEffect, useState } from "react";
import { collection, getDocs, useAuth } from "../../firebase/firebase-config";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router";
import { db } from "../../firebase/firebase-config";

const Profile = () => {
  const [userData, setUserData] = useState({
    header: true,
    main: true,
    footer: true,
  });
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = currentUser?.uid;
        if (userId) {
          const querySnapshot = await getDocs(collection(db, "users"));
          const fetchedData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          const currentUserData = fetchedData.find(
            (user) => user.uid === userId
          );
          if (currentUserData) {
            setUserData(currentUserData);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentUser]);

  return (
    <div className={styles.profile}>
      <div
        className={`${styles.header}`}
        style={{ backgroundColor: userData.header }}
      >
        <h3>My header</h3>
        <ul>
          <li>About us</li>
          <li>Contact</li>
          <li>Help</li>
          <li>Profile</li>
          <li onClick={() => navigate("/auth-flow-app/login")}>Log Out</li>
        </ul>
      </div>
      <div
        className={`${styles.main}`}
        style={{ backgroundColor: userData.main }}
      >
        <h1>My main</h1>
        {userData ? (
          <>
            {" "}
            <h3>Name: {userData.name}</h3> <h3>Surname: {userData.surname}</h3>
            <h3>Email: {userData.email}</h3>
          </>
        ) : null}
      </div>
      <div
        className={`${styles.footer} `}
        style={{ backgroundColor: userData.footer }}
      >
        <h3>My footer</h3>
      </div>
    </div>
  );
};

export default Profile;
