import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {lighten, Typography, withStyles} from "@material-ui/core";
import ErrorBoundary from "../ErrorBoundary";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  iconWrapper: {
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1.5),
  },
});

function IconCard(props) {
  const {classes, Icon, color, headline, text} = props;
  return (
    <Grid container alignItems={"center"} justify={"center"} direction={"column"}>
      <ErrorBoundary variant="rect">
        <Grid item className={classes.iconWrapper}  style={{
          color: color,
          backgroundColor: lighten(color, 0.5),
          fill: color,
        }}>
            {Icon}
        </Grid>
      </ErrorBoundary>
      <Grid item>
        <Typography variant="h5" gutterBottom={false} align={"left"}>
          <ErrorBoundary variant={"text"}>
            {headline}
          </ErrorBoundary>
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" color="textSecondary" align={"center"} paragraph>
          <ErrorBoundary variant={"text"}>
            {text}
          </ErrorBoundary>
        </Typography>
      </Grid>
    </Grid>
  );
}

IconCard.propTypes = {
  classes: PropTypes.object.isRequired,
  Icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

IconCard.getDerivedStateFromError = () => ({isErrorState: true});

export default withStyles(styles)(IconCard);
