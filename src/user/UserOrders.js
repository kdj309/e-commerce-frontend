import React from "react";
import OrderItem from "./OrderItem";
import useOrderData from "./helper/useOrderData";
import styles from "../css/Order.module.css";

export default function UserOrders() {
  const { userData, status, setuserData } = useOrderData();
  return (
    <div className={`${styles.ordercontainer}`}>
      {status === "success" ? (
        userData?.purchase?.length === 0 ? (
          <strong className="text-center">Order Cart is Empty</strong>
        ) : (
          userData?.purchase?.map((productItem, index) => {
            return (
              <OrderItem
                key={index}
                setuserdata={setuserData}
                product={productItem}
              ></OrderItem>
            );
          })
        )
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
