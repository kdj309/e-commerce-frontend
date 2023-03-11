import React from "react";
import useOrderData from "./helper/useOrderData";
import { Link } from "react-router-dom";
import styles from "../css/userprofile.module.css";
import Alert from "./Alert";

export default function UserProfile() {
  const { userData, status } = useOrderData();
  return (
    <div className={`col-md-4 offset-md-1 p-4 ${styles.profiledetails}`}>
      {status === "loading" ? (
        <div
          className="d-flex justify-content-center"
          style={{ width: "max-content", margin: "auto" }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : status === "failure" ? (
        <Alert msg="some error occurred" alerttype="danger"></Alert>
      ) : (
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
      )}
    </div>
  );
}
