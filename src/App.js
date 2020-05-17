import React, {Suspense} from "react";
import {CssBaseline, MuiThemeProvider} from "@material-ui/core";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import Pace from "./shared/components/Pace";

const HomePageComponent = React.lazy(() => import("./logged_out/components/Main"));
const isSSR = typeof window === "undefined"

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <GlobalStyles/>
      {!isSSR && <>
        <Pace color={theme.palette.primary.light}/>
        <Suspense fallback={<React.Fragment/>}>
          <HomePageComponent/>
        </Suspense>
      </>
      }

    </MuiThemeProvider>
  );
}

if (typeof window !== `undefined`) {
  serviceWorker.register();
}
export default App;
