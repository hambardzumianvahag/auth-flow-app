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
          const userData = await getDocs(collection(db, "users"));
          const fetchedData = userData.docs.map((doc) => ({
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
        console.log("Error: ", error);
      }
    };
    fetchData();
  }, [currentUser]);

  return (
    <div className={styles.profile}>
      <div
        style={{
          backgroundColor: userData.header,
          display: userData.headerDisplay,
        }}
      >
        <div className={`${styles.header}`}>
          <h3>My header</h3>
          <ul>
            <li>About us</li>
            <li>Contact</li>
            <li>Help</li>
            <li>Profile</li>
            <li onClick={() => navigate("/auth-flow-app/login")}>Log Out</li>
          </ul>
        </div>
      </div>
      <div
        className={`${styles.main}`}
        style={{
          backgroundColor: userData.main,
          display: userData.mainDisplay,
        }}
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
        style={{
          backgroundColor: userData.footer,
          display: userData.footerDisplay,
        }}
      >
        <div className={`${styles.footer} `}>
          <h3>My footer</h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;
