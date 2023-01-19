import React, { useState } from 'react'
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom'
import { authenticate, isSignin, signin } from '../auth/helper';
import Alert from './Alert';
export default function Signin() {
    let location = useHistory()
    const [user, setuser] = useState({
        email: "",
        password: "",
        didredirect: false
    })
    const [error, seterror] = useState("")
    const [success, setsuccess] = useState(false)
    function submithandler(e) {
        e.preventDefault()
        if (!user.email || !user.password) {
            alert("please mention the details");
            return
        }
        signin({ email: user.email, password: user.password }).then((data) => {
            //console.log(data.user);
            if (data.user) {
                authenticate(data.user, () => {
                    seterror("")
                    setsuccess(true)
                    setuser({
                        ...user,
                        email: "",
                        password: "",
                        didredirect: true
                    })
                    let returnuser = isSignin()
                    console.log(returnuser.role);
                    if (returnuser.role) {
                        location.push('/admin/dashboard')
                    } else {
                        location.push('/user/dashboard')
                    }
                })
            } else {
                seterror(() => {
                    return data.errors ? "please fill the valid details" : data.errormsg
                })
            }
        })
    }
    function OnChange(e) {
        setuser({ ...user, [e.target.name]: e.target.value })
    }
    document.body.style = 'background: #f8f9fa;';
    return (
        <div className='my-3 mx-auto d-flex flex-column justify-content-evenly p-3 signup-container'>
            <div className='mx-auto' style={{ width: "max-content" }}>
                <img src='./images/Tshirtlogo.png' className='mx-auto' style={{ width: "200px", height: "200px" }} alt='logo'></img>
                <h3 className='text-center'>Coders Tshirt</h3>
            </div>
            {success ? <Alert alerttype="success" msg="Login success" /> : error.length > 3 ? <Alert alerttype='danger' msg={error} /> : null}
            <div style={{ width: "85%" }} className='mx-auto'>
                <form onSubmit={submithandler}>
                    <div className="mb-3">
                        <label htmlFor="Email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="Email" name='email' value={user.email} onChange={OnChange} required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Password1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="Password1" name='password' value={user.password} onChange={OnChange} minLength={5} required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg bg-theme-color rounded-2">Login</button>
                </form>
                <div>
                    <p>Don't have an Account <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    )
}
