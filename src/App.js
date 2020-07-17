import React from "react";
import PropTypes from "prop-types";
import {CssBaseline} from "@material-ui/core";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import SourcedFooter from "./components/footer/SourcedFooter";
import {RootThemeProvider} from "./components/common/sourced/SourcedThemeProvider";
import SourcedNavigation from "./components/navigation/SourcedNavigation";
import {NavigationContext} from "./shared/contexts/NavigationAppearContext";
import NoSsr from "@material-ui/core/NoSsr";
import AlertManager from "./components/common/AlertManager";


const App = (props) => {
  const {children, showContactForm, underConstruction} = props;


  return (
    <NavigationContext visible={false}>
      <RootThemeProvider>
        <CssBaseline/>
        <GlobalStyles/>
        <SourcedNavigation aosAnchor={"wave-box"}/>
        {children}
        <SourcedFooter showContactForm={showContactForm}/>
        <NoSsr>
          <AlertManager underConstruction={underConstruction}/>
        </NoSsr>

      </RootThemeProvider>
    </NavigationContext>
  );
};

App.propTypes = {
  children: PropTypes.node,
  showContactForm: PropTypes.bool,
  underConstruction: PropTypes.bool,
};

if (typeof window !== "undefined") {
  serviceWorker.register();
}

export default App;
