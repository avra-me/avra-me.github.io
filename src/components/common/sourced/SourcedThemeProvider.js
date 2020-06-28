import {createMuiTheme, MuiThemeProvider, responsiveFontSizes} from "@material-ui/core";
import _ from "lodash"
import React from "react";
import PropTypes from "prop-types";
import {graphql, useStaticQuery} from "gatsby";

const generateTheme = config => {
    // colors
    const black = "#343a40";
    const darkBlack = "rgb(36, 40, 44)";
    const background = "#f5f5f5";
    // const background = "#ffffff";
    const warningLight = "rgba(253, 200, 69, .3)";
    const warningMain = "rgba(253, 200, 69, .5)";
    const warningDark = "rgba(253, 200, 69, .7)";

    // border
    const borderWidth = 2;
    const borderColor = "rgba(0, 0, 0, 0.13)";

    // breakpoints
    const xl = 1920;
    const lg = 1280;
    const md = 960;
    const sm = 600;
    const xs = 0;

    // spacing
    const spacing = 8;

    const theme = {
        palette: {
            wavePoints: [0, 47, 93],
            waveAngle: "45",
            type: "light",
            common: {
                black,
                darkBlack,
            },
            warning: {
                light: warningLight,
                main: warningMain,
                dark: warningDark,
            },
            // Used to shift a color's luminance by approximately
            // two indexes within its tonal palette.
            // E.g., shift from Red 500 to Red 300 or Red 700.
            tonalOffset: 0.2,
            background: {
                default: background,
            },
            spacing,
        },
        breakpoints: {
            // Define custom breakpoint values.
            // These will apply to Material-UI components that use responsive
            // breakpoints, such as `Grid` and `Hidden`. You can also use the
            // theme breakpoint functions `up`, `down`, and `between` to create
            // media queries for these breakpoints
            values: {
                xl,
                lg,
                md,
                sm,
                xs,
            },
        },
        border: {
            borderColor: borderColor,
            borderWidth: borderWidth,
        },
        overrides: {
            MuiExpansionPanel: {
                root: {
                    position: "static",
                },
            },
            MuiTableCell: {
                root: {
                    paddingLeft: spacing * 2,
                    paddingRight: spacing * 2,
                    borderBottom: `${borderWidth}px solid ${borderColor}`,
                    [`@media (max-width:  ${sm}px)`]: {
                        paddingLeft: spacing,
                        paddingRight: spacing,
                    },
                },
            },
            MuiDivider: {
                root: {
                    backgroundColor: borderColor,
                    height: borderWidth,
                },
            },
            MuiPrivateNotchedOutline: {
                root: {
                    borderWidth: borderWidth,
                },
            },
            MuiListItem: {
                divider: {
                    borderBottom: `${borderWidth}px solid ${borderColor}`,
                },
            },
            MuiDialog: {
                paper: {
                    width: "100%",
                    maxWidth: 430,
                    marginLeft: spacing,
                    marginRight: spacing,
                },
            },
            MuiTooltip: {
                tooltip: {
                    backgroundColor: darkBlack,
                },
            },
            MuiExpansionPanelDetails: {
                root: {
                    [`@media (max-width:  ${sm}px)`]: {
                        paddingLeft: spacing,
                        paddingRight: spacing,
                    },
                },
            },
        },
        typography: {
            useNextVariants: true,
            fontFamily: "Lato",
        },
    };
    const resultingTheme = _.merge(config, theme);
    return responsiveFontSizes(createMuiTheme(resultingTheme));
};

const SourcedThemeProvider = ({isDarkMode, isRoot, children}) => {
    const configOverride = {
        ...useStaticQuery(getThemeDataQuery)
    };
    configOverride.palette.type = isDarkMode ? "dark" : "light";

    const theme = isRoot ? generateTheme(configOverride) : createMuiTheme(configOverride);
    return <MuiThemeProvider theme={theme}>
        {children}
    </MuiThemeProvider>;
};


SourcedThemeProvider.propTypes = {
    children: PropTypes.element.isRequired,
    isDarkMode: PropTypes.boolean,
    isRoot: PropTypes.boolean
};

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


export default SourcedThemeProvider;