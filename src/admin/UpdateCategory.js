import React from 'react'
import Base from '../core/Base'
import { useState, useEffect } from 'react'
import { BsArrowLeft } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { isSignin } from '../auth/helper';
import { getCategory, updatecategory } from './helper/adminapicall';
import Alert from '../user/Alert';


export default function UpdateCategory({ match }) {
    const { id, authtoken } = isSignin();

    const [values, setvalues] = useState({
        categoryName: "",
        error: false,
        success: false,
        errormsg: ""
    })
    const { categoryName, success, error, errormsg } = values
    const Onchange = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }
    const preload = (catgoryid) => {
        getCategory(catgoryid).then((data) => {
            if (data.errors || data.errormsg) {
                console.log(data.errormsg);
            } else {
                setvalues({
                    ...values,
                    categoryName: data.name
                })
            }
        })
    }
    useEffect(() => {
        preload(match.params.categoryid)
    }, [])

    const onClickhandler = () => {
        if (categoryName.length >= 3) {
            console.log(categoryName);
            updatecategory(id, authtoken, match.params.categoryid, { 'name': categoryName }).then((data) => {

                if (data.errors || data.errormsg) {
                    setvalues({
                        ...values,
                        categoryName: "",
                        error: true,
                        errormsg: data.errors ? "please fill the valid details" : data.errormsg
                    })
                } else {
                    setvalues({
                        ...values,
                        success: true,
                        categoryName: data.name,
                    })
                }
            })
        } else {
            setvalues({
                ...values,
                error: true,
                errormsg: "Category name should be at least 3 characters"
            })
        }

    }
    return (
        <>
            <Base className='container p-4 bg-info' title='Update category' description='You can Update multiple category'>
                <div className="row">
                    <div className="col-md-8 offset-md-2 bg-white text-dark p-4">
                        {success ? <Alert alerttype="success" msg="Category updated successfully" /> : error ? <Alert alerttype='danger' msg={errormsg} /> : null}
                        <div className="form-group mb-3">
                            <label htmlFor="category" className="form-label">Category:</label>
                            <input type="text" value={categoryName} onChange={Onchange} name="categoryName" id="category" className="form-control" placeholder='For Ex. Summer' required autoFocus />
                        </div>
                        <button type="button" onClick={() => onClickhandler()} className="btn btn-outline-info rounded-2">submit</button>
                        <br />
                        <Link to='/admin/dashboard' className="btn btn-outline-info rounded-2 m-2"><BsArrowLeft /></Link>
                    </div>
                </div>
            </Base>
        </>
    )
}
