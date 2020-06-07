import React from "react";
import App from "../App";
import theme from "../config/theme";
import Blog from "../components/blog/Blog";
import footer from "../config/footer";

export default () => (
  <App theme={theme} footer={footer}>
    <Blog path="blog" blogPosts={[]} />
  </App>
);
