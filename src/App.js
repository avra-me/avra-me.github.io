import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {CssBaseline} from "@material-ui/core";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import AOS from "aos";
import "aos/dist/aos.css";
import SourcedFooter from "./components/footer/SourcedFooter";
import SourcedThemeProvider from "./components/common/sourced/SourcedThemeProvider";
import SourcedNavigation from "./components/navigation/SourcedNavigation";


const App = (props) => {
    const {children} = props;
    const isServerRender = typeof window === "undefined";

    useEffect(() => {
        if (!isServerRender) {
            AOS.init({
                duration: 1000,
                once: true
            });
        }
    });

    return (
        <SourcedThemeProvider isRoot>
            <CssBaseline/>
            <GlobalStyles/>
            <SourcedNavigation aosAnchor={"#wave-box"}/>
            {children}
            <SourcedFooter/>
        </SourcedThemeProvider>
    );
};

App.propTypes = {
    children: PropTypes.element
};

if (typeof window !== "undefined") {
    serviceWorker.register();
}

export default App;
