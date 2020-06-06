import React from "react";
import App from "../App";
import Home from "../components/home/Home";
import theme from "../config/theme";
import home from "../config/home";

export default () => (
  <App theme={theme}>
    <Home about={home}  />
  </App>
);
