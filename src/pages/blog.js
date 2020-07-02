import React from "react";
import App from "../App";
import {Typography} from "@material-ui/core";
import WaveJumbotron from "../components/common/WaveJumbotron";

const Blog = () => (
  <App>
    <WaveJumbotron title={"Blog"}/>
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
