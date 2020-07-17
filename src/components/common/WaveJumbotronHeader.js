import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Box, Grid, Typography, withStyles} from "@material-ui/core";
import WaveBorder from "../../shared/components/WaveBorder";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import SourcedNavigation from "../navigation/SourcedNavigation";
import ThemeModifier from "./sourced/SourcedThemeProvider";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {NavigationAppearContext} from "../../shared/contexts/NavigationAppearContext";
import {useInView} from "react-intersection-observer";
import WaveJumbotron from "./WaveJumbotron";

const generateGradientString = (theme) => {
  const points = ["light", "main", "dark"].map(
    (name, i) =>
      `${theme.palette.secondary[name]} ${theme.palette.wavePoints[i]}%`
  );
  return `linear-gradient(${theme.palette.waveAngle}deg, ${points.join(
    ", "
  )} ) !important`;
};

const styles = (theme) => ({
  wrapper: {
    color: theme.palette.common.white,
    position: "relative",
    background: "inherit",
    zIndex: 20,
  },
  container: {
    paddingTop: theme.spacing(6),
    marginBottom: theme.spacing(12),
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(9),
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(6),
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
    },
  },
  containerFix: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "none !important",
    },
  },
  waveBorder: {
    paddingTop: theme.spacing(4),
    zIndex: 20,
    height: theme.spacing(20),
    minHeight: theme.spacing(20),
    fill: theme.palette.background.default,
  },
  speech: {
    display: "inline-flex",
    position: "relative",
    borderRadius: theme.spacing(1),
    background: theme.palette.secondary.light,
    "&:after": {
      content: "''",
      position: "absolute",
      bottom: "0",
      left: "50%",
      width: 0,
      height: 0,
      border: `${theme.spacing(1)}px solid transparent`,
      borderTopColor: theme.palette.secondary.light,
      borderBottom: 0,
      borderLeft: 0,
      marginLeft: `-${theme.spacing(0.5)}px`,
      marginBottom: `-${theme.spacing(1)}px`,
    },
  },
  speechText: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  waveArea: {
    background: generateGradientString(theme),
  },
  captionText: {
    fontSize: "32px",
  },
  brand: {
    height: "auto",
    width: "75px",
    overflow: "inherit",
  },
  title: {
    marginBottom: theme.spacing(4)
  }
});

function WaveJumbotronHeader(props) {
  const {classes, title, subTitle, monogram} = props;

  return (
    <span className={clsx(classes.waveArea, "section")} id={"wave-box"}>
     <WaveJumbotron>
          <Grid
            item
            xs={12}
            style={{margin: "auto", alignItems: "center"}}
          >
            <Box
              display="flex"
              flexDirection="column"
              style={{margin: "auto", alignItems: "center"}}
              height="100%"
            >
              <Button href={"#"}>
                {monogram && (
                  <Avatar
                    variant={"square"}
                    className={classes.brand}
                    src={monogram}
                    alt={""}
                  />
                )}
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            container
            className="row"
            alignItems={"center"}
            justify={"center"}
            classes={{root: "lg-p-top"}}
          >
            <Grid item xs={12} className={classes.title}>
              <Typography variant="h2" component={"div"} align={"center"}>
                <b>{title}</b>
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Hidden smDown implementation={"css"}>
                <Typography className={classes.captionText} align={"center"}>{subTitle}</Typography>
              </Hidden>
            </Grid>
          </Grid>
       </WaveJumbotron>
    </span>
  );
}

WaveJumbotronHeader.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  monogram: PropTypes.string,
};

export default withStyles(styles, {withTheme: true})(WaveJumbotronHeader);
