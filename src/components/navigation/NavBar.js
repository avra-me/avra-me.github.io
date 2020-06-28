import React, {memo, useCallback, useState} from "react";
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
import {graphql, useStaticQuery} from "gatsby";

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

function NavBar({classes, aosAnchor, position, useDarkPalette, backgroundColor}) {

  let {menuItems, navigation, site} = useStaticQuery(getNavigationItemsQuery);

  if (navigation.disabled) {
    return null;
  }


  menuItems = menuItems.edges.map(v => v.node.markdown.info);

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
              {site.logo && <Button color="default" href={"/"}  style={(!navigation.staticIconEnabled && position === "absolute") ? {
                display: "none"
              }: {}}>
                <img className={classes.brandIcon} src={site.logo} alt={"icon"}/>
              </Button>}
            </Box>
            <RightHandNavigation menuLinks={menuItems} onDrawerOpen={handleMobileDrawerOpen}/>
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

const getNavigationItemsQuery = graphql`
query GetNavigationItems {
  menuItems: allFile(filter: {sourceInstanceName: {eq: "content-v2"}, childMarkdownRemark: {frontmatter: {type: {eq: "navigation"}}}}, sort: {fields: childMarkdownRemark___frontmatter___order, order: ASC}) {
    edges {
      node {
        markdown: childMarkdownRemark {
          info: frontmatter {
            name: title
            link
            icon
          }
        }
      }
    }
  }
  navigation: navigationYaml {
    staticIconEnabled
    disabled
  }
  site: contentYaml {
    logo
  }

}

`;

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
  useDarkPalette: PropTypes.bool,
  backgroundColor: PropTypes.string
};

export default withStyles(styles)(memo(NavBar));
