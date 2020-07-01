import React from "react";
import {graphql} from "gatsby";
import App from "../App";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import CardActions from "@material-ui/core/CardActions";
import SourcedNavigation from "../components/navigation/SourcedNavigation";

const EducationTemplate = ({data}) => {
    const {markdown} = data.file;
    let {startDate, endDate} = markdown.info;
    endDate = endDate === "Invalid date" ? "Current" : endDate;
    return (
        <App>
            <SourcedNavigation/>
            <div className={"container-fluid lg-mg-top"}>
                <Card>
                    <Grid container alignItems={"stretch"} className={"lg-p-top"}>
                        <Grid item xs={8}>
                            <CardHeader title={markdown.info.title}
                                        subheader={markdown.info.short || markdown.excerpt}/>
                        </Grid>
                    </Grid>
                    <CardActions>
                        <Chip label={`${startDate}-${endDate}`}/>
                    </CardActions>

                    <CardContent dangerouslySetInnerHTML={{__html: markdown.html}}/>
                </Card>
            </div>
        </App>
    );
};

EducationTemplate.propTypes = {
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
                    subTitle: PropTypes.string,
                    date: PropTypes.string,
                    short: PropTypes.string,
                    featured: PropTypes.string,
                    startDate: PropTypes.string,
                    endDate: PropTypes.string
                })
            })
        }),
        slug: PropTypes.string,
        type: PropTypes.string,
    })
};

export default EducationTemplate;

export const pageQuery = graphql`
query EducationPostBySlug($slug: String!, $image: String) {
  file(name: {eq: $slug}) {
    type: sourceInstanceName
    slug: name
    markdown: childMarkdownRemark {
      id
      excerpt(pruneLength: 160)
      html
      info: frontmatter {
        title
        subTitle
        date(formatString: "MMMM DD, YYYY")
        short
        featured
        startDate(formatString: "MMMM YYYY")
        endDate(formatString: "MMMM YYYY")
      }
    }
  }
  image: file(relativePath: {eq: $image}, sourceInstanceName: {eq: "assets"}, ext: {ne: ".svg"}) {
    progressive: childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`;
