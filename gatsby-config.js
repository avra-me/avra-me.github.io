/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */


module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: "./src/cms.js",
        enableIdentityWidget: false
      }
    },
    {
      resolve: "gatsby-plugin-material-ui",
      options: {
        injectFirst: true
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./src/pages/education",
        name: "education",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./content",
        name: "content-v2",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./src/pages/experience",
        name: "experience",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./static/assets",
        name: "assets",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: {
              wrapperStyle: "margin-bottom: 1.0725rem",
            },
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
        ],
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-yaml",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-131741134-2"
      },
    }
  ],
};
