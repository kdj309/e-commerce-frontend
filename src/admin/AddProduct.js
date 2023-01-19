import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, createaProduct } from "./helper/adminapicall";
import { isSignin } from "../auth/helper/index";
import { useHistory } from 'react-router-dom';
import { BsArrowLeft } from "react-icons/bs";
import Alert from "../user/Alert";



const AddProduct = () => {
    const { id, authtoken } = isSignin();

    let location = useHistory()

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        Availabelstock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        size: "",
        error: false,
        success: false,
        errormsg: "",
        createdProduct: "",
        getaRedirect: false,
        formData: ""
    });

    const {
        name,
        description,
        price,
        Availabelstock,
        categories,
        category,
        loading,
        error,
        createdProduct,
        getaRedirect,
        formData,
        size,
        success,
        errormsg
    } = values;

    function redirectToAdminHome() {
        if (!loading) {
            setTimeout(() => {
                location.push('/admin/dashboard')
            }, 2000);
        }
    }

    const preload = () => {
        getCategories().then(data => {
            //console.log(data);
            if (data.errormsg) {
                setValues({ ...values, error: true, errormsg: data.errormsg });
            } else {
                setValues({ ...values, categories: data, formData: new FormData() });
            }
        });
    };

    useEffect(() => {
        preload();
    }, []);

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        createaProduct(id, authtoken, formData).then(data => {
            if (data.errormsg) {
                setValues({ ...values, error: true, errormsg: data.errormsg });
            } else {
                setValues({
                    ...values,
                    success: true,
                    name: "",
                    description: "",
                    price: "",
                    photo: "",
                    Availabelstock: "",
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
        redirectToAdminHome()
    };

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };



    const createProductForm = () => (
        <form>
            <span>Post photo</span>
            <div className="form-group mb-2">
                <label className="btn btn-block btn-success">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group mb-2">
                <input
                    onChange={handleChange("name")}
                    name="photo"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group mb-2">
                <textarea
                    onChange={handleChange("description")}
                    name="photo"
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
                    <option>Select</option>
                    {categories &&
                        categories.map((cate, index) => (
                            <option key={index} value={cate._id}>
                                {cate.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group mb-3">
                <select
                    onChange={handleChange('size')}
                    name='size'
                    className="form-control"
                    placeholder="Size"
                >
                    <option>Size</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="L">L</option>
                    <option value="SM">M</option>

                </select>
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
            className="container bg-info p-4"
        >
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
                <BsArrowLeft />
            </Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {success ? <Alert alerttype="success" msg={`Product ${createdProduct} created successfully`} /> : error ? <Alert alerttype='danger' msg={errormsg} /> : null}
                    {createProductForm()}
                </div>
            </div>
        </Base>
    );
};

export default AddProduct;
