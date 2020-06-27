/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const safeRequire = (v) => {
  try {
    return require(v);
  } catch (e) {
    console.log(e);
    return {};
  }
};

const buildSiteMetadata = () => {
  const siteMetadata = Object.assign({}, safeRequire("./content/config.json"));
  siteMetadata.navigation = safeRequire("./content/common/navigation/config.json");
  siteMetadata.footer = {
    header: siteMetadata.author.name,
    caption: siteMetadata.author.description,
    ...safeRequire("./content/common/footer/config.json")
  };
  return siteMetadata;
};

module.exports = {
  siteMetadata: buildSiteMetadata(),
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
        stylesProvider: {
          injectFirst: true,
        },
      },
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
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./src/config/",
        name: "config"
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
