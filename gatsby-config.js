/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Avrami Hammer, About Me",
    author: {
      name: "Avrami Hammer",
      summary: "I live and work in melbourne building cloud-first web solutions.",
    },
    description: "A simple website showcasing who I am and what I do.",
    siteUrl: "https://avra.me/",
  },
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms.js`,
        enableIdentityWidget: false
      }
    },
    {
      resolve: "gatsby-plugin-material-ui",
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    // {
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     path: `${__dirname}/src/pages/education`,
    //     name: "education",
    //   },
    // },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages/experience`,
        name: "experience",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/assets`,
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
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    }
  ],
};
