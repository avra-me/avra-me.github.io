import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import PropTypes from "prop-types";
import ExperienceCard from "./ExperienceCard";
import SectionHeading from "../common/SectionHeading";

const experienceSortLogic = (
  element1,
  element2
) => {
  const firstDate = new Date(element1.markdown.info.endDate);
  const secondDate = new Date(element2.markdown.info.endDate);

  if (isNaN(firstDate.getTime())) {
    return -1;
  }

  if (isNaN(secondDate.getTime())) {
    return 1;
  }

  if (firstDate > secondDate) {
    return -1;
  }
  if (firstDate < secondDate) {
    return 1;
  }
  return 0;
};

const ListExperienceView = ({ featuredOnly }) => {
  const data = useStaticQuery(listExperienceQuery);

  const { images, files } = data;

  files.values.forEach(({ markdown }) => {
    const currentImage = markdown.info.image;
    images.values.forEach((image) => {
      if (
        `/${image.dir}/${image.path}` === currentImage &&
        image.childImageSharp !== null
      ) {
        markdown.info.image = image.childImageSharp.fluid;
      }
    });
  });

  return files.values.sort(experienceSortLogic).map(({ slug, markdown }, i) => {
    const { info, excerpt } = markdown;

    const data = { ...info, excerpt, slug };
    return (
      (featuredOnly ? info.featured : true) && (
        <ExperienceCard
          key={slug}
          data={data}
          flip={i % 2 === 0}
          delay={i * 0.1}
        />
      )
    );
  });
};

const listExperienceQuery = graphql`
  query ListExperienceData {
    files: allFile(
      filter: { sourceInstanceName: { eq: "experience" } }
      sort: { fields: childMarkdownRemark___frontmatter___endDate, order: DESC }
    ) {
      values: nodes {
        slug: name
        markdown: childMarkdownRemark {
          id
          excerpt(pruneLength: 160)
          info: frontmatter {
            title
            image
            subTitle
            endDate(formatString: "MMMM DD, YYYY")
            short
            featured
            link
          }
        }
      }
    }
    images: allFile(
      filter: {
        sourceInstanceName: { eq: "assets" }
        extension: { nin: [".svg", "svg"] }
      }
    ) {
      values: nodes {
        dir: sourceInstanceName
        path: relativePath
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;

ListExperienceView.defaultProps = {
  headerComponent: SectionHeading,
};

ListExperienceView.propTypes = {
  featuredOnly: PropTypes.bool,
  headerComponent: PropTypes.elementType,
};

export default ListExperienceView;
