import React, {memo, useCallback, useState} from "react";
import PropTypes from "prop-types";
import {Link} from "@reach/router";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import BuildIcon from "@material-ui/icons/Build";
import BookIcon from "@material-ui/icons/Book";
import NavigationDrawer from "../../shared/components/NavigationDrawer";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  appBar: {
    boxShadow: "none",
    backgroundColor: "transparent",
  },
  appBarBack: {
    boxShadow: "none",
    backgroundColor: theme.palette.secondary.main
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  menuButtonText: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
  },
  activeLink: {
    "&::after": {
      content: "",
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
    "&::after": {
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
  brandIcon: {
    height: theme.typography.h4.fontSize,
  },
  noDecoration: {
    textDecoration: "none !important",
  }
});

function NavBar(props) {
  const {
    classes,
    siteBrand,
    isDemo
  } = props;

  const [selectedTab,] = useState(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const handleMobileDrawerOpen = useCallback(() => {
    setIsMobileDrawerOpen(true);
  }, [setIsMobileDrawerOpen]);

  const handleMobileDrawerClose = useCallback(() => {
    setIsMobileDrawerOpen(false);
  }, [setIsMobileDrawerOpen]);

  // TODO: Link this to CRM
  const menuItems = [
    {
      link: "/",
      name: "Home",
      icon: <HomeIcon className="text-white"/>,
    },
    {
      link: "/blog",
      name: "My Blog",
      icon: <BookIcon className="text-white"/>,
    },
    {
      link: "/projects",
      name: "My Projects",
      icon: <BuildIcon className="text-white"/>,
    },
  ];

  const Brand = () => {
    return <Button color="default" href={"/"}>
      <img className={classes.brandIcon} src={siteBrand} alt={"icon"}/>
    </Button>;

  };

  const MenuButtons = () => {
    const isLinkActive = element => ({isCurrent}) => ({
      onClick: (event) => {
        event.preventDefault();
      },
      children: (<Button
        color="default"
        size="large"
        classes={{
          text: classes.menuButtonText,
          root: isCurrent ? classes.disabledLink : classes.activeLink
        }}
        disableRipple
      >
        {element.name}
      </Button>)
    });
    return <div>
      <Hidden mdUp implementation={"css"}>
        <IconButton
          className={classes.menuButton}
          onClick={handleMobileDrawerOpen}
          aria-label="Open Navigation"
        >
          <MenuIcon color="primary"/>
        </IconButton>
      </Hidden>
      <Hidden smDown implementation={"css"}>
        {menuItems.map((element) => {
          if (element.link) {
            return (
              <Link
                key={element.name}
                to={element.link}
                className={classes.noDecoration}
                getProps={isLinkActive(element)}
              />
            );
          }
          return (
            <Button
              color="default"
              size="large"
              onClick={element.onClick}
              classes={{text: classes.activeLink}}
              key={element.name}
            >
              {element.name}
            </Button>
          );
        })}
      </Hidden>
    </div>;

  };

  if (isDemo) {
    return <AppBar position="absolute" className={classes.appBarBack}
    >
      <ThemeProvider theme={createMuiTheme({palette: {type: "dark"}})}>
        <Toolbar className={classes.toolbar}>
          <Box height={1}>
            <Brand/>
          </Box>
          <MenuButtons/>
        </Toolbar>
      </ThemeProvider>
    </AppBar>;
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBarBack}
              data-aos-anchor="#wave-box"
              data-aos-once="false"
              data-aos-duration={100}
              data-aos-anchor-placement="top-top"
              data-aos="fade-down"
      >
        <ThemeProvider theme={createMuiTheme({palette: {type: "dark"}})}>
          <Toolbar className={classes.toolbar}>
            <Box height={1}>
              <Brand/>
            </Box>
            <MenuButtons/>
          </Toolbar>
        </ThemeProvider>
      </AppBar>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Box height={1}/>
          <ThemeProvider theme={createMuiTheme({palette: {type: "dark"}})}>
            <MenuButtons/>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
      <NavigationDrawer
        menuItems={menuItems}
        anchor="right"
        open={isMobileDrawerOpen}
        selectedItem={selectedTab}
        onClose={handleMobileDrawerClose}
      />
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  siteBrand: PropTypes.string,
  isDemo: PropTypes.bool
};

export default withStyles(styles, {withTheme: true})(memo(NavBar));
