import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {CssBaseline, MuiThemeProvider} from "@material-ui/core";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import NavBar from "./components/navigation/NavBar";
import ThemeFactory from "./theme";
import Footer from "./components/footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";


const App = (props) => {
  const {children, theme, footer, navigation} = props;
  const {logo} = theme;
  const isServerRender = typeof window === "undefined";
  const muiTheme = ThemeFactory(theme);

  useEffect(() => {
    if (!isServerRender) {
      AOS.init({
        duration: 2000
      });
    }
  });
  const RenderChildren = () => (children);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline/>
      <GlobalStyles/>
      <NavBar aosAnchor={"#wave-box"}/>
      <RenderChildren/>
      {!footer.disabled && <Footer config={footer}/>}
    </MuiThemeProvider>
  );
};

App.propTypes = {
  theme: PropTypes.object,
  footer: PropTypes.object,
  children: PropTypes.element
};

if (typeof window !== "undefined") {
  serviceWorker.register();
}

export default App;
