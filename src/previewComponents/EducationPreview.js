import {CssBaseline} from "@material-ui/core";
import GlobalStyles from "../GlobalStyles";
import Grid from "@material-ui/core/Grid";
import React, {useEffect} from "react";
import InjectStyles from "./InjectStyles";
import AOS from "aos";
import PropTypes from "prop-types";
import EducationCard from "../components/home/EducationCard";
import SourcedThemeProvider from "../components/common/sourced/SourcedThemeProvider";


const EducationPreview = ({entry}) => {
  useEffect(() => {
    AOS.init({
      duration: 2000
    });
  });

  const demoData = entry.get("data").toJSON();
  demoData.short = demoData.short || demoData.body;

  return <InjectStyles>
    <SourcedThemeProvider>
      <CssBaseline/>
      <GlobalStyles/>
      <Grid container className={"container-fluid section"}>
        <EducationCard data={demoData}/>
        <EducationCard data={demoData} flip/>
      </Grid>
    </SourcedThemeProvider>
  </InjectStyles>;
};

EducationPreview.propTypes = {
  entry: PropTypes.immutable,
  getAsset: PropTypes.func.isRequired,
};

export default EducationPreview;
