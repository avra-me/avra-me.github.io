import React from "react";
import {graphql} from "gatsby";
import App from "../App";
import theme from "../config/theme.json";
import footer from "../config/footer.json";
import navigation from "../config/navigation.json";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import NavBar from "../components/navigation/NavBar";
import CardHeader from "@material-ui/core/CardHeader";
import ProgressiveImage from "gatsby-image";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

const ExperienceTemplate = ({data}) => {
  const DynamicImage = () => {
    if (data.image.progressive) {
      return <ProgressiveImage fluid={data.image.progressive.fluid}/>;
    } else {
      return <img src={markdown.info.image} alt={"Image could not be loaded"}/>;
    }
  };
  const {markdown} = data.file;
  let {startDate, endDate} = markdown.info;
  endDate = endDate === "Invalid date" ? "Current" : endDate;
  return (
    <App theme={theme} footer={footer} navigation={navigation}>
      <NavBar siteBrand={theme.logo} links={navigation.links}/>
      <div className={"container-fluid lg-mg-top"}>
        <Card>
          <Grid container alignItems={"stretch"} className={"lg-p-top"}>
            <Grid item xs={2}>
              <DynamicImage/>
            </Grid>
            <Grid item xs={8}>
              <CardHeader title={markdown.info.title} subheader={markdown.info.short || markdown.excerpt}/>
              <Chip label={`${startDate}-${endDate}`}/>
            </Grid>
          </Grid>

          <CardContent dangerouslySetInnerHTML={{__html: markdown.html}}/>
        </Card>
      </div>
    </App>
  );
};

ExperienceTemplate.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.shape({
      progressive: PropTypes.shape({
        fluid: PropTypes.object
      })
    }),
    file: PropTypes.shape({
      markdown: PropTypes.shape({
        id: PropTypes.string,
        excerpt: PropTypes.string,
        html: PropTypes.string,
        info: PropTypes.shape({
          title: PropTypes.string,
          startDate: PropTypes.string,
          endDate: PropTypes.string,
          image: PropTypes.string,
          subTitle: PropTypes.string,
          date: PropTypes.string,
          short: PropTypes.string,
          featured: PropTypes.string
        })
      })
    }),
    slug: PropTypes.string,
    type: PropTypes.string,
  })
};

export default ExperienceTemplate;

export const pageQuery = graphql`
query ExperiencePostBySlug($slug: String!, $image: String) {
  file(name: {eq: $slug}) {
    type: sourceInstanceName
    slug: name
    markdown: childMarkdownRemark {
      id
      excerpt(pruneLength: 160)
      html
      info: frontmatter {
        title
        image
        subTitle
        date(formatString: "MMMM DD, YYYY")
        short
        featured
        startDate(formatString: "MMMM YYYY")
        endDate(formatString: "MMMM YYYY")
      }
    }
  }
  image: file(relativePath: {eq: $image}, sourceInstanceName: {eq: "assets"}, ext: {ne: "svg"}) {
    progressive: childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`;
