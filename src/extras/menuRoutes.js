import React from "react";
import Home from "../pages/Home";
import Expenses from "../pages/Expenses";
import MyAccount from "../pages/MyAccount";
import { ROUTES } from "../helpers/constants";

export const routes = [
  {
    key: "home",
    title: "Home",
    path: ROUTES.HOME,
    img: "store",
    exact: true,
    component: () => <Home />,
  },
  {
    key: "expenses",
    title: "My Expenses",
    path: ROUTES.EXPENSES,
    img: "shopping_cart",
    exact: true,
    component: () => <Expenses />,
  },
  {
    key: "account",
    title: "My Account",
    path: ROUTES.ACCOUNT,
    img: "people",
    exact: true,
    component: () => <MyAccount />,
  },
  {
    key: "logout",
    title: "Log Out",
    path: ROUTES.LOGIN,
    img: "lock",
    exact: true,
    component: () => <Home />,
  },
];

export default routes;
