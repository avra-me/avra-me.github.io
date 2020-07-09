import React, {Fragment, useCallback, useState} from "react";
import PropTypes from "prop-types";
import NavigationDrawer from "../../shared/components/NavigationDrawer";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Button from "@material-ui/core/Button";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import withStyles from "@material-ui/core/styles/withStyles";
import RightHandNavigation from "./RightHandNavigation";
import smoothScrollTop from "../../shared/functions/smoothScrollTop";

const styles = (theme) => ({
  appBar: {
    boxShadow: "none",
    backgroundColor: theme.palette.secondary.main
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  brandIcon: {
    height: theme.typography.h4.fontSize,
  },
  noDecoration: {
    textDecoration: "none !important",
  }
});

function NavBar({menuItems, disabled, staticIconEnabled, logo, classes, aosAnchor, position, useDarkPalette, backgroundColor}) {


  if (disabled) {
    return <Fragment/>;
  }

  const [selectedTab,] = useState(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const handleMobileDrawerOpen = useCallback(() => {
    setIsMobileDrawerOpen(true);
  }, [setIsMobileDrawerOpen]);

  const handleMobileDrawerClose = useCallback(() => {
    setIsMobileDrawerOpen(false);
  }, [setIsMobileDrawerOpen]);

  return (
    <div>
      <AppBar position={position} className={classes.appBar}
              data-aos={aosAnchor ? "fade-down" : undefined}
              data-aos-anchor={aosAnchor || undefined}
              data-aos-anchor-placement="top-top"
              data-aos-once="false"
              data-aos-duration={100}
              style={backgroundColor ? {backgroundColor} : undefined}
      >
        <ThemeProvider theme={createMuiTheme({palette: {type: useDarkPalette ? "dark" : false}})}>
          <Toolbar className={classes.toolbar}>
            <Box height={1}>
              {logo &&
              <Button color="default" onClick={smoothScrollTop}
                      style={(!staticIconEnabled && position === "absolute") ? {
                        display: "none"
                      } : {}}>
                <img className={classes.brandIcon} src={logo} alt={"icon"}/>
              </Button>}
            </Box>
            <RightHandNavigation menuLinks={menuItems} onDrawerOpen={handleMobileDrawerOpen}
                                 onDrawerClose={handleMobileDrawerClose}/>
          </Toolbar>
        </ThemeProvider>
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


NavBar.defaultProps = {
  position: "fixed",
  aosAnchor: undefined,
  useDarkPalette: true,
  backgroundColor: undefined
};

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  position: PropTypes.string,
  aosAnchor: PropTypes.string,
  staticIconEnabled: PropTypes.bool,
  logo: PropTypes.string,
  useDarkPalette: PropTypes.bool,
  backgroundColor: PropTypes.string,
  disabled: PropTypes.bool,
  menuItems: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string,
      onClick: PropTypes.func,
      icon: PropTypes.string,
      order: PropTypes.number
    })]))
};

export default withStyles(styles)(NavBar);
