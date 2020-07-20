import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./extras/PrivateRoute";
import { ROUTES } from "./helpers/constants";
import Expenses from "./pages/Home";
import Dashboard from "./pages/Dashboard";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/" exact render={() => <Redirect to={ROUTES.HOME} />} />
      <PrivateRoute path="/" component={Dashboard} />
    </Switch>
  );
};

export default Routes;
