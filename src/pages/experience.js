import React from "react";
import App from "../App";
import PropTypes from "prop-types";
import ListExperienceView from "../components/home/ListExperienceView";
import Container from "@material-ui/core/Container";
import WaveJumbotron from "../components/common/WaveJumbotronHeader";

const ExperienceHome = () => {
  return (
    <App showContactForm>
      <WaveJumbotron
        title={"Experience"}
        subTitle={"What I've done and where I've been"}
      />
      <Container>
        <ListExperienceView/>
      </Container>
    </App>
  );
};

ExperienceHome.propTypes = {
  data: PropTypes.object,
};


export default ExperienceHome;
