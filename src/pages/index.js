import React from "react";
import App from "../App";
import Home from "../components/home/Home";
import theme from "../config/theme";
import home from "../config/home";
import footer from "../config/footer";

export default () => (
  <App theme={theme} footer={footer}>
    <Home about={home}  />
  </App>
);
