import React, {Fragment, lazy, Suspense, useCallback, useState} from "react";
import PropTypes from "prop-types";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import Pace from "./shared/components/Pace";
import NavBar from "./components/navigation/NavBar";
import ThemeFactory from "./theme";
import Footer from "./components/footer/Footer";


const App = (props) => {
  const { children, config } = props;
  const isServerRender = typeof window === "undefined";
  const { subtitle, title } = config;
  const theme = ThemeFactory(config);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {!isServerRender ? (
        <>
          <Pace color={theme.palette.primary.light} />
          <Suspense fallback={<Fragment />}>
            <NavBar siteBrandPrimary={title} siteBrandSecondary={subtitle} />
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
};

if (typeof window !== `undefined`) {
  serviceWorker.register();
}
export default App;
