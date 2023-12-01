import { Button } from "@mui/material";
import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router";
import { auth } from "../../firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ setIsAuthenticated }) => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        if (
          values.email === "admin@gmail.com" &&
          values.password === "qwerty123456"
        ) {
          setIsAuthenticated(true);
          navigate("/auth-flow-app/admin");
        } else {
          navigate("/auth-flow-app/profile");
        }
        setError("");
        setValues({ email: "", password: "" });
      })
      .catch(() => setError("Wrong Email or Password!"));
  };
  return (
    <div className={styles.main}>
      <div className={styles.login}>
        <h3 className={styles.title}>Login</h3>
        {error && <h4 className={styles.error}>{error}</h4>}
        <form onSubmit={handleSubmit}>
          <div className={styles.container}>
            <label>Email</label> <br />
            <input
              className={styles.inputField}
              type="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className={styles.container}>
            <label>Password</label> <br />
            <input
              className={styles.inputField}
              type="password"
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
          <div className={styles.forgotDiv}>
            <span
              onClick={() => navigate("/auth-flow-app/reset")}
              className={styles.forgotText}
            >
              Forgot Password?
            </span>
          </div>
          <div className={styles.btnDiv}>
            <Button className={styles.btn} type="submit" variant="contained">
              Login
            </Button>
          </div>
          <div className={styles.signupDiv}>
            <span>
              Don't Have An Account?{" "}
              <span className={styles.signup} onClick={() => navigate("/auth-flow-app")}>
                Sign Up
              </span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
