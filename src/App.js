import React, {Fragment, Suspense, useEffect} from "react";
import PropTypes from "prop-types";
import {CssBaseline, MuiThemeProvider} from "@material-ui/core";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import Pace from "./shared/components/Pace";
import NavBar from "./components/navigation/NavBar";
import ThemeFactory from "./theme";
import Footer from "./components/footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";



const App = (props) => {
  const { children, config } = props;
  const {logo} = config;
  const isServerRender = typeof window === "undefined";
  const theme = ThemeFactory(config.theme);
  if(!isServerRender){
    AOS.init({ once: true });
  }


  useEffect(() => {
    if(!isServerRender){
      AOS.init({
        duration : 2000
      });
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {!isServerRender ? (
        <>
          <Pace color={theme.palette.primary.light} />
          <Suspense fallback={<Fragment />}>
            <NavBar siteBrand={logo} />
            {children}
            <Footer />
          </Suspense>
        </>
      ) : children}
    </MuiThemeProvider>
  );
};

App.propTypes = {
  config: PropTypes.object,
  children: PropTypes.element
};

if (typeof window !== "undefined") {
  serviceWorker.register();
}
export default App;
