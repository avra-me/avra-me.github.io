import ThemeFactory from "../theme";
import {CssBaseline, MuiThemeProvider} from "@material-ui/core";
import Footer from "../components/footer/Footer";
import React from "react";
import InjectStyles from "./InjectStyles";
import GlobalStyles from "../GlobalStyles";

export default ({entry, getAsset}) => {
    const config =  entry.get("data").toJSON();
    config.context.forEach(v => {
        v.icon = getAsset(v.icon);
    });
    config.icons.forEach(v => {
        v.icon = getAsset(v.icon);
    });
    const theme = ThemeFactory({});

    return <InjectStyles>
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            <Footer config={config} />
        </MuiThemeProvider>
    </InjectStyles>;

};