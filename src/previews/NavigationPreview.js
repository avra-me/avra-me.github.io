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

export default ({entry, getAsset}) => {
    const theme = ThemeFactory({});

    useEffect(() => {
            AOS.init({
                duration : 2000
            });
    });
    const logo = getAsset(entry.getIn(["data", "logo"]));
    return <InjectStyles>
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            <NavBar siteBrand={logo} />
            <Footer />
        </MuiThemeProvider>
    </InjectStyles>;

};