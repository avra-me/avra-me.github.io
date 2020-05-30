import React from "react";
import App from "../App";
import Home from "../components/home/Home";
import config from "../config/site";

const Index = () => (
  <App config={config}>
    <Home/>
  </App>
);

export const linkTitle = "Home";

export default Index;