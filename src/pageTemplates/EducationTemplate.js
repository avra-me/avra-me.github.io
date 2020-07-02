import React from "react";
import {graphql} from "gatsby";
import App from "../App";
import PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import SourcedNavigation from "../components/navigation/SourcedNavigation";
import WaveCard from "../components/common/WaveCard";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  header: {
    padding: theme.spacing(4)
  }
});

const EducationTemplate = ({data, classes}) => {
  const {markdown} = data.file;
  let {startDate, endDate} = markdown.info;
  endDate = endDate === "Invalid date" ? "Current" : endDate;

  const header = <Container>
    <Grid container className={classes.header} direction={"row"}>
      <Grid item xs={12} sm={10}>
        <Typography variant={"h5"}>{markdown.info.title}</Typography>
      </Grid>
      <Grid item xs={12} sm={2} container alignItems={"flex-end"}>
        <Chip color={"primary"} icon={<CalendarIcon/>}
              label={`${startDate}-${endDate}`}/>
      </Grid>
      <Grid item xs={12} sm={10}>
        <Typography variant={"body1"} color={"textSecondary"} gutterBottom>{markdown.info.subTitle}</Typography>
      </Grid>

      <Grid item xs={12} sm={12}>
        <Typography variant={"body1"} color={"textPrimary"} paragraph>{markdown.info.short}</Typography>
      </Grid>
    </Grid>
  </Container>;
  return (
    <App>
      <SourcedNavigation/>
      <div className={"container-fluid lg-mg-top"}>
        <WaveCard before={header}>
          <CardContent>
            <Typography>
              <div dangerouslySetInnerHTML={{__html: markdown.html}}/>
            </Typography>
          </CardContent>
        </WaveCard>
      </div>
    </App>
  );
};

EducationTemplate.propTypes = {
  classes: PropTypes.object,
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

export default withStyles(styles)(EducationTemplate);

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
