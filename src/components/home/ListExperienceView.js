import {graphql, useStaticQuery} from "gatsby";
import React from "react";
import PropTypes from "prop-types";
import ExperienceCard from "./ExperienceCard";
import SectionHeading from "../common/SectionHeading";
import Container from "@material-ui/core/Container";


const ListExperienceView = ({featuredOnly, headerComponent: HeaderComponent}) => {
  const data = useStaticQuery(listExperienceQuery);

  const {images, files, site} = data;

  files.values.forEach(({markdown}) => {
    const currentImage = markdown.info.image;
    images.values.forEach(image => {
      if (`/${image.dir}/${image.path}` === currentImage && image.childImageSharp !== null) {
        markdown.info.image = image.childImageSharp.fluid;
      }
    });
  });

  return <>
    <HeaderComponent title={"Experience"} subTitle={"What I've done and where I've been"} monogram={site.logo}/>
    <Container>
      {files.values.map(({slug, markdown}, i) => {
        const {info, excerpt} = markdown;

        const data = {...info, excerpt, slug};
        return (featuredOnly ? info.featured : true) &&
          <ExperienceCard key={slug} data={data} flip={i % 2 === 0} delay={i * .100}/>;
      })}
    </Container>

  </>;
};

const listExperienceQuery = graphql`query ListExperienceData {
  files: allFile(filter: {sourceInstanceName: {eq: "experience"}}, sort: {fields: childMarkdownRemark___frontmatter___date, order: DESC}) {
    values:nodes {
       slug: name
       markdown: childMarkdownRemark {
          id
          excerpt(pruneLength: 160)
          info:frontmatter {
            title
            image
            subTitle
            date(formatString: "MMMM DD, YYYY")
            short
            featured
            link
        }
      }
    }
  }
  images: allFile(filter: {sourceInstanceName: {eq: "assets"}, extension: {nin: [".svg", "svg"]}}) {
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
  site: contentYaml {
    logo
  }
}`;

ListExperienceView.defaultProps = {
  headerComponent: SectionHeading
};

ListExperienceView.propTypes = {
  featuredOnly: PropTypes.bool,
  headerComponent: PropTypes.elementType
};

export default ListExperienceView;
