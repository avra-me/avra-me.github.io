import Card from "@material-ui/core/Card";
import clsx from "clsx";
import {ThemeProvider} from "@material-ui/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import CardMedia from "@material-ui/core/CardMedia";
import WaveBorder from "../../shared/components/WaveBorder";
import Grid from "@material-ui/core/Grid";
import React from "react";
import PropTypes from "prop-types";
import {useTheme, withStyles} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

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

  return <ThemeProvider theme={createMuiTheme({palette: {type: inverse ? "dark" : "light"}})}>
    <Card {...props} className={clsx(className, inverse ? classes.dark : "")}>
      {before &&<ThemeProvider theme={createMuiTheme({palette: {type: inverse ? "light" : "dark"}})}>
        <Paper elevation={0} square className={clsx(className, inverse ? "" : classes.dark)}>
          {before}
        </Paper>
      </ThemeProvider>}
      <CardMedia style={{background: theme.palette.background.paper}}>
        {!inverse && <WaveBorder flip background={theme.palette.secondary.dark}/>}
        {inverse && <WaveBorder background={theme.palette.secondary.dark}/>}
      </CardMedia>
      {children}
    </Card>
  </ThemeProvider>;
};

WaveCard.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  inverse: PropTypes.bool,
  children: PropTypes.element,
  before: PropTypes.element
};


export default withStyles(styles)(WaveCard);
