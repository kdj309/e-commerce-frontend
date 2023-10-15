import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { isSignin, Signout } from "../auth/helper";
import { BiUserCircle } from "react-icons/bi";
import { BsHandbag } from "react-icons/bs";
import { RiAdminLine } from "react-icons/ri";
import logo from "../assets/myntracopy.svg";
import styles from "../css/nav.module.css";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setfilteredProducts } from "../store/filterslice";

function Nav() {
  const filteroptions = useSelector((state) => state.filteroptions);
  const { productstofilter } = filteroptions;

  let history = useHistory();
  let location = useLocation();
  const dispatcher = useDispatch();

  const searchproducts = () => {
    const filteredproducts = productstofilter?.filter((product) => {
      if (ToLowerCase(product.name) === ToLowerCase(searchvalue)) {
        return true;
      }
      if (ToLowerCase(product.category.name) === ToLowerCase(searchvalue)) {
        return true;
      }
      if (ToLowerCase(product.description).includes(ToLowerCase(searchvalue))) {
        return true;
      }
    });
    if (filteredproducts.length) {
      return filteredproducts;
    } else {
      return productstofilter;
    }
  };

  function ToLowerCase(str) {
    return str.toLowerCase();
  }

  function submitHandler(e) {
    e.preventDefault();
    dispatcher(setfilteredProducts(searchproducts()));
  }
  const [searchvalue, setsearchvalue] = useState("");
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light border-bottom border-white">
      <div className="container-fluid px-3">
        <Link className={`navbar-brand text-dark ${styles.logolink}`} to="/">
          <img className={styles.brandimg} alt="" src={logo}></img>
        </Link>
        <button
          className={`navbar-toggler ${styles.btnmain}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-self-center m-auto">
            <li className="nav-item">
              <Link
                className={
                  `${location.pathname}` === "/"
                    ? "nav-link text-dark active"
                    : "nav-link text-dark"
                }
                to="/"
                aria-current="page"
                href="#"
              >
                HOME
              </Link>
            </li>
            {isSignin() ? (
              <li className="nav-item">
                <Link
                  onClick={() => {
                    Signout(() => {
                      history.push("/signin");
                    });
                  }}
                  className="nav-link text-warning"
                  to="/"
                >
                  LOGOUT
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className={
                      `${location.pathname}` === "/signup"
                        ? "nav-link text-dark active"
                        : "nav-link text-dark"
                    }
                    to="/signup"
                  >
                    SIGNUP
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      `${location.pathname}` === "/signin"
                        ? "nav-link text-dark active"
                        : "nav-link text-dark"
                    }
                    to="/signin"
                  >
                    LOGIN
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className={`${styles["navigation-div"]} gap-3`}>
            {isSignin().role === 1 ? (
              <Link
                className={
                  `${location.pathname}` === "/admin/dashboard"
                    ? "nav-link text-dark active"
                    : "nav-link text-dark"
                }
                to="/admin/dashboard"
              >
                <RiAdminLine fontSize={22} />
              </Link>
            ) : (
              <Link
                className={
                  `${location.pathname}` === "/user/dashboard"
                    ? "nav-link text-dark active"
                    : "nav-link text-dark"
                }
                to="/user/dashboard"
              >
                <BiUserCircle fontSize={22} />
              </Link>
            )}
            <Link
              className={
                `${location.pathname}` === "/Addtocart"
                  ? "nav-link text-dark active"
                  : "nav-link text-dark"
              }
              to="/Addtocart"
            >
              <BsHandbag fontSize={22} />
            </Link>
            {location.pathname.includes("/products") && (
              <form className="d-flex" onSubmit={submitHandler}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => setsearchvalue(e.target.value)}
                />
                <button className="btn" type="submit">
                  <IoIosSearch color="grey" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default withRouter(Nav);
