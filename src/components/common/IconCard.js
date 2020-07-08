import React, {memo} from "react";
import PropTypes from "prop-types";
import {lighten, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import {motion} from "framer-motion";

const styles = (theme) => ({
  iconWrapper: {
    display: "inline-flex",
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1.5),
    marginRight: theme.spacing(3)
  },
  root: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      marginBottom: theme.spacing(1)
    },
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px !important`
  },
  content: {
    flexGrow: 1
  },
  avatar: {
    flex: "0 0 auto",
    marginRight: 16,
  }
});

function IconCard(props) {
  const {classes, icon, color, headline, children, animate, animationDelay, buttons, ...waveCardProps} = props;
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
      // data-aos={animate ? "fade-up" : false}
      // data-aos-delay={animationDelay}
      className={classes.root}
    >
      <motion.span
        initial={{opacity: 0, y: -100}}
        animate={{opacity: 1}}
        transition={{ duration: 2, delay: animationDelay/100}}
      >
        <Card {...waveCardProps}>
          <CardHeader title={headline} titleTypographyProps={{variant: "h6"}}
                      avatar={<Avatar style={iconStyling}>{icon}</Avatar>}/>
          <CardContent className={classes.content}>{children}</CardContent>
          <CardActions>{buttons}</CardActions>
        </Card>
      </motion.span>
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
  buttons: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  animate: PropTypes.bool,
  animationDelay: PropTypes.number,
};

export default withStyles(styles)(memo(IconCard));
