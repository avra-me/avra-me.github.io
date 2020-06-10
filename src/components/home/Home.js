import React from "react";
import PropTypes from "prop-types";
import HeadSection from "./HeadSection";
import IconSection from "./IconSection";
import WaveBorder from "../../shared/components/WaveBorder";
import useTheme from "@material-ui/core/styles/useTheme";

function Home(props) {
  const {about, navigation} = props;
  const {header, skills} = about;

  return <>
    {!header.disabled && <HeadSection details={header} navigation={navigation} />}
    {!skills.disabled && <IconSection values={skills.items} header={skills.header} />}
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

  }).isRequired,
  navigation: PropTypes.object
};

export default Home;
