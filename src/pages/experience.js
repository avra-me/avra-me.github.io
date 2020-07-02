import React from "react";
import App from "../App";
import theme from "../config/theme";
import footer from "../config/footer";
import HeadSection from "../components/home/HeadSection";
import navigation from "../config/navigation";
import PropTypes from "prop-types";
import ListExperienceView from "../components/home/ListExperienceView";
import WaveJumbotron from "../components/common/WaveJumbotron";

const ExperienceHome = () => (
  <App theme={theme} footer={footer} navigation={navigation}>
    <ListExperienceView headerComponent={WaveJumbotron}/>
  </App>
);

ExperienceHome.propTypes = {
  data: PropTypes.object
};

export default ExperienceHome;
