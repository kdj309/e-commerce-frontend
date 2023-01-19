import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isSignin } from './index';

function PrivateRoute({ component: Component, ...rest }) {
    //let auth = useAuth();
    return (
        <Route
            {...rest}
            render={(props) =>
                isSignin() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}
export default PrivateRoute