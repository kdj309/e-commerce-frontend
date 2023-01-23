import React, { useEffect, useState } from "react";
import { isSignin } from "../auth/helper";
import { Link, useHistory } from "react-router-dom";
import api from "../backend/Api";
import Alert from "../core/Alert";
import { createOrder } from "../core/helper/orderHelper";
export default function StripePayment({ products, reload }) {
  const { id: userid, authtoken, email, Name } = isSignin();

  let location = useHistory();
  const [paymentprocess, setpaymentprocess] = useState({
    loading: false,
    success: false,
    error: false,
    showAlert: false,
  });
  useEffect(() => {
    let id;
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    console.log("executing useEffect");
    if (query.get("success")) {
      let transId;
      if (localStorage.getItem("transactionId") != null) {
        transId = localStorage.getItem("transactionId");
      }
      console.log("order processing");
      let orderData = {
        products,
        Status: "Recieved",
        transactionId: transId,
        amount: totalAmount(),
        user: userid,
      };
      createOrder(userid, authtoken, orderData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setpaymentprocess({
        showAlert: true,
        success: true,
        loading: false,
        error: false,
      });
      id = setTimeout(() => {
        setpaymentprocess((previous) => {
          return { ...previous, showAlert: false };
        });
      }, 2000);
      reload();
      pushtoHome();
    }

    if (query.get("canceled")) {
      setpaymentprocess({
        showAlert: true,
        success: false,
        loading: false,
        error: true,
      });
      id = setTimeout(() => {
        setpaymentprocess((previous) => {
          return { ...previous, showAlert: false };
        });
      }, 2000);
    }
    return () => {
      clearTimeout(id);
    };
  }, []);

  const pushtoHome = () => {
    setTimeout(() => {
      location.push("/");
    }, 2000);
  };
  useEffect(() => {
    totalAmount();
  }, [products]);

  const totalAmount = () => {
    return products.reduce((total, product) => {
      return total + Math.floor(product.price * product.count);
    }, 0);
  };

  const makePayment = () => {
    let body = {
      products,
      token: { userid, email, amount: totalAmount() },
    };
    setpaymentprocess((previous) => {
      return { ...previous, loading: true };
    });
    fetch(`${api}/${userid}/paymentprocess`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authtoken}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        localStorage.setItem("transactionId", response.transactionId);
        window.location.href = response.url;
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
        }, 2000);
        console.log(err);
      });
  };

  return (
    <div className="d-flex flex-column justify-content-between gap-2">
      <h2>Stripe Checkout {totalAmount()} rs</h2>
      {authtoken ? (
        <button onClick={makePayment} className="btn btn-success">
          Pay with stripe
        </button>
      ) : (
        <Link to="/sigin" className="btn btn-danger">
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
