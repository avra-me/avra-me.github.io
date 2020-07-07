import Card from "@material-ui/core/Card";
import clsx from "clsx";
import CardMedia from "@material-ui/core/CardMedia";
import WaveBorder from "../../shared/components/WaveBorder";
import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import SourcedThemeProvider from "./sourced/SourcedThemeProvider";

const styles = (theme) => ({
  root: {
    height: "100%",
    zIndex: -99
  },
  dark: {
    background: theme.palette.secondary.dark
  },
  fixScrollBug: {
    position: "absolute",
    bottom: -theme.spacing(1),
    height: theme.spacing(2),
    left: 0,
    width: "100%",
    zIndex: 10
  },
  before: {
    position: "relative"
  },
  wrapBeforeContent: {
    zIndex: 20,
    position: "inherit"
  },
  waveSection: {
    background: theme.palette.background.paper,
  },
  waveSvg: {
    "& *" : {
      fill: theme.palette.secondary.dark
    }
  }
});
const WaveCard = ({classes, inverse, className, children, before, ...props}) => {
  return <SourcedThemeProvider isDarkMode={inverse}>
    <Card {...props} className={clsx(className, inverse ? classes.dark : "")}>
      {before && <SourcedThemeProvider isDarkMode={!inverse}>
        <Paper elevation={0} square className={clsx(className, classes.before, inverse ? "" : classes.dark)}>
          <span className={classes.wrapBeforeContent}>
            {before}
          </span>
          <span className={clsx(classes.fixScrollBug, inverse ? "" : classes.dark)}/>
        </Paper>
      </SourcedThemeProvider>}
      <CardMedia className={classes.waveSection}>
        <WaveBorder flip={!inverse} className={classes.waveSvg}/>
      </CardMedia>
      {children}
    </Card>
  </SourcedThemeProvider>;
};

WaveCard.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  inverse: PropTypes.bool,
  children: PropTypes.node.isRequired,
  before: PropTypes.element
};


export default withStyles(styles)(WaveCard);
