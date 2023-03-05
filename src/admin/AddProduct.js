import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getCategories,
  createaProduct,
  getAllSizeOptions,
} from "./helper/adminapicall";
import { isSignin } from "../auth/helper/index";
import { useHistory } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import Alert from "../user/Alert";
import styles from "../css/Addproduct.module.css";

const AddProduct = () => {
  const authtoken = localStorage.getItem("token");
  const { id } = isSignin();

  let location = useHistory();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    Availabelstock: "",
    image: "",
    categories: [],
    category: "",
    loading: false,
    sizeoptions: [],
    error: false,
    success: false,
    errormsg: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
    sizevaluesarry: [],
  });

  const {
    name,
    description,
    price,
    Availabelstock,
    categories,
    loading,
    error,
    createdProduct,
    formData,
    success,
    errormsg,
    sizeoptions,
    sizevaluesarry,
  } = values;

  function redirectToAdminHome() {
    if (!loading) {
      setTimeout(() => {
        location.push("/admin/dashboard");
      }, 2000);
    }
  }
  function preloadsizeoptions(categoriesdata) {
    getAllSizeOptions().then((sizedata) => {
      if (sizedata.errormsg) {
        setValues({ ...values, error: true, errormsg: sizedata.errormsg });
      } else {
        setValues({
          ...values,
          sizeoptions: sizedata,
          formData: new FormData(),
          categories: categoriesdata,
        });
      }
    });
  }

  useEffect(() => {
    const preload = (callback) => {
      getCategories().then((data) => {
        //console.log(data);
        if (data.errormsg) {
          setValues({ ...values, error: true, errormsg: data.errormsg });
        } else {
          callback(data);
        }
      });
    };
    preload(preloadsizeoptions);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    formData.append("sizevaluesarry", JSON.stringify(sizevaluesarry));
    createaProduct(id, authtoken, formData).then((data) => {
      if (data.errormsg) {
        setValues({ ...values, error: true, errormsg: data.errormsg });
      } else {
        setValues({
          ...values,
          success: true,
          name: "",
          description: "",
          price: "",
          image: "",
          Availabelstock: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
    redirectToAdminHome();
  };

  const handleChange = (name) => (event) => {
    if (name == "sizevaluesarry") {
      if (event.target.checked) {
        sizevaluesarry.push(event.target.value);
      } else {
        let indexofitem = sizevaluesarry.indexOf(event.target.value);
        sizevaluesarry.splice(indexofitem, 1);
      }
    }
    const value = name === "image" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, sizevaluesarry });
  };

  const createProductForm = () => (
    <form>
      <span>Post image</span>
      <div className="form-group mb-2">
        <label className={`btn btn-block btn-success ${styles.responsivebtn}`}>
          <input
            onChange={handleChange("image")}
            type="file"
            name="image"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group mb-2">
        <input
          onChange={handleChange("name")}
          name="image"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group mb-2">
        <textarea
          onChange={handleChange("description")}
          name="image"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group mb-2">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group mb-2">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Category</option>
          {categories.length &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group mb-3">
        {sizeoptions.length &&
          sizeoptions.map((s, index) => (
            <div key={index} className="form-check form-check-inline">
              <input
                className="form-check-input"
                onChange={handleChange("sizevaluesarry")}
                type="checkbox"
                id="inlineCheckbox1"
                value={s._id}
              />
              <label className="form-check-label" htmlFor="inlineCheckbox1">
                {s.name}
              </label>
            </div>
          ))}
      </div>
      <div className="form-group mb-2">
        <input
          onChange={handleChange("Availabelstock")}
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
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container p-4 border border-light-subtle"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        <BsArrowLeft />
      </Link>
      <div className="row bg-light text-dark rounded border border-light-subtle">
        <div className="col-md-8 offset-md-2">
          {success ? (
            <Alert
              alerttype="success"
              msg={`Product ${createdProduct} created successfully`}
            />
          ) : error ? (
            <Alert alerttype="danger" msg={errormsg} />
          ) : null}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
