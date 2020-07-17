import {createMuiTheme, CssBaseline, MuiThemeProvider} from "@material-ui/core";
import GlobalStyles from "../GlobalStyles";
import NavBar from "../components/navigation/NavBar";
import React from "react";
import InjectStyles from "./InjectStyles";
import PropTypes from "prop-types";

const NavigationPreview = ({entry, getAsset}) => {
  const logo = getAsset(entry.getIn(["data", "logo"]));
  return <InjectStyles>
    <MuiThemeProvider theme={createMuiTheme({})}>
      <CssBaseline/>
      <GlobalStyles/>
      <NavBar logo={logo} menuItems={[entry.get("data").toJSON()]} staticIconEnabled/>
    </MuiThemeProvider>
  </InjectStyles>;
};

NavigationPreview.propTypes = {
  entry: PropTypes.immutable,
  getAsset: PropTypes.func.isRequired,
};

export default NavigationPreview;
