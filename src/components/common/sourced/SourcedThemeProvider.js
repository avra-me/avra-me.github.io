import {createMuiTheme, MuiThemeProvider, responsiveFontSizes} from "@material-ui/core";
import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import {graphql, useStaticQuery} from "gatsby";
import grey from "@material-ui/core/colors/grey";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useCookie from "../../../shared/functions/useCookie";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ThemeProvider from "@material-ui/styles/ThemeProvider";

const getThemeDataQuery = graphql`
query getThemeDataQuery {
  themeOverride: contentYaml {
    palette {
      waveAngle
      type
      tonalOffset
      spacing
      primary {
        light
        main
        dark
      }
      secondary {
        light
        main
        dark
      }
    }
    border {
      borderColor
      borderWidth
    }
    typography {
      useNextVariants
    }
  }
}`;

const fadeTime = "0.6s";
const fadeTimingFunction = "ease";
const fadeThemeChange = makeStyles({
  "@global": {
    "body": {
      transitionProperty: "background",
      transitionDuration: fadeTime,
      transitionTimingFunction: fadeTimingFunction
    },
    "*": {
      transitionProperty: "color, background",
      transitionDuration: fadeTime,
      transitionTimingFunction: fadeTimingFunction
    },
    "svg *": {
      transitionProperty: "fill",
      transitionDuration: fadeTime,
      transitionTimingFunction: fadeTimingFunction
    },
  }
});

const generateTheme = config => {
  config = _.cloneDeep(config);
  let {type, primary, secondary, ...palette} = config.palette;
  config.palette = palette;
  // colors
  const background = type === "dark" ? grey["A400"] : grey["100"];

  const theme = {
    palette: {
      wavePoints: [0, 47, 93],
      waveAngle: "45",
      type,
      primary,
      secondary,
      // Used to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
      background: {
        default: background,
      },
    },
    overrides: {
      MuiPaper: {
        root: {
          transition: `box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color ${fadeTime} ${fadeTimingFunction}, background ${fadeTime} ${fadeTimingFunction} !important`
        }
      },
      MuiContainer: {
        root: {}
      }
    }
  };
  const resultingTheme = _.merge(config, theme);
  return responsiveFontSizes(createMuiTheme(resultingTheme));
};

// ============================
// Root Theme Provider
// ============================
const ThemeTypeContext = React.createContext(() => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return {
    value: prefersDarkMode ? "dark" : "light",
    onToggle: () => {
    }
  };
});

const RootThemeProvider = ({children}) => {
  const {themeOverride} = useStaticQuery(getThemeDataQuery);
  if (typeof window !== "undefined") {
    fadeThemeChange();
  }

  let initialDarkModeState = useMediaQuery("(prefers-color-scheme: dark)");
  if (themeOverride.palette.type && !initialDarkModeState) {
    initialDarkModeState = themeOverride.palette.type === "dark";
  }
  const [isDarkMode, updateIsDarkMode] = useCookie("isDarkMode", initialDarkModeState);
  themeOverride.palette.type = isDarkMode ? "dark" : "light";
  const theme = generateTheme(themeOverride);
  return <ThemeTypeContext.Provider
    value={{
      value: isDarkMode ? "dark" : "light",
      onToggle: () => {
        updateIsDarkMode(!isDarkMode);
      }
    }}>
    <MuiThemeProvider theme={createMuiTheme(responsiveFontSizes(theme))}>{children}</MuiThemeProvider>
  </ThemeTypeContext.Provider>;
};

RootThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

const ThemeModifier = ({isDarkMode, isLightMode, children, theme}) => (<ThemeTypeContext.Consumer>
  {({value: rootThemeType}) => {
    const configOverride = {
      palette: {},
      ...theme
    };
    configOverride.palette.type = isDarkMode ? "dark" : isLightMode ? "light" : rootThemeType;
    return <ThemeProvider theme={createMuiTheme(configOverride)}>{children}</ThemeProvider>;
  }}
</ThemeTypeContext.Consumer>);

ThemeModifier.propTypes = {
  children: PropTypes.node.isRequired,
  isDarkMode: PropTypes.bool,
  isLightMode: PropTypes.bool,
  isRoot: PropTypes.bool,
  theme: PropTypes.object
};


export default ThemeModifier;
export {ThemeTypeContext, RootThemeProvider, ThemeModifier};
