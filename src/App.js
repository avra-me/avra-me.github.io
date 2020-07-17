import React, {useState} from "react";
import PropTypes from "prop-types";
import {CssBaseline} from "@material-ui/core";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import SourcedFooter from "./components/footer/SourcedFooter";
import {RootThemeProvider} from "./components/common/sourced/SourcedThemeProvider";
import SourcedNavigation from "./components/navigation/SourcedNavigation";
import {NavigationContext} from "./shared/contexts/NavigationAppearContext";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {useLocation} from "@reach/router";


const App = (props) => {
  const {children, showContactForm, underConstruction} = props;
  const location = useLocation();
  const locationUrl = new URL(location.href);

  const [showSuccess, setShowSuccess] = useState(locationUrl.searchParams.has('sent_message'));

  const onHideSentNotification = () => {
    locationUrl.searchParams.delete("sent_message");
    window.history.pushState({}, document.title, locationUrl.toString());
    setShowSuccess(false);
  };

  return (
    <NavigationContext visible={false}>
      <RootThemeProvider>
        <CssBaseline/>
        <GlobalStyles/>
        <SourcedNavigation aosAnchor={"wave-box"}/>
        {children}
        <SourcedFooter showContactForm={showContactForm}/>
        <Snackbar open={underConstruction} anchorOrigin={{vertical: "bottom", horizontal: "left"}}>
          <Alert severity="warning">
            The content for this page is still being built out, feel free to provide feedback using the contact form!
          </Alert>
        </Snackbar>
        <Snackbar open={showSuccess} onClose={onHideSentNotification} autoHideDuration={5000}
                  anchorOrigin={{vertical: "bottom", horizontal: "left"}}>
          <Alert severity="success" onClose={onHideSentNotification}>
            Your message has been sent!
          </Alert>
        </Snackbar>

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
