import React, { useState, useEffect } from "react";
import { isSignin } from "../auth/helper";
import { deleteProduct, getAllproducts } from "./helper/adminapicall";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import Alert from "../user/Alert";
import AdminProduct from "./AdminProduct";
//
export default function ManageProducts() {
  const authtoken = localStorage.getItem("token");
  const { id } = isSignin();
  const [products, setproducts] = useState([]);
  const [values, setvalues] = useState({
    error: false,
    success: false,
    errormsg: "",
    deletedProduct: "",
  });
  const { success, error, errormsg, deletedProduct } = values;

  function DeleteTheProduct(productid) {
    deleteProduct(id, authtoken, productid).then((data) => {
      if (data.errormsg) {
        setvalues({
          ...values,
          error: true,
          errormsg: data.errormsg,
        });
      } else {
        setvalues({
          ...values,
          success: true,
          deletedProduct: data.name,
        });
        setproducts((previous) => {
          return previous.filter((product) => {
            return product._id !== productid;
          });
        });
      }
    });
  }
  useEffect(() => {
    const preload = () => {
      getAllproducts().then((data) => {
        if (data.errormsg) {
          console.log(data.errormsg);
        } else {
          setproducts(data);
          console.log(products);
        }
      });
    };
    preload();
  }, []);

  return (
    <Base
      title="Welcome admin"
      description="Manage products here"
      className="container"
    >
      <div className="d-flex gap-2">
        <h2>All products:</h2>
        <Link className="btn btn-info text-white" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
      </div>
      <div className="container d-flex justify-content-evenly flex-wrap align-items-center p-2 m-2 gap-2">
        {success ? (
          <Alert
            alerttype="success"
            msg={`Product ${deletedProduct} deleted successfully`}
          />
        ) : error ? (
          <Alert alerttype="danger" msg={errormsg} />
        ) : null}

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Category</th>
              <th scope="col">Stock</th>
              <th scope="col">Price</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <AdminProduct
                DeleteTheProduct={DeleteTheProduct}
                product={product}
                index={index + 1}
                key={product._id}
              ></AdminProduct>
            ))}
          </tbody>
        </table>
      </div>
    </Base>
  );
}
