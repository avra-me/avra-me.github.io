import ThemeFactory from "../theme";
import {CssBaseline, MuiThemeProvider} from "@material-ui/core";
import GlobalStyles from "../GlobalStyles";
import NavBar from "../components/navigation/NavBar";
import HeadSection from "../components/home/HeadSection";
import Footer from "../components/footer/Footer";
import React, {useEffect} from "react";
import InjectStyles from "./InjectStyles";
import Button from "@material-ui/core/Button";
import AOS from "aos";
import IconSection from "../components/home/IconSection";

export default  ({entry, getAsset, widgetFor}) => {
    const config = entry.get("data").toJSON();
    const theme = ThemeFactory({

    });
    const {header, skills} = config;
    return <InjectStyles>
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            {!header.disabled && <HeadSection details={header} />}
            {!skills.disabled && <IconSection values={skills.items} />}
        </MuiThemeProvider>
    </InjectStyles>;

};