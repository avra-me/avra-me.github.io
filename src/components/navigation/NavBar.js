import React, {Fragment, useCallback, useContext, useState} from "react";
import PropTypes from "prop-types";
import NavigationDrawer from "../../shared/components/NavigationDrawer";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import withStyles from "@material-ui/core/styles/withStyles";
import RightHandNavigation from "./RightHandNavigation";
import {motion} from "framer-motion";
import {NavigationAppearContext} from "../../shared/contexts/NavigationAppearContext";
import Monogram from "../../shared/components/Monogram";

const styles = (theme) => ({
  appBar: {
    boxShadow: "none",
    backgroundColor: theme.palette.secondary.main,
    zIndex: 100
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

function NavBar({menuItems, disabled, staticIconEnabled, logo, classes, position, useDarkPalette, backgroundColor}) {


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

  // eslint-disable-next-line no-undef
  const {isVisible} = useContext(NavigationAppearContext);


  return (<>
      <motion.div
        style={{position, width: "100%", zIndex: 99}}
        initial={false}
        animate={isVisible || position === "absolute" ? "visible" : "hidden"}
        variants={{
          visible: {opacity: 1, top: 0, transition: {duration: .3, delay: .3}},
          hidden: {opacity: 0, top: "-200px", transition: {duration: .1, delay: 0}}
        }}
      >
        <AppBar position={"absolute"} className={classes.appBar}
                style={backgroundColor ? {backgroundColor} : undefined}
        >
          <ThemeProvider theme={createMuiTheme({palette: {type: useDarkPalette ? "dark" : false}})}>
            <Toolbar className={classes.toolbar}>
              <Monogram logo={logo} visible={!staticIconEnabled && position === "absolute"}/>

              <RightHandNavigation menuLinks={menuItems} onDrawerOpen={handleMobileDrawerOpen}
                                   onDrawerClose={handleMobileDrawerClose}/>
            </Toolbar>
          </ThemeProvider>

        </AppBar>
      </motion.div>

      <NavigationDrawer
        menuItems={menuItems}
        anchor="right"
        open={isMobileDrawerOpen}
        selectedItem={selectedTab}
        onClose={handleMobileDrawerClose}
      />
    </>
  )
    ;
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
