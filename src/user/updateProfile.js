import React, { useState } from "react";
import { isSignin } from "../auth/helper";
import Alert from "../core/Alert";
import { updateUser } from "./helper/userapicalls";
import { useHistory } from "react-router-dom";
import { cloneDeep, cloneDeepWith } from "lodash";
import styles from "../css/update.module.css";

function UpdateProfile() {
  const authtoken = localStorage.getItem("token");
  const { id, firstname: fname, lastname: lname, email: mail } = isSignin();
  const location = useHistory();
  const [firstname, setfirstname] = useState(fname);
  const [lastname, setlastname] = useState(lname);
  const [email, setemail] = useState(mail);
  const [showalert, setshowalert] = useState(false);
  const [alertmsg, setalertmsg] = useState("");
  const [alerttype, setalerttype] = useState("");
  function scheduleAlert(msg, alerttype) {
    setshowalert(true);
    setalertmsg(msg);
    setalerttype(alerttype);
    setTimeout(() => {
      setshowalert(false);
    }, 2000);
  }
  function addtoken(userdata) {
    let obj = cloneDeep(userdata);
    obj.authtoken = authtoken;
    obj.id = id;
    return obj;
  }
  function submitHandler(e) {
    e.preventDefault();
    let updatedUser = {
      firstname,
      lastname,
      email,
    };
    if (!firstname.length || !lastname.length) {
      scheduleAlert("please enter valid inputs");
    }
    updateUser(id, authtoken, updatedUser)
      .then((data) => {
        let userdata = JSON.parse(localStorage.getItem("signinuser"));
        userdata.firstname = data.firstname;
        userdata.lastname = data.lastname;
        userdata.email = data.email;
        localStorage.setItem(
          "signinuser",
          JSON.stringify(cloneDeepWith(data, addtoken))
        );
        scheduleAlert("success", "User update successfully");
        setfirstname("");
        setlastname("");
        setemail("");
        setTimeout(() => {
          location.push("/");
        }, 5000);
      })
      .catch((err) => {
        scheduleAlert("some error occurred");
      });
  }

  return (
    <div className={`${styles.formcontainerdiv}`}>
      {showalert && <Alert cls={alerttype} msg={alertmsg}></Alert>}
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">
            First Name
          </label>
          <input
            value={firstname}
            onChange={(e) => setfirstname(e.target.value)}
            type="text"
            className="form-control"
            id="firstname"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">
            Last Name
          </label>
          <input
            value={lastname}
            onChange={(e) => setlastname(e.target.value)}
            type="text"
            className="form-control"
            id="lastname"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
export default React.memo(UpdateProfile);
