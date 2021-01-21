import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import React from "react";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";

const styles = (theme) => ({
  heading: {
    paddingTop: theme.spacing(10),
    marginBottom: theme.spacing(6),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
});

const SectionHeading = ({title, subTitle, align, classes, ...props}) => {
  return (
    <Box className={classes.heading} {...props}>
      <Typography
        component={"div"}
        gutterBottom={false}
        variant={"h4"}
        color={"textPrimary"}
        align={align}
        className={classes.title}
      >
        {title}
      </Typography>
      {subTitle && (
        <Typography
          component={"div"}
          gutterBottom={true}
          variant={"subtitle1"}
          color={"textSecondary"}
          align={align}
        >
          {subTitle}
        </Typography>
      )}
      <Divider/>
    </Box>
  );
};

SectionHeading.defaultProps = {
  align: "left",
};

SectionHeading.propTypes = {
  title: PropTypes.node.isRequired,
  subTitle: PropTypes.node,
  align: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SectionHeading);
