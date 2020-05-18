import React from "react";
import App from "../App";
import config from "../config/site";
import Blog from "../components/blog/Blog";

export default () => (
  <App config={config}>
    <Blog path="blog" blogPosts={[]} />
  </App>
);
