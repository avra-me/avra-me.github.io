import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import React from "react";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

const styles = (theme) => ({
  heading: {
    paddingTop: theme.spacing(10),
    marginBottom: theme.spacing(3)
  }
});

const SectionHeading = ({title, subTitle, classes, ...props}) => {
  return <Box className={classes.heading} {...props}>
    <Typography gutterBottom={false} variant={"h3"} color={"textPrimary"} align={"center"}>
      {title}
    </Typography>
    <Typography gutterBottom={true} variant={"h4"} color={"textSecondary"} align={"center"}>
      {subTitle}
    </Typography>
  </Box>;
};

SectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SectionHeading)
