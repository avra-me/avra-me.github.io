import React, {Fragment, Suspense, lazy} from "react";
import {MuiThemeProvider, CssBaseline} from "@material-ui/core";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import Pace from "./shared/components/Pace";

const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));

const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <GlobalStyles/>
      <Pace color={theme.palette.primary.light}/>
      <Suspense fallback={<Fragment/>}>
        <LoggedOutComponent/>
      </Suspense>
    </MuiThemeProvider>
  );
}

if (typeof window !== `undefined`) {
  serviceWorker.register();
}
export default App;
