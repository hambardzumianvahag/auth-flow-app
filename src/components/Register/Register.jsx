import { Button } from "@mui/material";
import React, { useState } from "react";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, auth, collection, db } from "../../firebase/firebase-config";
const Register = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    header: "#3b5998",
    main: "#3b5998",
    footer: "#3b5998",
    headerDisplay: "block",
    mainDisplay: "block",
    footerDisplay: "block",
  });

  const userInfo = collection(db, "users");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !user.name ||
      !user.surname ||
      !user.email ||
      !user.password ||
      !user.confirmPassword
    ) {
      setError("Please Fill In All The Fields");
    } else if (
      !user.email ||
      !user.email.includes("@") ||
      !user.email.includes(".")
    ) {
      setError("Please Fill Out Correct Email");
    } else if (user.password.length < 6) {
      setError("Password Must Be At Least 6 Characters");
    } else if (user.password !== user.confirmPassword) {
      setError("Passwords Don't Match Each Other");
    } else if (!isChecked) {
      setError("Please Confirm the Terms & Conditions");
    } else {
      setError("");
      try {
        const userData = await createUserWithEmailAndPassword(
          auth,
          user.email,
          user.password
        );
        const { uid } = userData.user;
        await addDoc(userInfo, {
          uid: uid,
          name: user.name,
          surname: user.surname,
          email: user.email,
          header: user.header,
          footer: user.footer,
          main: user.main,
          headerDisplay: user.headerDisplay,
          mainDisplay: user.mainDisplay,
          footerDisplay: user.footerDisplay,
        });
        navigate("/auth-flow-app/login");
        setUser({
          name: "",
          surname: "",
          email: "",
          password: "",
          confirmPassword: "",
          header: "#3b5998",
          main: "#3b5998",
          footer: "#3b5998",
          headerDisplay: "block",
          mainDisplay: "block",
          footerDisplay: "block",
        });
      } catch (error) {
        console.log(error);
        setError("Something Went Wrong");
      }
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.register}>
        <h3 className={styles.title}>Register</h3>
        {error && <h4 className={styles.error}>{error}</h4>}
        <form onSubmit={handleSubmit}>
          <div className={styles.container}>
            <label>First Name</label> <br />
            <input
              className={styles.inputField}
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className={styles.container}>
            <label>Last Name</label> <br />
            <input
              className={styles.inputField}
              value={user.surname}
              onChange={(e) => setUser({ ...user, surname: e.target.value })}
            />
          </div>
          <div className={styles.container}>
            <label>Email</label> <br />
            <input
              className={styles.inputField}
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className={styles.container}>
            <label>Password</label> <br />
            <input
              type="password"
              className={styles.inputField}
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div className={styles.container}>
            <label>Confirm Password</label> <br />
            <input
              type="password"
              className={styles.inputField}
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
            />
          </div>
          <div className={styles.termsDiv}>
            <input
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              type="checkbox"
            />{" "}
            <span
              className={styles.terms}
              onClick={() => setIsChecked(!isChecked)}
            >
              I Agree with the{" "}
              <Link
                className={styles.text}
                to="https://help.instagram.com/581066165581870"
                target="_blank"
              >
                {" "}
                Terms & Conditions{" "}
              </Link>
            </span>
          </div>
          <div className={styles.buttonDiv}>
            <Button type="submit" className={styles.button} variant="contained">
              Sign Up
            </Button>
          </div>
          <div className={styles.already}>
            <p>
              Already have an account?{" "}
              <Link className={styles.text} to="/auth-flow-app/login">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
