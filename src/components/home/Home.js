import React from "react";
import PropTypes from "prop-types";
import HeadSection from "./HeadSection";
import IconSection from "./IconSection";

function Home(props) {
  const {about} = props;
  const {header, skills} = about;
  return <>
    {!header.disabled && <HeadSection details={header} />}
    {!skills.disabled &&<IconSection values={skills.items} />}
  </>;
}

Home.propTypes = {
  about: PropTypes.shape({
    skills: PropTypes.shape({
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
  // selectHome: PropTypes.func.isRequired
};

export default Home;
