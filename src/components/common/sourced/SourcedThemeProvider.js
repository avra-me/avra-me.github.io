import {createMuiTheme, MuiThemeProvider, responsiveFontSizes} from "@material-ui/core";
import _ from "lodash";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {graphql, useStaticQuery} from "gatsby";
import grey from "@material-ui/core/colors/grey";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AOS from "aos";
import useCookie from "../../../shared/functions/useCookie";
import makeStyles from "@material-ui/core/styles/makeStyles";

const getThemeDataQuery = graphql`
query getThemeDataQuery {
  palette: contentYaml {
    primary {
      dark
      light
      main
    }
    secondary {
      dark
      light
      main
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
  const {palette} = config;
  // colors
  const background = palette.type === "dark" ? grey["A400"] : grey["100"];

  // border
  const borderWidth = 2;
  const borderColor = "rgba(0, 0, 0, 0.13)";

  // spacing
  const spacing = 16;

  const theme = {
    palette: {
      wavePoints: [0, 47, 93],
      waveAngle: "45",
      // Used to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
      background: {
        default: background,
      },
      spacing,
    },
    border: {
      borderColor: borderColor,
      borderWidth: borderWidth,
    },
    typography: {
      useNextVariants: true,
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


const BaseThemeProvider = ({theme, children}) => {
  return <MuiThemeProvider theme={createMuiTheme(theme)}>
    {children}
  </MuiThemeProvider>;
};

BaseThemeProvider.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.node.isRequired
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
  const configOverride = {
    ...useStaticQuery(getThemeDataQuery)
  };
  if (typeof window !== "undefined") {
    fadeThemeChange();
  }
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, updateIsDarkMode] = useCookie("isDarkMode", prefersDarkMode);
  useEffect(() => {
    AOS.refresh();
  }, [isDarkMode]);
  return <ThemeTypeContext.Provider
    value={{
      value: isDarkMode ? "dark" : "light",
      onToggle: () => {
        updateIsDarkMode(!isDarkMode);
      }
    }}>
    <ThemeTypeContext.Consumer>
      {({value: themeType}) => {

        configOverride.palette.type = themeType;
        const theme = generateTheme(configOverride);
        return <BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>;

      }}
    </ThemeTypeContext.Consumer>
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
    return <BaseThemeProvider theme={configOverride}>{children}</BaseThemeProvider>;
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
