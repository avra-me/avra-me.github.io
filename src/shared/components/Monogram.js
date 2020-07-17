import Button from "@material-ui/core/Button";
import smoothScrollTop from "../functions/smoothScrollTop";
import Box from "@material-ui/core/Box";
import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  brandIcon: {
    height: theme.typography.h4.fontSize,
  },
});

const Monogram = ({classes, logo, visible}) => {


  return <Box height={1}>
    {logo &&
    <Button color="default" onClick={smoothScrollTop}
            style={visible ? {
              display: "none"
            } : {}}>
      <img className={classes.brandIcon} src={logo} alt={"icon"}/>
    </Button>}
  </Box>;
};

Monogram.defaultProps = {};

Monogram.propTypes = {
  classes: PropTypes.object.isRequired,
  logo: PropTypes.string,
  visible: PropTypes.bool

};

export default withStyles(styles)(Monogram);
