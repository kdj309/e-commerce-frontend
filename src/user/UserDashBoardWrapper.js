import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import styles from "../css/UserDashboard.module.css";

export default function UserDashBoardWrapper({ children }) {
  return (
    <Base title="Welcome to your dashboard" className="container">
      <div className={`${styles.userdashbaordcontainer}`}>
        <div className={`col-md-4 ${styles.linkscontainer}`}>
          <div className="border-bottom border-secondary p-3">
            <Link style={{ textDecoration: "none" }} to="/user/dashboard">
              Overview
            </Link>
          </div>
          <div className="border-bottom border-secondary p-3">
            <Link style={{ textDecoration: "none" }} to="/user/orders">
              Orders
            </Link>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </Base>
  );
}
