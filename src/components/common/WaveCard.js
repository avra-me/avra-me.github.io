import Card from "@material-ui/core/Card";
import clsx from "clsx";
import CardMedia from "@material-ui/core/CardMedia";
import WaveBorder from "../../shared/components/WaveBorder";
import React from "react";
import PropTypes from "prop-types";
import {useTheme, withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import SourcedThemeProvider from "./sourced/SourcedThemeProvider";

const styles = (theme) => ({
  root: {
    height: "100%"
  },
  dark: {
    background: theme.palette.secondary.dark
  }
});
const WaveCard = ({inverse, classes, className, children, before, ...props}) => {
  const theme = useTheme();

  return <SourcedThemeProvider isDarkMode={inverse}>
    <Card {...props} className={clsx(className, inverse ? classes.dark : "")}>
      {before && <SourcedThemeProvider isDarkMode={!inverse}>
        <Paper elevation={0} square className={clsx(className, inverse ? "" : classes.dark)}>
          {before}
        </Paper>
      </SourcedThemeProvider>}
      <CardMedia style={{background: theme.palette.background.paper}}>
        {!inverse && <WaveBorder flip background={theme.palette.secondary.dark}/>}
        {inverse && <WaveBorder background={theme.palette.secondary.dark}/>}
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
