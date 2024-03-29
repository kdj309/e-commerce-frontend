import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { isSignin, signup } from "./helper";
import styles from "../css/signup.module.css";
import img from "./../assets/myntracopy.svg";
import NormalAlert from "../core/helper/NormalAlert";
import showpassword from "../assets/showpassword.svg";
import hidepassword from "../assets/hidepassword.svg";
export default function Signup() {
  const [isshowpassword, setisshowpassword] = useState(false);
  const [isshowrepeatpassword, setisshowrepeatpassword] = useState(false);
  let location = useHistory();
  document.body.style = "background: #f8f9fa;";
  const [user, setuser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    repeatedpassword: "",
  });
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState(false);
  function OnChange(e) {
    return setuser({ ...user, [e.target.name]: e.target.value });
  }
  function submithandler(e) {
    e.preventDefault();
    if (user.password !== user.repeatedpassword) {
      alert("password does not match");
      return;
    }
    signup({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
    })
      .then((data) => {
        if (data.user) {
          seterror("");
          setsuccess(true);
          setuser({
            ...user,
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            repeatedpassword: "",
          });
          let returnuser = isSignin();
          if (returnuser.role) {
            location.push("/admin/dashboard");
          } else {
            location.push("/user/dashboard");
          }
        } else {
          seterror(() => {
            return data.errors
              ? "please fill the valid details"
              : data.errormsg;
          });
        }
      })
      .catch((err) => {
        seterror(() => {
          return "please fill the valid details";
        });
      });
    //console.log(response);
  }
  return (
    <div
      className={`my-2 mx-auto d-flex flex-column justify-content-evenly p-3 ${styles["signup-container"]}`}
    >
      <div className="mx-auto" style={{ width: "max-content" }}>
        <img src={img} className={`mx-auto ${styles["logo"]}`} alt="logo"></img>
      </div>
      {success ? (
        <NormalAlert
          alerttype="success"
          msg="New account created successfully"
        />
      ) : error.length > 3 ? (
        <NormalAlert alerttype="danger" msg={error} />
      ) : null}
      <div style={{ width: "85%" }} className="mx-auto">
        <form onSubmit={submithandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              minLength={3}
              name="firstname"
              value={user.firstname}
              onChange={OnChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              value={user.lastname}
              onChange={OnChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="Email"
              name="email"
              value={user.email}
              onChange={OnChange}
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="Password1" className="form-label">
              Password
            </label>
            <div className="d-flex">
              <input
                type={isshowpassword ? "text" : "password"}
                className="form-control"
                id="Password1"
                name="password"
                value={user.password}
                onChange={OnChange}
                required
                minLength={5}
              />
              <img
                className={`${styles.passwordlogo}`}
                title={isshowpassword ? "Hide Password" : "Show Password"}
                src={isshowpassword ? hidepassword : showpassword}
                alt="passwordicon"
                onClick={() => setisshowpassword((previous) => !previous)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="Password2" className="form-label">
              Repeat Password
            </label>
            <div className="d-flex">
              <input
                type={isshowrepeatpassword ? "text" : "password"}
                className="form-control"
                id="Password2"
                name="repeatedpassword"
                value={user.repeatedpassword}
                required
                onChange={OnChange}
              />
              <img
                className={`${styles.passwordlogo}`}
                title={isshowrepeatpassword ? "Hide Password" : "Show Password"}
                src={isshowrepeatpassword ? hidepassword : showpassword}
                alt="passwordicon"
                onClick={() => setisshowrepeatpassword((previous) => !previous)}
              />
            </div>
          </div>
          <button type="submit" className={`btn ${styles.signupbtns}`}>
            Submit
          </button>
        </form>
        <div>
          <p>
            Already have an Account? <Link to="/signin">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
