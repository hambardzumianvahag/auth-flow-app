import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AdminPanel.module.css";
import { Button } from "@mui/material";
import { collection, db, doc, updateDoc } from "../../firebase/firebase-config";

const AdminPanel = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const [header, setHeader] = useState(user.header);
  const [main, setMain] = useState(user.main);
  const [footer, setFooter] = useState(user.footer);
  const [headerDisplay, setHeaderDisplay] = useState(user.headerDisplay);
  const [mainDisplay, setMainDisplay] = useState(user.mainDisplay);
  const [footerDisplay, setFooterDisplay] = useState(user.headerDisplay);
  const navigate = useNavigate();

  const updateColors = async () => {
    try {
      const userId = user.id;
      const userDocRef = doc(collection(db, "users"), userId);
      await updateDoc(userDocRef, {
        header: header,
        main: main,
        footer: footer,
        headerDisplay: headerDisplay,
        mainDisplay: mainDisplay,
        footerDisplay: footerDisplay,
      });
      navigate("/auth-flow-app/admin");
    } catch (error) {
      console.error("Error updating colors:", error);
    }
  };

  const handleCheckboxChange = (settingType) => {
    switch (settingType) {
      case "header":
        setHeaderDisplay(headerDisplay === "none" ? "block" : "none");
        break;
      case "main":
        setMainDisplay(mainDisplay === "none" ? "block" : "none");
        break;
      case "footer":
        setFooterDisplay(footerDisplay === "none" ? "block" : "none");
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (user) {
      setHeaderDisplay(user.headerDisplay);
      setMainDisplay(user.mainDisplay);
      setFooterDisplay(user.footerDisplay);
    }
  }, [user]);
  return (
    <div className={styles.main}>
      <div className={styles.panel}>
        <h3>AdminPanel</h3>
        {user && (
          <>
            <p>Name: {user.name}</p>
            <p>Surname: {user.surname}</p>
            <p>Email: {user.email}</p>
            <div className={styles.changes}>
              <h3>Changes</h3>
              <div className={styles.chooseDiv}>
                <h5 className={styles.title}>Header</h5>
                <label>Hide</label>{" "}
                <input
                  type="checkbox"
                  checked={headerDisplay === "none"}
                  onChange={() => handleCheckboxChange("header")}
                />
                <div className={styles.chooseColor}>
                  <label>Choose a Color</label>
                  <input
                    type="color"
                    onChange={(e) => setHeader(e.target.value)}
                    value={header}
                  />
                </div>
              </div>
              <div className={styles.chooseDiv}>
                <h5 className={styles.title}>Main</h5>
                <label>Hide</label>{" "}
                <input
                  type="checkbox"
                  checked={mainDisplay === "none"}
                  onChange={() => handleCheckboxChange("main")}
                />
                <div className={styles.chooseColor}>
                  <label>Choose a Color</label>
                  <input
                    type="color"
                    onChange={(e) => setMain(e.target.value)}
                    value={main}
                  />
                </div>
              </div>
              <div className={styles.chooseDiv}>
                <h5 className={styles.title}>Footer</h5>
                <label>Hide</label>{" "}
                <input
                  type="checkbox"
                  checked={footerDisplay === "none"}
                  onChange={() => handleCheckboxChange("footer")}
                />
                <div className={styles.chooseColor}>
                  <label>Choose a Color</label>
                  <input
                    type="color"
                    onChange={(e) => setFooter(e.target.value)}
                    value={footer}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        <div className={styles.btnsDiv}>
          <Button
            variant="contained"
            onClick={() => navigate("/auth-flow-app/admin")}
          >
            Back
          </Button>
          <Button variant="contained" onClick={updateColors}>
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
