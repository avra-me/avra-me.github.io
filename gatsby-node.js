// eslint-disable-next-line no-undef
const path = require("path");


// eslint-disable-next-line no-undef
exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions;

  const templates = {
    "experience": path.resolve("./src/pageTemplates/ExperienceTemplate.js"),
    "education": path.resolve("./src/pageTemplates/EducationTemplate.js")
  };
  const result = await graphql(
    `{
        files: allFile {
          values: nodes {
            type: sourceInstanceName
            slug: name
            markdown: childMarkdownRemark {
             info: frontmatter {
               image
             }
            }
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
      if (page.markdown && page.markdown.info.image) {
        createPage({
          path: `/${page.type}/${page.slug}`,
          component: template,
          context: {
            slug: page.slug,
            image: page.markdown.info.image.replace("/assets/", "")
          },
        });
      } else {
        createPage({
          path: `/${page.type}/${page.slug}`,
          component: template,
          context: {
            slug: page.slug
          },
        });
      }
    }


  });
};

