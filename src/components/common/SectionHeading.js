import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import React from "react";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

const styles = (theme) => ({
  heading: {
    paddingTop: theme.spacing(10),
    marginBottom: theme.spacing(6)
  },
  title: {
    marginBottom: theme.spacing(3)
  }
});

const SectionHeading = ({title, subTitle, classes, ...props}) => {
  return <Box className={classes.heading} {...props}>
    <Typography component={"div"} gutterBottom={false} variant={"h4"} color={"textPrimary"} align={"center"} className={classes.title}>
      {title}
    </Typography>
    {subTitle && <Typography component={"div"} gutterBottom={true} variant={"h5"} color={"textSecondary"} align={"center"}>
      {subTitle}
    </Typography>}
  </Box>;
};

SectionHeading.propTypes = {
  title: PropTypes.node.isRequired,
  subTitle: PropTypes.node,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SectionHeading);
