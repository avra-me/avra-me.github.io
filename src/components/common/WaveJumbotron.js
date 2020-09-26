import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Box, Grid, withStyles} from "@material-ui/core";
import WaveBorder from "../../shared/components/WaveBorder";
import clsx from "clsx";
import SourcedNavigation from "../navigation/SourcedNavigation";
import ThemeModifier from "./sourced/SourcedThemeProvider";
import Container from "@material-ui/core/Container";
import {NavigationAppearContext} from "../../shared/contexts/NavigationAppearContext";
import {useInView} from "react-intersection-observer";

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
  waveArea: {
    background: generateGradientString(theme),
  },
});

function WaveJumbotronHeader(props) {
  const {classes, children} = props;
  const [ref, inView] = useInView({rootMargin: "100px 0px"});
  const {setIsVisible} = useContext(NavigationAppearContext);
  useEffect(() => {
    // SSR can result in some unexpected behaviour
    setIsVisible(!inView);
  }, [inView]);

  return (
    <span className={clsx(classes.waveArea, "section")} id={"wave-box"}>
      <ThemeModifier isDarkMode>
        <SourcedNavigation
          position={"absolute"}
          useDarkPalette
          backgroundColor={"inherit"}
        />
        <div ref={ref} className={classNames(classes.wrapper)}>
          <Grid
            item
            xs={12}
            md={12}
            style={{margin: "auto", alignItems: "center"}}
            className={"lg-p-top"}
          >
            <Box
              display="flex"
              flexDirection="column"
              style={{margin: "auto", alignItems: "center"}}
              height="100%"
            >
            </Box>
          </Grid>
          <Container className={classes.container}>
              <div className={classNames(classes.containerFix)}>
                <Grid
                  container
                  className="row"
                  alignItems={"center"}
                  justify={"center"}
                >
                  <Grid item xs={12} className={classes.title}>
                    {children}
                  </Grid>
                </Grid>
              </div>
          </Container>
          <WaveBorder className={classes.waveBorder}/>
        </div>
      </ThemeModifier>
      <div className={"lg-p-top"}/>
    </span>
  );
}

WaveJumbotronHeader.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
  children: PropTypes.node,
};

export default withStyles(styles, {withTheme: true})(WaveJumbotronHeader);
