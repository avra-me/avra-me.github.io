import React from "react";
import {graphql} from "gatsby";
import App from "../App";
import PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent";
import ProgressiveImage from "gatsby-image";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import SourcedNavigation from "../components/navigation/SourcedNavigation";
import WaveCard from "../components/common/WaveCard";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  header: {
    padding: theme.spacing(4)
  },
  wave: {
    height: "20%"
  },
  image: {
    maxWidth: "325px",
    flexGrow: 1
  }
});


const ExperienceTemplate = ({data, classes}) => {
  const DynamicImage = () => {
    if (data.image !== null) {
      return <ProgressiveImage className={classes.image} fluid={data.image.progressive.fluid}/>;
    } else {
      return <img className={classes.image} src={markdown.info.image} alt={"Image could not be loaded"}/>;
    }
  };
  const {markdown} = data.file;
  let {startDate, endDate, link} = markdown.info;
  endDate = endDate === "Invalid date" ? "Current" : endDate;

  const header = <Container>
    <Grid container alignItems={"stretch"} className={"lg-p-top"}>
      <Grid item sm={2} xs={12} container alignItems={"center"} justify={"center"}>
        <DynamicImage/>
      </Grid>
      <Grid item sm={8} xs={12}>
        <Grid container className={classes.header}>

          <Grid item xs={12} sm={11}>
            <Typography variant={"h5"}>{markdown.info.title}</Typography>
          </Grid>
          <Grid item xs={12} sm={1} container alignItems={"flex-end"}>
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
          {link &&
          <CardActions>
            <Button color={"primary"} variant={"contained"} href={link}>View Demo</Button>
          </CardActions>
          }
        </WaveCard>
      </div>
    </App>
  );
};

ExperienceTemplate.propTypes = {
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
          startDate: PropTypes.string,
          endDate: PropTypes.string,
          image: PropTypes.string,
          subTitle: PropTypes.string,
          date: PropTypes.string,
          short: PropTypes.string,
          featured: PropTypes.string,
          link: PropTypes.string
        })
      })
    }),
    slug: PropTypes.string,
    type: PropTypes.string,
  })
};

export default withStyles(styles)(ExperienceTemplate);

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
        link
      }
    }
  }
  image: file(relativePath: {eq: $image}, sourceInstanceName: {eq: "assets"}, ext: {nin: [".svg", "svg"]}) {
    progressive: childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`;
