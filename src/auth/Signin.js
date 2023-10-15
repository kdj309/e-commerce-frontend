import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { authenticate, isSignin, signin } from "./helper";
import img from "./../assets/myntracopy.svg";
import styles from "../css/signin.module.css";
import NormalAlert from "../core/helper/NormalAlert";
import showpassword from "../assets/showpassword.svg";
import hidepassword from "../assets/hidepassword.svg";
//
export default function Signin() {
  const [isshowpassword, setisshowpassword] = useState(false);
  let location = useHistory();
  const [user, setuser] = useState({
    email: "",
    password: "",
    didredirect: false,
  });
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState(false);
  function submithandler(e) {
    e.preventDefault();
    if (!user.email || !user.password) {
      alert("please mention the details");
      return;
    }
    signin({ email: user.email, password: user.password })
      .then((data) => {
        if (data.user) {
          authenticate(data.user, () => {
            seterror("");
            setsuccess(true);
            setuser({
              ...user,
              email: "",
              password: "",
              didredirect: true,
            });
            let returnuser = isSignin();
            if (returnuser.role) {
              location.push("/admin/dashboard");
            } else {
              location.push("/user/dashboard");
            }
          });
        } else {
          seterror(() => {
            console.log(data.erros);
            return data.errors
              ? "please fill the valid details"
              : data.errormsg;
          });
        }
      })
      .catch((err) => {
        seterror(() => {
          return "Email or password is incorrect";
        });
      });
  }
  function OnChange(e) {
    setuser({ ...user, [e.target.name]: e.target.value });
  }
  document.body.style = "background: #f8f9fa;";
  return (
    <div
      className={`my-3 mx-auto d-flex flex-column justify-content-evenly p-3 ${styles["signin-container"]}`}
    >
      <div className="mx-auto" style={{ width: "max-content" }}>
        <img
          src={img}
          className={`mx-auto ${styles["logo"]} `}
          alt="logo"
        ></img>
      </div>
      {success ? (
        <NormalAlert alerttype="success" msg="Login success" />
      ) : error.length > 3 ? (
        <NormalAlert alerttype="danger" msg={error} />
      ) : null}
      <div style={{ width: "85%" }} className="mx-auto">
        <form onSubmit={submithandler}>
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
                minLength={5}
                required
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
          <button type="submit" className={`btn ${styles.signinbtns}`}>
            Login
          </button>
        </form>
        <div className={`${styles["form-links"]}`}>
          <p>
            Don't have an Account{" "}
            <Link
              className="border-bottom border-primary-subtle"
              style={{ textDecoration: "none" }}
              to="/signup"
            >
              Sign Up
            </Link>
          </p>
          <p
            className="border-bottom border-primary-subtle"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setuser({
                email: "rebanok594@terkoer.com",
                password: "test@654321",
              });
            }}
          >
            Login As Test User
          </p>
        </div>
      </div>
    </div>
  );
}
