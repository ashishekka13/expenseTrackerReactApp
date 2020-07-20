import React from "react";
import { HashRouter } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Routes from "./Routes";
import { CssBaseline } from "@material-ui/core";
// import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Login from "./pages/Login";

function App() {
  return (
    <HashRouter>
      <CssBaseline />
      <Routes />;
    </HashRouter>
  );
}

export default App;
