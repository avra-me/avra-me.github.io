import React from "react";
import App from "../App";
import PropTypes from "prop-types";
import ListExperienceView from "../components/home/ListExperienceView";
import WaveJumbotron from "../components/common/WaveJumbotron";

const ExperienceHome = () => (
  <App showContactForm>
    <ListExperienceView headerComponent={WaveJumbotron}/>
  </App>
);

ExperienceHome.propTypes = {
  data: PropTypes.object
};

export default ExperienceHome;
