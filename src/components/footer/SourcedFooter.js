import {graphql, useStaticQuery} from "gatsby";
import Footer from "./Footer";
import React from "react";


const SourcedFooter = () => {
  let {socialButtons, attributionButtons, site} = useStaticQuery(getFooterConfigQuery);
  socialButtons = socialButtons.edges.map(v => v.node.markdown.info);
  attributionButtons = attributionButtons.edges.map(v => v.node.markdown.info);
  return <Footer
    title={site.siteMetadata.footer.header}
    subTitle={site.siteMetadata.footer.caption}
    disabled={site.siteMetadata.footer.disabled}
    socialIcons={socialButtons}
    attributionIcons={attributionButtons}
  />;
};

const getFooterConfigQuery = graphql`
  query GetFooterConfig {
  socialButtons: allFile(filter: {sourceInstanceName: {eq: "content-v2"}, childMarkdownRemark: {frontmatter: {type: {eq: "attr"}}}}) {
    edges {
      node {
        markdown: childMarkdownRemark {
          info: frontmatter {
            label
            icon
            link
          }
        }
      }
    }
  }
  attributionButtons: allFile(filter: {sourceInstanceName: {eq: "content-v2"}, childMarkdownRemark: {frontmatter: {type: {eq: "social"}}}}) {
    edges {
      node {
        markdown: childMarkdownRemark {
          info: frontmatter {
            label
            icon
            link
          }
        }
      }
    }
  }
  site {
    siteMetadata {
      footer {
        disabled
        header
        caption
      }
    }
  }
}
`;

export default SourcedFooter;
