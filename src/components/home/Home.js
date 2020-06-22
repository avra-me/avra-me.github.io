import React from "react";
import PropTypes from "prop-types";
import HeadSection from "./HeadSection";
import IconSection from "./IconSection";
import WaveBorder from "../../shared/components/WaveBorder";
import useTheme from "@material-ui/core/styles/useTheme";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import EducationCard from "./EducationCard";
import ExperienceCards from "./ExperienceCards";

function Home(props) {
  const {about} = props;
  const {header, skills} = about;

  return <>
    {!header.disabled && <HeadSection details={header}/>}
    <ExperienceCards/>
    <EducationCard/>
    {!skills.disabled && <IconSection values={skills.items} header={skills.header}/>}
  </>;
}

Home.propTypes = {
  about: PropTypes.shape({
    skills: PropTypes.shape({
      header: PropTypes.string,
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

  }).isRequired
};

export default Home;
