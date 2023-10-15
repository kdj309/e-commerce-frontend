import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { BsArrowLeft } from "react-icons/bs";
import { getproduct, updateProduct } from "./helper/adminapicall";
import { isSignin } from "../auth/helper";
import Alert from "../user/Alert";
import { useHistory } from "react-router-dom";

export default function UpdateProduct({ match }) {
  const authtoken = localStorage.getItem("token");
  const { id } = isSignin();

  let location = useHistory();

  const [productfields, setproductfields] = useState({
    name: "",
    categories: [
      {
        _id: "61d6da462702763230409c97",
        name: "Shirt",
        createdAt: "2022-01-06T12:02:14.372Z",
        updatedAt: "2022-01-06T12:02:14.372Z",
        __v: 0,
      },
      {
        _id: "624c71c885742b40604de445",
        createdAt: "2022-04-05T16:43:52.984Z",
        updatedAt: "2022-04-06T05:07:16.933Z",
        __v: 0,
        name: "T-shirt",
      },
      {
        _id: "63d9334b5fe9acfdab52e172",
        name: "Jackets",
        createdAt: "2022-02-05T16:30:52.984Z",
      },
    ],
    category: "",
    description: "",
    price: "",
    Availabelstock: "",
    size: "",
    image: "",
    loading: false,
    error: false,
    errormsg: "",
    formData: new FormData(),
    UpdatedProduct: "",
    success: false,
    sizevaluesarry: [],
  });

  const {
    name,
    category,
    categories,
    description,
    price,
    Availabelstock,
    loading,
    error,
    errormsg,
    formData,
    UpdatedProduct,
    success,
    sizevaluesarry,
  } = productfields;

  function redirectToAdminHome() {
    if (!loading) {
      setTimeout(() => {
        location.push("/admin/dashboard");
      }, 2000);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setproductfields({ ...productfields, loading: true });
    updateProduct(id, authtoken, match.params.productid, formData).then(
      (data) => {
        if (data.errormsg) {
          setproductfields({
            ...productfields,
            error: true,
            errormsg: data.errors
              ? "please fill the valid details"
              : data.errormsg,
          });
        } else {
          setproductfields({
            ...productfields,
            success: true,
            loading: false,
            name: "",
            category: "",
            description: "",
            price: "",
            Availabelstock: "",
            size: "",
            image: "",
            UpdatedProduct: data.name,
          });
        }
      }
    );
    redirectToAdminHome();
  };

  useEffect(() => {
    function preload() {
      getproduct(match.params.productid).then((data) => {
        if (data.errors || data.errormsg) {
          setproductfields({
            ...productfields,
            error: true,
            errormsg: data.errors
              ? "please fill the valid details"
              : data.errormsg,
          });
        } else {
          setproductfields({
            ...productfields,
            formData: new FormData(),
            name: data.name,
            category: data.category._id,
            description: data.description,
            price: data.price,
            Availabelstock: data.Availabelstock,
            size: data.size,
          });
        }
      });
    }
    preload();
  }, []);

  const Onchange = (e) => {
    if (e.target.name === "sizevaluesarry") {
      if (e.target.checked) {
        sizevaluesarry.push(e.target.value);
      } else {
        let indexofitem = sizevaluesarry.indexOf(e.target.value);
        sizevaluesarry.splice(indexofitem, 1);
      }
      formData.set(e.target.name, JSON.stringify(sizevaluesarry));
    } else {
      let value =
        e.target.name === "image" ? e.target.files[0] : e.target.value;
      formData.set(e.target.name, value);
      setproductfields({
        ...productfields,
        [e.target.name]: value,
        sizevaluesarry,
      });
    }
  };

  return (
    <Base
      className="container p-4 bg-info"
      title="Manage categories"
      description="You can Handle the categories operations"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2 bg-white text-dark p-4">
          <Link
            to="/admin/dashboard"
            className="btn btn-outline-info rounded-2 m-2"
          >
            <BsArrowLeft />
          </Link>
          {success ? (
            <Alert
              alerttype="success"
              msg={`Product ${UpdatedProduct} updated successfully`}
            />
          ) : error ? (
            <Alert alerttype="danger" msg={errormsg} />
          ) : null}

          <form id="myform">
            <span>Post photo</span>
            <div className="form-group mb-3">
              <label className="btn btn-block btn-success">
                <input
                  onChange={Onchange}
                  type="file"
                  name="image"
                  accept="image"
                  placeholder="choose a file"
                />
              </label>
            </div>
            <div className="form-group mb-3">
              <input
                onChange={Onchange}
                name="name"
                className="form-control"
                placeholder="Name"
                value={name}
              />
            </div>
            <div className="form-group mb-3">
              <textarea
                onChange={Onchange}
                name="description"
                className="form-control"
                placeholder="Description"
                value={description}
              />
            </div>
            <div className="form-group mb-3">
              <input
                onChange={Onchange}
                name="price"
                type="number"
                className="form-control"
                placeholder="Price"
                value={price}
              />
            </div>
            <div className="form-group mb-3">
              <select
                onChange={Onchange}
                name="category"
                className="form-control"
                placeholder="Category"
                value={category}
              >
                <option>Category</option>
                {categories.length &&
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group mb-3">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  onChange={Onchange}
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="63d504c0328c8d26a8959c8b"
                  name="sizevaluesarry"
                />
                <label className="form-check-label" htmlFor="inlineCheckbox1">
                  XL
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  onChange={Onchange}
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="63d25ae52cfec5185816f585"
                  name="sizevaluesarry"
                />
                <label className="form-check-label" htmlFor="inlineCheckbox1">
                  XXL
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  onChange={Onchange}
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="63d25ac62cfec5185816f584"
                  name="sizevaluesarry"
                />
                <label className="form-check-label" htmlFor="inlineCheckbox1">
                  L
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  onChange={Onchange}
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="63d504a0328c8d26a8959c8a"
                  name="sizevaluesarry"
                />
                <label className="form-check-label" htmlFor="inlineCheckbox1">
                  M
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  onChange={Onchange}
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="63d505a521663120a45caac9"
                  name="sizevaluesarry"
                />
                <label className="form-check-label" htmlFor="inlineCheckbox1">
                  S
                </label>
              </div>
            </div>
            <div className="form-group mb-3">
              <input
                onChange={Onchange}
                name="Availabelstock"
                type="number"
                className="form-control"
                placeholder="Availabelstock"
                value={Availabelstock}
              />
            </div>

            <button
              type="submit"
              onClick={onSubmit}
              className="btn btn-outline-success mb-3"
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    </Base>
  );
}
