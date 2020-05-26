import React from "react";
import HeadSection from "./HeadSection";
import FeatureSection from "./FeatureSection";
import DetailsConfig from "../../config/details.json";

function Home() {
  // const {selectHome} = props;
  // useEffect(() => {
  //   selectHome();
  // }, [selectHome]);
  return <>
    <HeadSection details={DetailsConfig} />
    <FeatureSection />
  </>;
}

Home.propTypes = {
  // selectHome: PropTypes.func.isRequired
};

export default Home;
