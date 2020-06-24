import React from "react";
import App from "../App";
import theme from "../config/theme";
import footer from "../config/footer";
import HeadSection from "../components/home/HeadSection";
import navigation from "../config/navigation";
import PropTypes from "prop-types";
import ListExperienceView from "../components/home/ListExperienceView";

const ExperienceHome = () => (
  <App theme={theme} footer={footer} navigation={navigation}>
    <HeadSection details={{prefix: "", name: "My Projects", caption: "What I'm working on"}} navigation={navigation}/>
    <div>
      <ListExperienceView/>
    </div>
  </App>
);

ExperienceHome.propTypes = {
  data: PropTypes.object
};

export default ExperienceHome;
