import {graphql, useStaticQuery} from "gatsby";
import React, {Fragment} from "react";
import WaveJumbotron from "../common/WaveJumbotron";
import PropTypes from "prop-types";

const SourcedHomeJumbotron = (props) => {
  let {home} = useStaticQuery(getHomeConfig);
  const {disabled, prefix, name, monogram, caption} = home;

  const jumboProps = {
    title: `${prefix} ${name}`,
    subTitle: caption,
    monogram: monogram,
    ...props
  };

  if (disabled) {
    return <Fragment/>;
  }
  return <WaveJumbotron {...jumboProps}/>;
};

const getHomeConfig = graphql`query getHomeConfig {
  home:homeYaml{
    disabled
    prefix
    name
    caption
    monogram
  }
}`;

SourcedHomeJumbotron.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  monogram: PropTypes.string
};

export default SourcedHomeJumbotron;
