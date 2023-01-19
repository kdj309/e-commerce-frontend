import React, { useState, useEffect } from 'react'
import { isSignin } from '../auth/helper'
import { deleteProduct, getAllproducts } from './helper/adminapicall'
import { ImPriceTags } from "react-icons/im";
import { MdProductionQuantityLimits } from "react-icons/md";
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import Alert from '../user/Alert';
//
export default function ManageProducts() {
    const { id, authtoken } = isSignin();
    const [products, setproducts] = useState([])
    const [values, setvalues] = useState({
        error: false,
        success: false,
        errormsg: "",
        deletedProduct: ""
    })
    const { success, error, errormsg, deletedProduct } = values
    const preload = () => {
        getAllproducts().then((data) => {
            if (data.errormsg) {
                console.log(data.errormsg);
            } else {
                setproducts(data)
                console.log(products);
            }
        })
    }
    function DeleteTheProduct(productid) {
        deleteProduct(id, authtoken, productid).then((data) => {
            if (data.errormsg) {
                setvalues({
                    ...values,
                    error: true,
                    errormsg: data.errormsg,
                })
            } else {
                setvalues({
                    ...values,
                    success: true,
                    deletedProduct: data.name,
                })
                setproducts((previous) => {
                    return previous.filter((product) => {
                        return product._id != productid
                    })
                })
                console.log('something wrong');

            }
        })
    }
    useEffect(() => {
        preload()
    }, [])

    return (
        <Base title="Welcome admin" description="Manage products here">
            <h2 className="mb-4">All products:</h2>
            <Link className="btn btn-info" to={`/admin/dashboard`}>
                <span className="">Admin Home</span>
            </Link>

            <div className='container d-flex justify-content-evenly flex-wrap align-items-center p-2 m-2 gap-2'>
                {success ? <Alert alerttype="success" msg={`Product ${deletedProduct} deleted successfully`} /> : error ? <Alert alerttype='danger' msg={errormsg} /> : null}
                {products.map((product) => (
                    <div key={product._id} className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title text-dark">{product.name}</h5>
                            <p className="card-text text-dark">{product.description}</p>
                            <div className='d-flex justify-content-between'>
                                <p className='small-text text-dark'><ImPriceTags fontSize={22} /> {product.price}</p>
                                <p className='small-text text-dark'><MdProductionQuantityLimits fontSize={22} />
                                    {product.Availabelstock}</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <Link to={`/admin/product/updateproduct/${product._id}`} className="btn btn-primary">Update</Link>
                                <button onClick={() => DeleteTheProduct(product._id)} className="btn btn-danger">Delete</button>
                            </div>

                        </div>
                    </div>
                ))}

            </div>
        </Base>
    )
}
