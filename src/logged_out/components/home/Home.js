import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import HeadSection from "./HeadSection";
import FeatureSection from "./FeatureSection";
import PricingSection from "./PricingSection";
import DetailsConfig from '../../../config/details.json'


function Home(props) {
  const {selectHome} = props;
  useEffect(() => {
    selectHome();
  }, [selectHome]);
  return [
    <HeadSection details={DetailsConfig}/>,
    <FeatureSection/>,
    <PricingSection/>
  ]
}

Home.propTypes = {
  selectHome: PropTypes.func.isRequired
};

export default Home;
