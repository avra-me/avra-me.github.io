import React from "react";
import {CssBaseline, MuiThemeProvider} from "@material-ui/core";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import Pace from "./shared/components/Pace";
import LoggedOutComponent from './logged_out/components/Main'

// const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <GlobalStyles/>
      {typeof window !== 'undefined' && <Pace color={theme.palette.primary.light}/>}
      {/* https://reactjs.org/docs/error-decoder.html?invariant=294*/}
      {/*<Suspense fallback={<Fragment/>}>*/}
      <LoggedOutComponent/>
      {/*</Suspense>*/}
    </MuiThemeProvider>
  );
}

if (typeof window !== `undefined`) {
  serviceWorker.register();
}
export default App;
