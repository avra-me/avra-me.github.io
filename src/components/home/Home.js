import React from "react";
import PropTypes from "prop-types";
import HeadSection from "./HeadSection";
import ListExperienceView from "./ListExperienceView";
import ListEducationView from "./ListEducationView";
import SourcedProfessionalSummary from "./SourcedProfessionalSummary";

function Home(props) {
  const {about, navigation} = props;
  const {header} = about;

  return <>
    {!header.disabled && <HeadSection details={header} navigation={navigation}/>}
    <SourcedProfessionalSummary/>
    <ListExperienceView featuredOnly/>
    <ListEducationView/>
  </>;
}

Home.propTypes = {
  about: PropTypes.shape({
    skills: PropTypes.shape({
      header: PropTypes.string,
      subHeader: PropTypes.string,
      disabled: PropTypes.bool,
      items: PropTypes.array
    }),
    header: PropTypes.shape({
      disabled: PropTypes.bool,
      useGradient: PropTypes.bool,
      prefix: PropTypes.string,
      name: PropTypes.string,
      caption: PropTypes.string,
    }),

  }).isRequired,
  navigation: PropTypes.object
};

export default Home;
