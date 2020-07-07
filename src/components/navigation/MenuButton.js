import Button from "@material-ui/core/Button";
import {Link} from "@reach/router";
import React, {useState} from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import clsx from "clsx";
import smoothScrollTop from "../../shared/functions/smoothScrollTop";

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
      background: `linear-gradient(270deg, ${theme.palette.secondary.dark} 0, ${theme.palette.secondary.main} 86%, ${theme.palette.secondary.light} 100%)`,
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


const MenuButton = ({element, classes, onDrawerClose}) => {
  if (React.isValidElement(element)) {
    return element;
  }

  const [isCurrentLink, setIsCurrentLink] = useState(false);

  const onClick = () => {
    smoothScrollTop();
    onDrawerClose();
  };


  const result = <Button
    color="default"
    size="large"
    classes={{
      text: classes.menuButtonText,
      root: clsx(classes.link, (isCurrentLink ? classes.disabledLink : ""))
    }}
    onClick={onClick}
    disableRipple
  >
    {element.name}
  </Button>;

  if (!isCurrentLink) {
    return <Link
      key={element.name}
      to={element.link}
      className={classes.noDecoration}
      getProps={({isCurrent}) => setIsCurrentLink(isCurrent)}
    >
      {result}
    </Link>;
  }
  return result;
};

MenuButton.propTypes = {
  classes: PropTypes.object.isRequired,
  element: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string,
      onClick: PropTypes.func,
      icon: PropTypes.string,
      order: PropTypes.number
    })]),
  onDrawerClose: PropTypes.func.isRequired
};

export default withStyles(styles)(MenuButton);
