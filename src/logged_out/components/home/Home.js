import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import HeadSection from "./HeadSection";
import FeatureSection from "./FeatureSection";
import PricingSection from "./PricingSection";

function Home(props) {
  const {selectHome} = props;
  useEffect(() => {
    selectHome();
  }, [selectHome]);
  return [
    <HeadSection/>,
    <FeatureSection/>,
    <PricingSection/>
  ]
}

Home.propTypes = {
  selectHome: PropTypes.func.isRequired
};

export default Home;
