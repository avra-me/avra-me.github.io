import ThemeFactory from "../theme";
import {CssBaseline, MuiThemeProvider} from "@material-ui/core";
import GlobalStyles from "../GlobalStyles";
import HeadSection from "../components/home/HeadSection";
import React, {useEffect} from "react";
import InjectStyles from "./InjectStyles";
import AOS from "aos";
import IconSection from "../components/home/IconSection";

export default  ({entry, getAsset, widgetFor}) => {
    const config = entry.get("data").toJSON();
    const theme = ThemeFactory({

    });
    const {header, skills} = config;

    useEffect(() => {
        AOS.init({
            delay: 0, once: true,
        });
    });
    return <InjectStyles>
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            {!header.disabled && <HeadSection details={header} />}
            {!skills.disabled && <IconSection isDemo values={skills.items} />}
        </MuiThemeProvider>
    </InjectStyles>;

};