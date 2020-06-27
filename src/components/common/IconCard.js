import React from "react";
import PropTypes from "prop-types";
import {lighten, Typography, withStyles} from "@material-ui/core";
import ErrorBoundary from "../ErrorBoundary";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";

const styles = (theme) => ({
  iconWrapper: {
    display: "inline-flex",
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1.5),
    marginRight: theme.spacing(3)
  },
  root: {
    marginBottom: theme.spacing(5),
    [theme.breakpoints.up("md")]: {
      marginBottom: theme.spacing(3)
    }
  },
  avatar: {
    flex: "0 0 auto",
    marginRight: 16,
  }
});

function IconCard(props) {
  const {classes, icon, color, headline, children, animate, animationDelay, buttons} = props;
  const iconStyling = {
    color: color,
    backgroundColor: lighten(color, 0.5),
    fill: color,
  };
  return (
    <Grid
      item
      xs={12}
      md={6}
      data-aos={animate ? "fade-up" : false}
      data-aos-delay={animationDelay}
      className={classes.root}
    >
      <ErrorBoundary variant={"rect"} width={200} height={200}>
        <Grid container alignItems={"center"} justify={"center"} direction={"row"}>
          <Grid xs={10} item container direction={"row"} alignItems={"center"}>
            <div className={classes.avatar}>
              <Avatar style={iconStyling}>{icon}</Avatar>
            </div>
            <Typography variant="h5" gutterBottom={false} align={"left"} component={"span"}>
              {headline}
            </Typography>
            <Grid xs={12} item>
              <Typography variant="body1" color="textSecondary" align={"left"} paragraph component={"div"}>
                {children}
              </Typography>
            </Grid>
            <Grid xs={12} item>
              {buttons}
            </Grid>
          </Grid>

        </Grid>
      </ErrorBoundary>
    </Grid>
  );
}

IconCard.defaultProps = {
  animationDelay: 100,
  buttons: []
};

IconCard.propTypes = {
  classes: PropTypes.object.isRequired,
  headline: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.element),
  children: PropTypes.element,
  animate: PropTypes.bool,
  animationDelay: PropTypes.number,
};

export default withStyles(styles)(IconCard);
