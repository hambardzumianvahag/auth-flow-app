import React, { useEffect, useState } from "react";
import { collection, db, getDocs } from "../../firebase/firebase-config";
import styles from "./Admin.module.css";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

const Admin = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getDocs(collection(db, "users"));
        const fetchArr = [];
        userData.forEach((doc) => {
          fetchArr.push({ id: doc.id, ...doc.data() });
        });
        setData(fetchArr);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSeeMore = (user) => {
    navigate("/auth-flow-app/admin-panel", { state: { user } });
  };

  return (
    <div className={styles.main}>
      <div className={styles.adminContainer}>
        <Button
          variant="contained"
          className={styles.logout}
          onClick={() => navigate("/auth-flow-app/login")}
        >
          Log Out
        </Button>
        {data && (
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.surname}</td>
                  <td>{item.email}</td>
                  <td>
                    <Button
                      onClick={() => handleSeeMore(item)}
                      variant="outlined"
                    >
                      See More
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Admin;
