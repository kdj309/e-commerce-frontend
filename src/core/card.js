import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/card.module.css";

export default function Card({ showcount = false, count, product }) {
  const imageurl = product._id
    ? `https://eelicate.sirv.com/Images/product${product._id}.webp`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
      <div
        className={`text-dark bg-light text-left card my-2 ${styles["cardcontainer"]}`}
      >
        <div className={`${styles["card-body"]}`}>
          <img
            data-src={imageurl}
            className={`Sirv ${styles["card-img"]} card-profile-img`}
            alt={product?.name}
          />

          <div
            className={`${styles["card-header"]} fw-bold fs-5 lead text-wrap`}
          >
            {product?.name}
          </div>
          <p className={`small-text mx-1 ${styles["product-description"]}`}>
            {product?.description}
          </p>
          {showcount && (
            <p className="small-text text-white">Quantity: {count}</p>
          )}
          <div className="d-flex justify-content-between px-1 align-items-center">
            <p className="text-black fw-bold">₹ {product?.price}</p>
            <div className="row">
              <div className="col-12">
                <p
                  className="small-text  mt-2 mb-2"
                  style={{ color: "#ff5722" }}
                >
                  {product?.category?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
