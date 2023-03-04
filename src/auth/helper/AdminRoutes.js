import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isSignin } from "./index";

function AdminRoute({ component: Component, ...rest }) {
  //let auth = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        isSignin() && isSignin().role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
export default AdminRoute;
