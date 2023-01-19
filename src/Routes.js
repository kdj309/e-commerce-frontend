import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import ManageCategories from './admin/ManageCategories';
import ManageProducts from './admin/ManageProducts';
import UpdateCategory from './admin/UpdateCategory';
import UpdateProduct from './admin/UpdateProduct';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import Cart from './core/Cart';
import Home from './core/Home';
import AdminDashBoard from './user/AdminDashBoard';
import Signin from './user/Signin';
import Signup from './user/Signup';
import UserDashBoard from './user/UserDashBoard';


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
        <PrivateRoute exact path="/user/dashboard" component={UserDashBoard} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashBoard} />

        //!Category routes

        <AdminRoute exact path="/admin/create/category" component={AddCategory} />
        <AdminRoute exact path="/admin/categories" component={ManageCategories} />
        <AdminRoute exact path="/admin/categories" component={ManageCategories} />
        <AdminRoute exact path="/admin/category/updateCategory/:categoryid" component={UpdateCategory} />

        //!Product routes

        <AdminRoute exact path="/admin/create/product" component={AddProduct} />
        <AdminRoute exact path="/admin/products" component={ManageProducts} />
        <AdminRoute exact path="/admin/product/updateproduct/:productid" component={UpdateProduct} />
        //!cart routes
        <PrivateRoute exact path="/Addtocard" component={Cart} />

      </Switch>
    </Router>
  )
}
