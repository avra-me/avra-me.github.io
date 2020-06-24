import React from "react";
import PropTypes from "prop-types";
import HeadSection from "./HeadSection";
import IconSection from "./IconSection";
import EducationCard from "./EducationCard";
import ExperienceCards from "./ExperienceCard";
import ListExperienceView from "./ListExperienceView";
import ListEducationView from "./ListEducationView";

function Home(props) {
  const {about, navigation} = props;
  const {header, skills} = about;

  return <>
    {!header.disabled && <HeadSection details={header} navigation={navigation}/>}
    <ListEducationView/>
    <ListExperienceView featuredOnly/>
    {!skills.disabled && <IconSection values={skills.items} header={skills.header} subHeader={skills.subHeader}/>}
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
