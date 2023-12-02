import React, { useState } from "react";
import styles from "./Layout.module.css";
import Register from "../Register/Register";
import { Route, Routes } from "react-router";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Reset from "../Reset/Reset";
import Admin from "../Admin/Admin";
import Error from "../Error/Error";
import AdminPanel from "../AdminPanel/AdminPanel";

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className={styles.layout}>
      <Routes>
        <Route path="/auth-flow-app" element={<Register />} />
        <Route
          path="/auth-flow-app/login"
          element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        {isAuthenticated && (
          <Route path="auth-flow-app/profile" element={<Profile />} />
        )}
        {/* <Route path="/auth-flow-app/profile" element={<Profile />} /> */}
        <Route path="/auth-flow-app/reset" element={<Reset />} />
        {isAuthenticated && (
          <Route path="auth-flow-app/admin" element={<Admin />} />
        )}
        {/* <Route path="/auth-flow-app/admin" element={<Admin />} /> */}
        {isAuthenticated && (
          <Route path="auth-flow-app/admin-panel" element={<AdminPanel />} />
        )}
        {/* <Route path="/auth-flow-app/admin-panel" element={<AdminPanel />} /> */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default Layout;
