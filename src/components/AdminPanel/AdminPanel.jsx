import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AdminPanel.module.css";
import { Button } from "@mui/material";
import { collection, db, doc, updateDoc } from "../../firebase/firebase-config";

const AdminPanel = () => {
  const [header, setHeader] = useState("#3b5998");
  const [main, setMain] = useState("#3b5998");
  const [footer, setFooter] = useState("#3b5998");

  const location = useLocation();
  const { user } = location.state || {};
  const navigate = useNavigate();

  const updateColors = async () => {
    try {
      const userId = user.id;
      const userDocRef = doc(collection(db, "users"), userId);
      await updateDoc(userDocRef, {
        header: header,
        main: main,
        footer: footer,
      });
      navigate("/auth-flow-app/admin");
    } catch (error) {
      console.error("Error updating colors:", error);
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.panel}>
        <h3>AdminPanel</h3>
        {user && (
          <>
            <p>Name: {user.name}</p>
            <p>Surname: {user.surname}</p>
            <p>Email: {user.email}</p>
            <div className={styles.chooseDiv}>
              <label>Choose a Color For The Header --- </label>
              <input
                type="color"
                onChange={(e) => setHeader(e.target.value)}
                value={header}
              />
            </div>
            <div className={styles.chooseDiv}>
              <label>Choose a Color For The Main --- </label>
              <input
                type="color"
                onChange={(e) => setMain(e.target.value)}
                value={main}
              />
            </div>
            <div className={styles.chooseDiv}>
              <label>Choose a Color For The Footer --- </label>
              <input
                type="color"
                onChange={(e) => setFooter(e.target.value)}
                value={footer}
              />
            </div>
          </>
        )}
        <div className={styles.btnsDiv}>
          <Button variant="contained" onClick={() => navigate("/auth-flow-app/admin")}>
            Back
          </Button>
          <Button variant="contained" onClick={updateColors}>
            Update Colors
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
