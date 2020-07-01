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
import NavBar from "./NavBar";

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

function SourcedNavigation(props) {

    let {menuItems, navigation, site} = useStaticQuery(getNavigationItemsQuery);

    menuItems = menuItems.edges.map(v => v.node.markdown.info).sort((a, b) => a.order > b.order ? 1 : b.order > a.order ? -1 : 0);

    return (
        <div>
            <NavBar menuItems={menuItems} {...navigation} {...site} {...props}/>
        </div>
    );
}

const getNavigationItemsQuery = graphql`
query GetNavigationItems {
  menuItems: allFile(filter: {sourceInstanceName: {eq: "content-v2"}, childMarkdownRemark: {frontmatter: {type: {eq: "navigation"}}}}) {
    edges {
      node {
        markdown: childMarkdownRemark {
          info: frontmatter {
            name: title
            link
            icon
            order
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

SourcedNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
    position: PropTypes.string,
    aosAnchor: PropTypes.string,
    useDarkPalette: PropTypes.bool,
    backgroundColor: PropTypes.string
};

export default withStyles(styles)(memo(SourcedNavigation));
