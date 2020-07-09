import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {CssBaseline} from "@material-ui/core";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import AOS from "aos";
import "aos/dist/aos.css";
import SourcedFooter from "./components/footer/SourcedFooter";
import {RootThemeProvider} from "./components/common/sourced/SourcedThemeProvider";
import SourcedNavigation from "./components/navigation/SourcedNavigation";

const App = (props) => {
  const {children, showContactForm} = props;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
    AOS.refresh();
  });

  return (
    <RootThemeProvider>
      <CssBaseline/>
      <GlobalStyles/>
      <SourcedNavigation aosAnchor={"#wave-box"}/>
      {children}
      <SourcedFooter showContactForm={showContactForm}/>
    </RootThemeProvider>
  );
};

App.propTypes = {
  children: PropTypes.node,
  showContactForm: PropTypes.bool,
};

if (typeof window !== "undefined") {
  serviceWorker.register();
}

export default App;
