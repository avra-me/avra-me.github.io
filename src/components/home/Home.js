import React from "react";
import PropTypes from "prop-types";
import HeadSection from "./HeadSection";
import IconSection from "./IconSection";

function Home(props) {
  const {about} = props;
  // useEffect(() => {
  //   selectHome();
  // }, [selectHome]);
  return <>
    <HeadSection details={about} />
    <IconSection values={about.skills} />
  </>;
}

Home.propTypes = {
  about: PropTypes.shape({
    skills: PropTypes.array,
  }).isRequired
  // selectHome: PropTypes.func.isRequired
};

export default Home;
