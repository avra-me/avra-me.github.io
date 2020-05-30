import React from "react";
import App from "../App";
import config from "../config/site";
import Blog from "../components/blog/Blog";

const Page = () => (
  <App config={config}>
    <Blog path="blog" blogPosts={[]} />
  </App>
);

export const linkTitle = "Home";

export default Page;
