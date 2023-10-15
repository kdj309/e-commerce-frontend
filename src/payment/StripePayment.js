import React, { useEffect, useState } from "react";
import { isSignin } from "../auth/helper";
import { Link } from "react-router-dom";
import api from "../backend/Api";
import Alert from "../core/Alert";
import { totalAmount } from "../core/helper/Cart_helper";
import styles from "../css/stripepayment.module.css";

export default function StripePayment({
  products,
  children,
  className = styles["buynowbtns"],
  alertuser,
  size,
  style,
}) {
  const { id: userid, authtoken, email } = isSignin();
  const [paymentprocess, setpaymentprocess] = useState({
    success: false,
    error: false,
    loading: false,
    showAlert: false,
  });

  useEffect(() => {
    totalAmount(products);
    localStorage.setItem("selectedItems", JSON.stringify(products));
  }, [products]);

  const makePayment = () => {
    if (!size.length) {
      alertuser(true);
      return;
    }
    let body = {
      products,
      token: { userid, email, amount: totalAmount(products) },
    };
    setpaymentprocess((previous) => {
      return { ...previous, loading: true };
    });
    api(`/${userid}/paymentprocess`, {
      method: "POST",
      data: body,
    })
      .then((response) => {
        localStorage.setItem("paymentId", response.data.payementintentid);
        localStorage.setItem("transactionId", response.data.transactionId);
        // console.log(response.data)
        window.location.href = response.data.url;
      })
      .catch((err) => {
        setpaymentprocess({
          showAlert: true,
          success: false,
          loading: false,
          error: true,
        });
        setTimeout(() => {
          setpaymentprocess((previous) => {
            return { ...previous, showAlert: false };
          });
        }, 5000);
        console.log(err);
      });
  };

  return (
    <div>
      {authtoken ? (
        <button
          type="submit"
          onClick={makePayment}
          className={`btn ${className} my-2`}
          style={style}
        >
          {children}
        </button>
      ) : (
        <Link to="/sigin" className="btn btn-danger my-2">
          Sigin
        </Link>
      )}
      {paymentprocess.loading && paymentprocess.showAlert && (
        <Alert cls="primary" msg="Processing..." />
      )}
      {paymentprocess.error && paymentprocess.showAlert && (
        <Alert
          cls="danger"
          msg="Order canceled -- continue to shop around and checkout when you're ready."
        />
      )}
      {paymentprocess.success && paymentprocess.showAlert && (
        <Alert
          cls="success"
          msg="Order placed! You will receive an email confirmation."
        />
      )}
    </div>
  );
}
