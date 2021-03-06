import {graphql, useStaticQuery} from "gatsby";
import React from "react";
import PropTypes from "prop-types";
import EducationCard from "./EducationCard";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core";
import SectionHeading from "../common/SectionHeading";
import Container from "@material-ui/core/Container";

const styles = (theme) => ({
  heading: {
    paddingTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
});

const ListEducationView = ({featuredOnly}) => {
  const result = useStaticQuery(listEducationData);

  const {files} = result;

  return <Container>
    <SectionHeading title={"Education"} subTitle={"I'm always learning, but here is my formal education."}
                    id={"education"}/>
    <Grid container spacing={4} alignItems={"stretch"} direction="row" justify={"center"}>

      {files.values.map(({slug, markdown}, i) => {
        const {info, excerpt} = markdown;
        info.short = info.short || excerpt;
        const data = {...info, excerpt, slug};
        return (featuredOnly ? info.featured : true) &&
          <EducationCard key={slug} data={data} flip={i % 2 === 0} delay={i * .100}/>;
      })}
    </Grid>
  </Container>;
};

const listEducationData = graphql`query ListEducationData {
  files: allFile(filter: {sourceInstanceName: {eq: "education"}}, sort: {fields: childMarkdownRemark___frontmatter___startDate, order: DESC}) {
    values:nodes {
       slug: name
       markdown: childMarkdownRemark {
          id
          excerpt(pruneLength: 160)
          info:frontmatter {
            title
            subTitle
            date(formatString: "MMMM DD, YYYY")
            startDate(formatString: "YYYY MMM DD")
            endDate(formatString: "YYYY MMM DD")
            short
            featured
            link
        }
      }
    }
  }
}`;

ListEducationView.propTypes = {
  featuredOnly: PropTypes.bool,
  classes: PropTypes.object
};

export default withStyles(styles)(ListEducationView);
