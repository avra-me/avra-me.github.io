import React from "react";
import App from "../App";
import Home from "../components/home/Home";
import config from "../config/site";

export default () => (
  <App config={config}>
    <Home about={config.about}  />
  </App>
);
