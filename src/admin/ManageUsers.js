import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import AdminUser from "./AdminUser";
import Alert from "../user/Alert";
import { isSignin } from "../auth/helper";
import { deleteUser, getAllusers } from "./helper/adminapicall";

export default function ManageUsers() {
  const authtoken = localStorage.getItem("token");
  const { id } = isSignin();
  const [users, setusers] = useState([]);
  const [values, setvalues] = useState({
    error: false,
    success: false,
    errormsg: "",
  });
  const { success, error, errormsg } = values;
 
  function DeleteTheUser(userid) {
    deleteUser(id, authtoken, userid).then((data) => {
      if (data.errormsg) {
        setvalues({
          ...values,
          error: true,
        });
      } else {
        setvalues({
          ...values,
          success: true,
        });
        setusers((previous) => {
          return previous.filter((user) => {
            return user._id !== userid;
          });
        });
      }
    });
  }
  useEffect(() => {
    const preload = () => {
      getAllusers(id, authtoken).then((data) => {
        if (data.errormsg) {
          console.log(data.errormsg);
        } else {
          setusers(data);
        }
      });
    };
    preload();
  }, []);
  return (
    <Base
      title="Welcome admin"
      description="Manage users here"
      className="container"
    >
      <div className="d-flex gap-2">
        <h2>All users:</h2>
        <Link className="btn btn-info text-white" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
        {success ? (
          <Alert alerttype="success" msg={`order deleted successfully`} />
        ) : error ? (
          <Alert alerttype="danger" msg={errormsg} />
        ) : null}
      </div>

      <div className="container d-flex justify-content-center align-items-center p-2 m-2 gap-2">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Registered</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((useritem, index) => (
              <AdminUser
                DeleteUser={DeleteTheUser}
                user={useritem}
                index={index + 1}
                key={useritem._id}
              ></AdminUser>
            ))}
          </tbody>
        </table>
      </div>
    </Base>
  );
}
