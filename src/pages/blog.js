import React from "react";
import App from "../App";
import {Typography} from "@material-ui/core";
import SourcedHomeJumbotron from "../components/home/SourcedHomeJumbotron";

const Blog = () => (
  <App>
    <SourcedHomeJumbotron title={"Blog"} subTitle={"Sorry nothing here yet, I am working on it though!"}/>
    <div>
      <div className="container-fluid lg-p-top">
        <Typography variant="h3" align="center">
          Sorry nothing here yet, I am working on it though!
        </Typography>
      </div>
    </div>
  </App>
);

export default Blog;
