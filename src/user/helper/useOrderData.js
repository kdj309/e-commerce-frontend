import { useState, useEffect } from "react";
import { isSignin } from "../../auth/helper";
import { getUser } from "./userapicalls";
export default function useOrderData() {
  const authtoken = localStorage.getItem("token");
  const [status, setstatus] = useState("");
  const { id } = isSignin();
  const [userData, setuserData] = useState({});
  useEffect(() => {
    setstatus("loading");
    getUser(id, authtoken)
      .then((data) => {
        setstatus("success");
        setuserData(data);
      })
      .catch((err) => {
        setstatus("failure");
        console.log(err);
      });
  }, []);
  return {
    userData,
    status,
    setuserData,
  };
}
