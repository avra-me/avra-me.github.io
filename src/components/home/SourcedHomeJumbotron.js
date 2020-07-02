import {graphql, useStaticQuery} from "gatsby";
import React, {Fragment} from "react";
import WaveJumbotron from "../common/WaveJumbotron";

const SourcedHomeJumbotron = () => {
  const {home} = useStaticQuery(getHomeConfig);
  const {disabled, prefix, name, monogram, caption} = home;
  if (disabled) {
    return <Fragment/>;
  }
  return <WaveJumbotron title={`${prefix} ${name}`} subTitle={caption} monogram={monogram}/>;
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

export default SourcedHomeJumbotron;
