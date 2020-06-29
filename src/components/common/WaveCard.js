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

const styles = (theme) => ({
  root: {
    height: "100%"
  },
  dark: {
    background: theme.palette.secondary.dark
  }
});
const WaveCard = ({inverse, classes, className, children, ...props}) => {
  const theme = useTheme();

  return <ThemeProvider theme={createMuiTheme({palette: {type: inverse ? "dark" : "light"}})}>
    <Card {...props} className={clsx(className, inverse ? classes.dark : "")}>

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
  children: PropTypes.element
};


export default withStyles(styles)(WaveCard);
