import React from "react";
import ImageHelper from "../core/helper/ImageHelper";
import { Link } from "react-router-dom";
import styles from "../css/AdminProduct.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
export default function AdminProduct({ product, DeleteTheProduct, index }) {
  return (
    <tr>
      <th scope="row">{index}</th>
      <td>
        <div className="d-flex gap-2 align-items-center">
          <ImageHelper
            product={product}
            className={styles.productimage}
            parentclassname={styles.imagewrapper}
          ></ImageHelper>
          <h6>{product.name}</h6>
        </div>
      </td>
      <td>{product.category.name}</td>
      <td>
        <p
          className={`${styles.availablestock}`}
          style={{
            color: product.Availabelstock > 0 ? "rgb(104 220 25)" : "#900",
            backgroundColor: "rgb(249 243 243)",
            width: "max-content",
          }}
        >
          {product.Availabelstock}
        </p>
      </td>
      <td>₹ {product.price}</td>
      <td>
        <Link
          to={`/admin/product/updateproduct/${product._id}`}
          className="btn btn-primary btn-sm"
        >
          <AiOutlineEdit />
        </Link>
      </td>
      <td>
        <button
          onClick={() => DeleteTheProduct(product._id)}
          className="btn btn-danger btn-sm"
          style={{ backgroundColor: "" }}
        >
          <MdDeleteOutline />
        </button>
      </td>
    </tr>
  );
}
