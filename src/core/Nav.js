import React from 'react'
import { useHistory } from 'react-router-dom'
import { Link, useLocation } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { isSignin, Signout } from '../auth/helper'
function Nav() {
    let history = useHistory()
    let location = useLocation()
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark border-bottom border-white">
            <div className="container-fluid">
                <Link className="navbar-brand text-light" to='/'>T shirt</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`${location.pathname}` === "/" ? "nav-link text-light active" : "nav-link text-light"} to="/" aria-current="page" href="#">Home</Link>
                        </li>
                        {
                            isSignin() ? <li className="nav-item">
                                <span onClick={() => {
                                    Signout(() => {
                                        history.push('/signin')
                                    })
                                }} className="nav-link text-warning"  >Sign Out</span>
                            </li> :
                                <>
                                    <li className="nav-item">
                                        <Link className={`${location.pathname}` === "/signup" ? "nav-link text-light active" : "nav-link text-light"} to="/signup">Sign Up</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`${location.pathname}` === "/signin" ? "nav-link text-light active" : "nav-link text-light"} to="/signin">Sign In</Link>
                                    </li>
                                </>
                        }
                        <li className="nav-item">
                            <Link className={`${location.pathname}` === "/Addtocard" ? "nav-link text-light active" : "nav-link text-light"} to="/Addtocard">Cart</Link>
                        </li>
                        {
                            isSignin().role == 1 ? <li className="nav-item">
                                <Link className={`${location.pathname}` === "/admin/dashboard" ? "nav-link text-light active" : "nav-link text-light"} to="/admin/dashboard">Admin Dashboard</Link>
                            </li> : <li className="nav-item">
                                <Link className={`${location.pathname}` === "/user/dashboard" ? "nav-link text-light active" : "nav-link text-light"} to="/user/dashboard">User Dashboard</Link>
                            </li>
                        }
                        {/* <li className="nav-item">
                            <Link className={`${location.pathname}` === "/admin/dashboard" ? "nav-link active" : "nav-link"} to="/admin/dashboard">Admin Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`${location.pathname}` === "/user/dashboard" ? "nav-link active" : "nav-link"} to="/user/dashboard">User Dashboard</Link>
                        </li> */}
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}
export default withRouter(Nav)