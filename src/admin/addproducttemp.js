import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Base from '../core/Base'
import { BsArrowLeft } from "react-icons/bs";
import { CreateProduct, getCategories } from './helper/adminapicall';
import { isSignin } from '../auth/helper';
import Alert from '../user/Alert';
import { useHistory } from 'react-router-dom';

export default function AddProduct() {
    const { id, authtoken } = isSignin();

    let location = useHistory()

    const [productfields, setproductfields] = useState({
        name: "",
        categories: [],
        category: "",
        description: "",
        price: "",
        Availabelstock: "",
        size: "",
        image: "",
        loading: false,
        error: false,
        errormsg: "",
        formData: "",
        createdProduct: "",
        success: false

    })


    const { name, category, categories, description, price, Availabelstock, size, image, loading, error, errormsg, formData, createdProduct, success } = productfields


    function redirectToAdminHome() {
        if (!loading) {
            setTimeout(() => {
                location.push('/admin/dashboard')
            }, 2000);
        }
    }


    const onSubmit = ((e) => {
        e.preventDefault();
        setproductfields({ ...productfields, error: "", loading: true });
        CreateProduct(id, authtoken, formData).then(data => {
            if (data.errormsg) {
                setproductfields({ ...productfields, error: true, error: data.errormsg });
            } else {
                setproductfields({
                    ...productfields,
                    name: "",
                    description: "",
                    price: "",
                    image: "",
                    Availabelstock: "",
                    size: "",
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
        redirectToAdminHome()
    })


    function preload() {
        getCategories().then((data) => {
            if (data.errors || data.errormsg) {
                setproductfields({
                    ...productfields,
                    error: true,
                    errormsg: data.errors ? "please fill the valid details" : data.errormsg
                })
            } else {
                setproductfields({
                    ...productfields,
                    categories: data,
                    formData: new FormData()
                })
            }
        })

    }


    useEffect(() => {
        preload()
    }, [])


    const Onchange = (e) => {
        let value = e.target.name == 'image' ? e.target.files[0] : e.target.value
        formData.set(e.target.name, e.target.value)
        setproductfields({ ...productfields, [e.target.name]: value })

    }


    return (
        <Base className='container p-4 bg-info' title='Manage categories' description='You can Handle the categories operations'>
            <div className="row">
                <div className="col-md-8 offset-md-2 bg-white text-dark p-4">
                    <Link to='/admin/dashboard' className="btn btn-outline-info rounded-2 m-2"><BsArrowLeft /></Link>
                    {success ? <Alert alerttype="success" msg={`Product ${createdProduct} created successfully`} /> : error ? <Alert alerttype='danger' msg={errormsg} /> : null}

                    <form>
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
                                name='price'
                                type="number"
                                className="form-control"
                                placeholder="Price"
                                value={price}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <select
                                onChange={Onchange}
                                name='category'
                                className="form-control"
                                placeholder="Category"
                            >
                                <option>Category</option>
                                {
                                    categories.map((category) => (
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    ))
                                }

                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <select
                                onChange={Onchange}
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
                        <div className="form-group mb-3">
                            <input
                                onChange={Onchange}
                                name='Availabelstock'
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
                </div>
            </div>
        </Base>
    )
}
