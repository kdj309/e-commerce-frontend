import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageCategories from "./admin/ManageCategories";
import ManageProducts from "./admin/ManageProducts";
import UpdateCategory from "./admin/UpdateCategory";
import UpdateProduct from "./admin/UpdateProduct";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Cart from "./core/Cart";
import Home from "./core/Home";
import AdminDashBoard from "./admin/AdminDashBoard";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import ProductInfo from "./user/ProductInfo";
import PaymentSuccess from "./payment/PaymentSuccess";
import PaymentFailure from "./payment/PaymentFailure";
import UserDashBoardPage from "./user/UserDashboardPage";
import UserOrderPage from "./user/UserOrderPage";
import UserUpdateForm from "./user/UserUpdateForm";
import ManageOrders from "./admin/ManageOrders";
import ManageUsers from "./admin/ManageUsers";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
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
        <PrivateRoute exact path="/user/orders" component={UserOrderPage} />
        <PrivateRoute
          exact
          path="/product/:productid"
          component={ProductInfo}
        />
        <PrivateRoute exact path="/user/update" component={UserUpdateForm} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashBoard} />

        <AdminRoute
          exact
          path="/admin/create/category"
          component={AddCategory}
        />
        <AdminRoute
          exact
          path="/admin/categories"
          component={ManageCategories}
        />

        <AdminRoute
          exact
          path="/admin/category/updateCategory/:categoryid"
          component={UpdateCategory}
        />
        <AdminRoute exact path="/admin/create/product" component={AddProduct} />
        <AdminRoute exact path="/admin/products" component={ManageProducts} />
        <AdminRoute
          exact
          path="/admin/product/updateproduct/:productid"
          component={UpdateProduct}
        />
        <AdminRoute exact path="/admin/orders" component={ManageOrders} />
        <AdminRoute exact path="/admin/users" component={ManageUsers} />
        <PrivateRoute exact path="/Addtocard" component={Cart} />
        <PrivateRoute exact path="/PaymentSuccess" component={PaymentSuccess} />
        <PrivateRoute exact path="/PaymentFailure" component={PaymentFailure} />
      </Switch>
    </Router>
  );
}
