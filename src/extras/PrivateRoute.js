import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../helpers/authHelper";

const PrivateRoute = ({ component: Component, ...props }) => {
  console.log("HUNT", { ...props });

  return (
    <Route
      {...props}
      render={(innerProps) =>
        isAuthenticated() ? (
          <Component {...innerProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
