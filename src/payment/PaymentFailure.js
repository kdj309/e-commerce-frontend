import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { createOrder, getPaymentInfo } from "../core/helper/orderHelper";
import { useHistory } from "react-router-dom";
import { isSignin } from "../auth/helper";
export default function PaymentFailure() {
  const history = useHistory();
  // createOrder
  const pushtoHome = () => {
    setTimeout(() => {
      history.push("/");
    }, 5000);
  };
  const [values, setvalues] = useState({
    loading: false,
    showalert: false,
    error: false,
    success: false,
    msg: "",
  });
  const scheduleAlert = () => {
    setTimeout(() => {
      setvalues((previous) => {
        return { ...previous, showalert: false };
      });
    }, 5000);
  };
  const authtoken = localStorage.getItem("token");
  const { id: userid } = isSignin();

  useEffect(() => {
    getpaymentDetails(() => {
      createAorder();
    });
    // pushtoHome()
  }, []);
  function getpaymentDetails(callback) {
    let paymentId = localStorage.getItem("paymentId");
    getPaymentInfo(userid, authtoken, paymentId)
      .then((data) => {
        localStorage.setItem("paymentInfo", JSON.stringify(data));
        callback();
        // pushtoHome();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function createAorder() {
    let paymentId = localStorage.getItem("paymentId");
    let selectedProducts = JSON.parse(localStorage.getItem("selectedItems"));
    let paymentInfo = JSON.parse(localStorage.getItem("paymentInfo"));
    console.log(paymentInfo);
    let orderData = {
      categories: selectedProducts.map((product) => product.category.name),
      products: selectedProducts.map((product) => {
        return {
          product: {
            ...product,
          },
        };
      }),
      Status: "Canceled",
      transactionId: paymentId,
      amount: paymentInfo?.paymentData?.amount,
      user: userid,
      timestamp: paymentInfo?.paymentData?.timestamp,
    };
    setvalues((previous) => {
      return { ...previous, loading: true, msg: "Loading...", showalert: true };
    });

    scheduleAlert();
    createOrder(userid, authtoken, orderData)
      .then((res) => {
        console.log(res);
        setvalues({
          loading: false,
          msg: "Order canceled due to some erros please try it once agian 👍",
          success: true,
          error: false,
          showalert: true,
        });
        scheduleAlert();
      })
      .catch((err) => {
        console.log(err);
        setvalues({
          loading: false,
          msg: "Some error occurred",
          success: false,
          error: true,
          showalert: true,
        });
        scheduleAlert();
      });
    pushtoHome();
  }

  return (
    <Base title="Welcome to PlanetShop">
      <div className="text-center d-inline">
        {values.showalert && (
          <div
            className={`d-inline alert alert-${
              values.success ? "success" : values.error ? "danger" : "secondary"
            } m-auto`}
            role="alert"
            style={{ width: "max-content", margin: "auto" }}
          >
            {values.msg}
          </div>
        )}
      </div>
      <h2 className="dispaly-3 text-center">
        Payment <p className="badge bg-danger">Failed</p>
      </h2>
    </Base>
  );
}
