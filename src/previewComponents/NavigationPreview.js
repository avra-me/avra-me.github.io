import {createMuiTheme, CssBaseline, MuiThemeProvider} from "@material-ui/core";
import GlobalStyles from "../GlobalStyles";
import NavBar from "../components/navigation/NavBar";
import React, {useEffect} from "react";
import InjectStyles from "./InjectStyles";
import AOS from "aos";
import PropTypes from "prop-types";

const NavigationPreview = ({entry, getAsset}) => {
    useEffect(() => {
        AOS.init({
            duration: 2000
        });
    });
    const logo = getAsset(entry.getIn(["data", "logo"]));
    return <InjectStyles>
        <MuiThemeProvider theme={createMuiTheme({})}>
            <CssBaseline/>
            <GlobalStyles/>
            <NavBar logo={logo} menuItems={[]} staticIconEnabled/>
        </MuiThemeProvider>
    </InjectStyles>;
};

NavigationPreview.propTypes = {
    entry: PropTypes.immutable,
    getAsset: PropTypes.func.isRequired,
};

export default NavigationPreview;