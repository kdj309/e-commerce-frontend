import React from "react";
import { addItemtoCartandsaveitTolocalStorage } from "./helper/Cart_helper";
import { useHistory } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";
import styles from "../css/addtocart.module.css";
//
export default function Addtocart({
  addtocart,
  removeItemhandler,
  product,
  className,
  size,
  alertuser,
}) {
  let location = useHistory();
  return (
    <div className={className && className}>
      {addtocart ? (
        <button
          type="submit"
          onClick={() => {
            if (!size.length) {
              alertuser(true);
              return;
            }
            addItemtoCartandsaveitTolocalStorage(product, () => {
              location.push("/Addtocart");
            });
          }}
          className={`btn mt-2 mb-2 ${styles.addtocartbtns}`}
        >
          <BsFillCartCheckFill /> ADD TO CART
        </button>
      ) : (
        <button
          onClick={() => {
            if (!size.length) {
              alertuser(true);
              return;
            }
            removeItemhandler(product._id);
          }}
          type="submit"
          className={`btn btn-block ${styles.addtocartbtns} mt-2 mb-2`}
        >
          Remove from cart
        </button>
      )}
    </div>
  );
}
