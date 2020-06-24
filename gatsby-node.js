// eslint-disable-next-line no-undef
const path = require("path");
// eslint-disable-next-line no-undef
const {createFilePath} = require("gatsby-source-filesystem");
// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
// exports.onCreatePage = ({page, actions}) => {
//   // Make the front page match everything client side.
//   const {createPage} = actions;
//   // Normally your paths should be a bit more judicious.
//   if (page.path === "/") {
//     page.matchPath = "/(?!static)/?*|/";
//     createPage(page);
//   }
// };

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions;

  const templates = {
    "experience": path.resolve("./src/templates/ExperienceTemplate.js")
  };
  const result = await graphql(
    `{
        files: allFile {
          values: nodes {
            type: sourceInstanceName
            slug: name
          }
        }
      }`
  );
  if (result.errors) {
    throw result.errors;
  }

  result.data.files.values.forEach((page) => {
    const template = templates[page.type];
    if (template) {
      createPage({
        path: `/experience/${page.slug}`,
        component: template,
        context: {
          slug: page.slug,
        },
      });
    }


  });
};

