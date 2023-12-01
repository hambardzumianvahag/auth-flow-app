import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Reset.module.css";
import { Button } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";

const Reset = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Check Your Email!");
        navigate("/auth-flow-app/login");
      })
      .catch(() => alert("Something Went Wrong!"));
  };
  return (
    <div className={styles.main}>
      <div className={styles.reset}>
        <h3 className={styles.title}>Can't sign in?</h3>
        <p className={styles.text}>
          Enter your email address and we'll send you a link to reset your
          password
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              className={styles.inputField}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.btnDiv}>
            <Button type="submit" variant="contained" className={styles.btn}>
              Send
            </Button>
          </div>
        </form>
        <hr className={styles.line} />
        <div className={styles.registerDiv}>
          <span
            onClick={() => navigate("/auth-flow-app")}
            className={styles.register}
          >
            Create New Account
          </span>
        </div>{" "}
        <br />
        <div className={styles.loginDiv}>
          <hr className={styles.line} />
          <span
            onClick={() => navigate("/auth-flow-app/login")}
            className={styles.login}
          >
            Back To Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Reset;
