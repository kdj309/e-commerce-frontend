import React from "react";
import ImageHelper from "../core/helper/ImageHelper";
import { MdDownloadDone } from "react-icons/md";
import { AiFillCalendar } from "react-icons/ai";
import styles from "../css/orderitem.module.css";
import { deleteOrderItem } from "./helper/userapicalls";
import { isSignin } from "../auth/helper";
//

export default function OrderItem({ product, setuserdata }) {
  function isDisable() {
    var futuredate = new Date(product.timestamp);
    let currentDate = new Date();
    futuredate.setDate(futuredate.getDate() + 7);
    if (futuredate.getDate() - currentDate.getDate() === 0) {
      return true;
    } else {
      return false;
    }
  }
  const authtoken = localStorage.getItem("token");
  const { id } = isSignin();
  function delteHandler() {
    deleteOrderItem(id, authtoken, product.uid)
      .then((data) => {
        console.log(data);
        setuserdata(data);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="d-flex flex-column gap-2 p-2 bg-light border-bottom">
      <div className="d-flex flex-column gap-1 justify-content-between">
        <p className={styles.orderstatus}>
          Received <MdDownloadDone color="green" />
        </p>
        <p className="small">
          <AiFillCalendar className={styles.icondate} />{" "}
          {new Date(product.timestamp).toLocaleDateString("en-IN")}
        </p>
      </div>
      <div
        className="d-flex gap-2 p-3"
        style={{ width: "maxContent", backgroundColor: "#f5f5f5" }}
      >
        <div>
          <ImageHelper
            style={{
              width: "60px",
              height: "80px",
              objectFit: "contain",
              alignSelf: "flex-start",
            }}
            parentstyle={{
              boxShadow: "none",
              width: "53px",
              height: "71px",
              marginTop: "5px",
            }}
            parentclassname="justify-content-start"
            product={product}
          ></ImageHelper>
        </div>
        <div
          className="col-md-8 d-flex flex-column justify-content-between align-items-left gap-1 p-2"
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <strong>{product.name}</strong>
          <p className="small">{product.description}</p>
          <p className="small">Size: {product.size}</p>
          <button
            className={`btn btn-danger btn-sm align-self-start my-2`}
            onClick={() => delteHandler()}
            disabled={isDisable()}
            title="Order can only be canceled within 7 days"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
