import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
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

function SourcedNavigation({menuButtons, ...props}) {

  let {menuItems, navigation, site} = useStaticQuery(getNavigationItemsQuery);

  menuItems = menuItems.edges.map(v => v.node.markdown.info).sort((a, b) => a.order > b.order ? 1 : b.order > a.order ? -1 : 0);

  return (
    <div>
      <NavBar menuItems={[...menuItems, ...menuButtons]} {...navigation} {...site} {...props}/>
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

SourcedNavigation.defaultProps = {
  menuButtons: []
};

SourcedNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  position: PropTypes.string,
  aosAnchor: PropTypes.string,
  useDarkPalette: PropTypes.bool,
  backgroundColor: PropTypes.string,
  menuButtons: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape({
      name: PropTypes.string,
      onClick: PropTypes.func
    })]))
};

export default withStyles(styles)(SourcedNavigation);
