import React from "react";
import App from "../App";
import theme from "../config/theme";
import footer from "../config/footer";
import HeadSection from "../components/home/HeadSection";
import {Typography} from "@material-ui/core";

export default () => (
  <App theme={theme} footer={footer}>
    <HeadSection details={{prefix: "", name: "My Projects", caption: "What I'm working on"}}/>
    <div>
      <div className="container-fluid lg-p-top">
        <Typography variant="h3" align="center">
          Sorry nothing here yet, I am working on it though!
        </Typography>
      </div>
    </div>
  </App>
);
