import React from "react";
import styles from "./Error.module.css";

const Error = () => {
  return (
    <div className={styles.error}>
      <h2>404 - Not Found</h2>
      <p>Sorry, the requested page does not exist.</p>
    </div>
  );
};

export default Error;
