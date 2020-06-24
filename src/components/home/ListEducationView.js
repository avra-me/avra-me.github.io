import {graphql, useStaticQuery} from "gatsby";
import React from "react";
import PropTypes from "prop-types";
import ExperienceCard from "./ExperienceCard";
import EducationCard from "./EducationCard";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {withStyles} from "@material-ui/core";

const styles = (theme) => ({
  heading: {
    paddingTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
});

const ListEducationView = ({featuredOnly, classes}) => {
  const result = useStaticQuery(listEducationData);

  const {files} = result;

  return <div className="container-fluid section">
    <Box className={classes.heading}>
      <Typography gutterBottom={false} variant={"h3"} color={"textPrimary"} align={"center"}>
        Education
      </Typography>
      <Typography gutterBottom={true} variant={"h4"} color={"textSecondary"} align={"center"}>
        I'm always learning, but here is my formal education.
      </Typography>
    </Box>
    <Grid container spacing={4} alignItems={"stretch"} direction="row" justify={"center"}>

      {files.values.map((page, i) => {
        const {excerpt, info,} = page.markdown;
        info.short = info.short || excerpt;
        const data = {...info, excerpt, slug: page.slug};
        return (featuredOnly ? info.featured : true) &&
          <EducationCard key={page.id} data={data} flip={i % 2 === 0} delay={i * 100}/>;
      })}
    </Grid>
  </div>;
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
