import {withStyles} from "@material-ui/core";

const styles = (theme) => ({
  "@global": {
    /**
     * Disable the focus outline, which is default on some browsers like
     * chrome when focusing elements
     */
    "* body": {
      transition: "all 0.5s linear"
    },
    "*:focus": {
      outline: 0,
    },
    ".text-white": {
      color: theme.palette.common.white,
    },
    ".listItemLeftPadding": {
      paddingTop: `${theme.spacing(1.75)}px !important`,
      paddingBottom: `${theme.spacing(1.75)}px !important`,
      paddingLeft: `${theme.spacing(4)}px !important`,
      [theme.breakpoints.down("sm")]: {
        paddingLeft: `${theme.spacing(4)}px !important`,
      },
      "@media (max-width:  420px)": {
        paddingLeft: `${theme.spacing(1)}px !important`,
      },
    },
    ".container": {
      width: "100%",
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
      marginRight: "auto",
      marginLeft: "auto",
      [theme.breakpoints.up("sm")]: {
        maxWidth: 540,
      },
      [theme.breakpoints.up("md")]: {
        maxWidth: 720,
      },
      [theme.breakpoints.up("lg")]: {
        maxWidth: 1170,
      },
    },
    ".row": {
      display: "flex",
      flexWrap: "wrap",
      marginRight: -theme.spacing(2),
      marginLeft: -theme.spacing(2),
    },
    ".container-fluid": {
      width: "100%",
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      marginRight: "auto",
      marginLeft: "auto",
      maxWidth: 1370,
    },

    ".section": {
      marginBottom: theme.spacing(12),
      [theme.breakpoints.down("md")]: {
        marginBottom: theme.spacing(10),
      },
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(8),
      },
      [theme.breakpoints.down("xs")]: {
        marginBottom: theme.spacing(6),
      },
    },
    ".lg-mg-top": {
      marginTop: `${theme.spacing(10)}px !important`,
      [theme.breakpoints.down("md")]: {
        marginTop: `${theme.spacing(9)}px !important`,
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: `${theme.spacing(8)}px !important`,
      },
      [theme.breakpoints.down("xs")]: {
        marginTop: `${theme.spacing(7)}px !important`,
      },
    },
    ".lg-mg-bottom": {
      marginBottom: `${theme.spacing(10)}px !important`,
      [theme.breakpoints.down("md")]: {
        marginBottom: `${theme.spacing(9)}px !important`,
      },
      [theme.breakpoints.down("sm")]: {
        marginBottom: `${theme.spacing(8)}px !important`,
      },
      [theme.breakpoints.down("xs")]: {
        marginBottom: `${theme.spacing(7)}px !important`,
      },
    },
    ".lg-p-top": {
      paddingTop: `${theme.spacing(10)}px !important`,
      [theme.breakpoints.down("md")]: {
        paddingTop: `${theme.spacing(9)}px !important`,
      },
      [theme.breakpoints.down("sm")]: {
        paddingTop: `${theme.spacing(8)}px !important`,
      },
      [theme.breakpoints.down("xs")]: {
        paddingTop: `${theme.spacing(7)}px !important`,
      },
    },
  },
});

function globalStyles() {
  return null;
}

export default withStyles(styles, {withTheme: true})(globalStyles);
