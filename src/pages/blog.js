import React from "react";
import App from "../App";
import theme from "../config/theme";
import Blog from "../components/blog/Blog";

export default () => (
  <App theme={theme}>
    <Blog path="blog" blogPosts={[]} />
  </App>
);
