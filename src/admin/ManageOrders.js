import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import Alert from "../user/Alert";
import AdminOrder from "./AdminOrder";
import { getOrders, deleteOrder } from "./helper/adminapicall";
import { isSignin } from "../auth/helper";

export default function ManageOrders() {
  const authtoken = localStorage.getItem("token");
  const { id } = isSignin();
  const [orders, setorders] = useState([]);
  const [values, setvalues] = useState({
    error: false,
    success: false,
    errormsg: "",
  });
  const { success, error, errormsg } = values;

  function DeleteTheOrder(orderid) {
    deleteOrder(id, orderid, authtoken).then((data) => {
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
        setorders((previous) => {
          return previous.filter((order) => {
            return order._id !== orderid;
          });
        });
      }
    });
  }
  useEffect(() => {
    const preload = () => {
      getOrders(id, authtoken).then((data) => {
        if (data.errormsg) {
          console.log(data.errormsg);
        } else {
          setorders(data);
          console.log(orders);
        }
      });
    };
    preload();
  }, []);
  return (
    <Base
      title="Welcome admin"
      description="Manage orders here"
      className="container"
    >
      <div className="d-flex gap-2">
        <h2>All orders:</h2>
        <Link className="btn btn-info text-white" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
        <div>
          {success ? (
            <Alert alerttype="success" msg={`order deleted successfully`} />
          ) : error ? (
            <Alert alerttype="danger" msg={errormsg} />
          ) : null}
        </div>
      </div>
      <div className="container d-flex justify-content-evenly flex-wrap align-items-center p-2 m-2 gap-2">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Customer</th>
              <th scope="col">Paid</th>
              <th scope="col">Items</th>
              <th scope="col">Total</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <AdminOrder
                DeleteOrder={DeleteTheOrder}
                order={order}
                index={index + 1}
                key={order._id}
              ></AdminOrder>
            ))}
          </tbody>
        </table>
      </div>
    </Base>
  );
}
