import React from "react";
import App from "../App";
import Home from "../components/home/Home";
import theme from "../config/theme";
import home from "../config/home";
import footer from "../config/footer";
import navigation from "../config/navigation";
import {graphql} from "gatsby";

const Index =  ({data}) => (
  <App theme={theme} footer={footer}  navigation={navigation}>
      <Home about={home} navigation={navigation}/>
  </App>
);

export default Index;
