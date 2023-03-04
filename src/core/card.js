import React from "react";
import { Link } from "react-router-dom";
import api from "../backend/Api";
import styles from "../css/card.module.css";

export default function Card({ showcount = false, count, product }) {
  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
      <div
        className={`text-dark bg-light text-left card my-2 ${styles["cardcontainer"]}`}
      >
        <div className={`${styles["card-body"]}`}>
          <img
            src={`${api}/product/photo/${product._id}`}
            className={`${styles["card-img"]}`}
            alt={product.name}
          />

          <div
            className={`${styles["card-header"]} fw-bold fs-5 lead text-wrap`}
          >
            {product.name}
          </div>
          <p className="small-text text-wrap mx-1">{product.description}</p>
          {showcount && (
            <p className="small-text text-white">Quantity: {count}</p>
          )}
          <div className="d-flex justify-content-between px-1 align-items-center">
            <p className="text-black fw-bold">₹ {product.price}</p>
            <div className="row">
              <div className="col-12">
                <p
                  className="small-text  mt-2 mb-2"
                  style={{ color: "#ff5722" }}
                >
                  {product.category.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
