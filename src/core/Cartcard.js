import React from "react";
import styles from "../css/cart.module.css";
export default function Cartcard({ product, removeItemhandler, increaseQty }) {
  return (
    <div className={styles.cartmaincontainer}>
      <div className="col-md-4 m-2">
        <img
          className={`${styles.cartimg}`}
          src={`${process.env.REACT_APP_BASE_URL}/product/photo/${product._id}`}
          alt=""
        />
      </div>
      <div className={`col-md-8 ${styles.textdiv}`}>
        <h5>{product.name}</h5>
        <p className="small-text">{product.description}</p>
        <div className={`${styles.cartbtnscontainer}`}>
          <button className="btn btn-outline-danger btn-sm">
            Size: {product.size}
          </button>
          <p className="text-secondary">Only {product.Availabelstock} left!</p>
          <div className={styles.quantitybtncontainer}>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => increaseQty(product._id)}
            >
              +
            </button>
            <p>Qty: {product.count}</p>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => removeItemhandler(product._id)}
            >
              -
            </button>
          </div>
        </div>
        <h4>₹ {product.price}</h4>
      </div>
    </div>
  );
}
