import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {Link} from "@reach/router";
import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import clsx from "clsx";
import MenuButton from "./MenuButton";

const styles = (theme) => ({
  menuButtonText: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
  },
  link: {
    "&:after": {
      content: "\"\"",
      display: "block",
      height: "2px",
      background: `linear-gradient(270deg, ${theme.palette.primary.dark} 0, ${theme.palette.primary.main} 86%, ${theme.palette.primary.light} 100%)`,
      borderRadius: "1px",
      transition: "width .2s ease-in-out",
      left: 0,
      bottom: 0,
      width: 0,
      position: "absolute"
    },
    "&:hover": {
      backgroundColor: "transparent",
      "&::after": {
        width: "100%"
      }
    }
  },
  disabledLink: {
    fontWeight: "bold",
  },
  noDecoration: {
    textDecoration: "none !important",
  }
});


const RightHandNavigation = ({menuLinks, classes, onDrawerOpen, onDrawerClose}) => {
  return <div>
    <Hidden mdUp implementation={"css"}>
      <IconButton
        onClick={onDrawerOpen}
        aria-label="Open Navigation"
      >
        <MenuIcon color="primary"/>
      </IconButton>
    </Hidden>
    <Hidden smDown implementation={"css"}>
      {menuLinks.map((element) => <MenuButton key={element.order} element={element} onDrawerClose={onDrawerClose}/>)}
    </Hidden>
  </div>;
};

RightHandNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  menuLinks: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string,
      onClick: PropTypes.func,
      icon: PropTypes.string,
      order: PropTypes.number
    })])),
  onDrawerOpen: PropTypes.func.isRequired,
  onDrawerClose: PropTypes.func.isRequired
};

export default withStyles(styles)(RightHandNavigation);
