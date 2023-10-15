import React, { Suspense } from "react";
import { Redirect } from "react-router-dom";
import { isSignin } from "../../auth/helper";

export default function LazyComponent({
  pathname,
  Component,
  isAdmin = false,
}) {
  const AdminComponent = () => {
    return isSignin() && isSignin().role === 1 ? (
      <Component />
    ) : (
      <Redirect to={pathname} />
    );
  };
  const PrivateComponent = () => {
    return isSignin() ? <Component /> : <Redirect to={pathname} />;
  };
  return (
    <Suspense
      fallback={
        <div class="text-center spinner-grow" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      }
    >
      {isAdmin ? <AdminComponent /> : <PrivateComponent />}
    </Suspense>
  );
}
