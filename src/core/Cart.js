import React, { useState, useEffect, useMemo } from "react";
import Base from "./Base";
import {
  emptyCart,
  incrementQuantity,
  removeItemfromCart,
  totalAmount,
} from "./helper/Cart_helper";
import StripePayment from "../payment/StripePayment";
import Cartcard from "./Cartcard";
import { AiTwotoneDelete } from "react-icons/ai";
import styles from "../css/CartMain.module.css";
//

export default function Cart() {
  const [products, setproducts] = useState([]);
  const [totalAmountrs, settotalAmount] = useState(totalAmount(products));
  const productsfromlocalstorage = useMemo(() => {
    if (localStorage.getItem("cart") != null) {
      return JSON.parse(localStorage.getItem("cart"));
    } else {
      return [];
    }
  }, [localStorage.getItem("cart")]);

  useEffect(() => {
    setproducts(productsfromlocalstorage);
    settotalAmount(() => {
      return totalAmount(productsfromlocalstorage);
    });
  }, [productsfromlocalstorage]);
  function removeProductfromCart(productid) {
    setproducts(removeItemfromCart(productid));
  }
  function CartEmpty() {
    setproducts(emptyCart());
  }
  function increaseQty(productid) {
    setproducts(incrementQuantity(productid));
  }
  return (
    <Base
      title="Welcome to your cart"
      description="Fashions fade. Style is eternal."
      className={`container ${styles.basediv}`}
    >
      <div className={`container ${styles.MainCartContainer}`}>
        <div
          className={`col-md-8 p-2 d-flex flex-column ${styles.cartitemswrapper}`}
        >
          {products?.length === 0 ? (
            <h3 className="text-white theme-color text-center">
              You are really gone miss some cool clothes in your wardrobe{" "}
              <span className="badge bg-success mr-2">
                buy some clothes man 😎!
              </span>
            </h3>
          ) : (
            products?.map((product) => {
              return (
                <Cartcard
                  showcount={true}
                  count={product.count}
                  removeItemhandler={removeProductfromCart}
                  isCartimage={true}
                  key={product._id}
                  product={product}
                  addtocart={false}
                  removefromcart={true}
                  increaseQty={increaseQty}
                />
              );
            })
          )}
          {products.length > 0 && (
            <button
              className={`btn btn-danger align-self-end my-2 ${styles.cartclearbtn}`}
              onClick={() => CartEmpty()}
            >
              <AiTwotoneDelete></AiTwotoneDelete>
            </button>
          )}
        </div>
        <div className="col-md-4 p-2">
          <div className={`${styles.paymentDivcontainer}`}>
            <p className="text-secondary">
              PRICE DETAILS {products.length} Item
            </p>
            <div className="d-flex justify-content-between my-2 align-items-center">
              <p>Total MRP</p>
              <p>₹ {totalAmountrs}</p>
            </div>
            {products.length > 0 && (
              <StripePayment
                products={products}
                reload={CartEmpty}
                className="btn-lg btn-block btn-danger"
                style={{ width: "100%" }}
                size={products.map((item) => item.size)}
              >
                PLACE ORDER
              </StripePayment>
            )}
          </div>
        </div>
      </div>
    </Base>
  );
}
