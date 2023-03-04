import React from "react";
import useOrderData from "./helper/useOrderData";
import { Link } from "react-router-dom";
import styles from "../css/userprofile.module.css";

export default function UserProfile() {
  const { userData } = useOrderData();
  return (
    <div className={`col-md-4 offset-md-1 p-4 ${styles.profiledetails}`}>
      <div className="d-flex flex-column align-items-left">
        <h3>Profile Details</h3>
        <hr />
        <table className="table">
          <tbody>
            <tr>
              <td>Full Name:</td>
              <td>{`${userData.firstname} ${userData.lastname}`}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{userData.email}</td>
            </tr>
          </tbody>
        </table>
        <div className="align-self-center">
          <Link to="/user/update" className="btn btn-danger">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
