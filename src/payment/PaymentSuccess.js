import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { createOrder, getPaymentInfo } from "../core/helper/orderHelper";
import { isSignin } from "../auth/helper";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
export default function PaymentSuccess() {
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
    }, 8000);
  };
  const history = useHistory();

  const pushtoHome = () => {
    setTimeout(() => {
      history.push("/");
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
    console.log(paymentInfo.paymentData.timestamp);
    let orderData = {
      categories: selectedProducts.map((product) => product.category.name),
      products: selectedProducts.map((product) => {
        return {
          product: {
            uid: uuidv4(),
            ...product,
          },
        };
      }),
      Status: "Received",
      transactionId: paymentId,
      amount: paymentInfo?.paymentData?.amount / 100,
      user: userid,
      userInfo: {
        address: {
          city: paymentInfo?.paymentData?.addressInfo?.city,
          country: paymentInfo?.paymentData?.addressInfo?.country,
          streetAddress: `${paymentInfo?.paymentData?.addressInfo?.line1}${
            paymentInfo?.paymentData?.addressInfo?.line2 &&
            paymentInfo?.paymentData?.addressInfo?.line2
          }`,
          postalCode: paymentInfo?.paymentData?.addressInfo?.postal_code,
          state: paymentInfo?.paymentData?.addressInfo?.state,
          timestamp: paymentInfo.paymentData.timestamp,
        },
      },
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
          msg: "Order received successfully",
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
          >
            {values.msg}
            style={{ width: "max-content", margin: "auto" }}
          </div>
        )}
      </div>

      <h2 className="dispaly-3 text-center">
        Payment <p className="badge bg-success">Success</p>
      </h2>
    </Base>
  );
}
