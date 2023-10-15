import React, { lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Home from "./core/Home";
import AdminDashBoard from "./admin/AdminDashBoard";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import ProductInfo from "./user/ProductInfo";
import PaymentSuccess from "./payment/PaymentSuccess";
import PaymentFailure from "./payment/PaymentFailure";
import UserDashBoardPage from "./user/UserDashboardPage";
import UserOrderPage from "./user/UserOrderPage";
import ManageOrders from "./admin/ManageOrders";
import ManageUsers from "./admin/ManageUsers";
import MainHome from "./core/MainHome";
import { useMediaQuery } from "react-responsive";
import MobileHome from "./core/MobileHome";
import LazyComponent from "./core/helper/LazyComponent";
const Cart = lazy(() => import("./core/Cart"));
const AddCategory = lazy(() => import("./admin/AddCategory"));
const ManageCategories = lazy(() => import("./admin/ManageCategories"));
const UpdateCategory = lazy(() => import("./admin/UpdateCategory"));
const AddProduct = lazy(() => import("./admin/AddProduct"));
const UpdateProduct = lazy(() => import("./admin/UpdateProduct"));
const ManageProducts = lazy(() => import("./admin/ManageProducts"));
const UserUpdateForm = lazy(() => import("./user/UserUpdateForm"));

export default function Routes() {
  const isMobile = useMediaQuery({
    query: "(max-device-width: 480px)",
  });
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainHome />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/signin">
          <Signin />
        </Route>
        <PrivateRoute
          exact
          path="/user/dashboard"
          component={UserDashBoardPage}
        />
        <Route exact path="/user/orders" >
          <LazyComponent Component={UserOrderPage} pathname="/user/orders" />
        </Route>
        <PrivateRoute
          exact
          path="/product/:productid"
          component={ProductInfo}
        />
        <Route exact path="/user/update">
          <LazyComponent Component={UserUpdateForm} pathname="/user/update" />
        </Route>
        <PrivateRoute
          exact
          path="/products/:category?"
          component={!isMobile ? Home : MobileHome}
        />
        <AdminRoute
          exact
          path="/admin/dashboard"
          component={<AdminDashBoard />}
        />
        <Route exact path="/admin/create/category">
          <LazyComponent
            Component={AddCategory}
            pathname="/admin/create/category"
            isAdmin={true}
          />
        </Route>
        <Route exact path="/admin/categories">
          <LazyComponent
            Component={ManageCategories}
            pathname="/admin/categories"
            isAdmin={true}
          />
        </Route>

        <Route exact path="/admin/category/updateCategory/:categoryid">
          <LazyComponent
            Component={UpdateCategory}
            pathname="/admin/category/updateCategory/:categoryid"
            isAdmin={true}
          />
        </Route>
        <Route exact path="/admin/create/product">
          <LazyComponent
            Component={AddProduct}
            pathname="/admin/create/product"
            isAdmin={true}
          />
        </Route>
        <Route exact path="/admin/products">
          <LazyComponent
            Component={ManageProducts}
            pathname="/admin/products"
            isAdmin={true}
          />
        </Route>
        <Route exact path="/admin/product/updateproduct/:productid">
          <LazyComponent
            Component={UpdateProduct}
            pathname="/admin/product/updateproduct/:productid"
            isAdmin={true}
          />
        </Route>
        <AdminRoute exact path="/admin/orders" component={ManageOrders} />
        <AdminRoute exact path="/admin/users" component={ManageUsers} />
        <Route exact path="/Addtocart">
          <LazyComponent Component={Cart} pathname="/Addtocart" />
        </Route>
        <PrivateRoute exact path="/PaymentSuccess" component={PaymentSuccess} />
        <PrivateRoute exact path="/PaymentFailure" component={PaymentFailure} />
      </Switch>
    </Router>
  );
}
