import React from "react";
import {graphql} from "gatsby";
import App from "../App";
import PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import WaveJumbotron from "../components/common/WaveJumbotron";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import DynamicPageHeader from "../shared/components/DynamicPageHeader";

const styles = () => ({
  alignRight: {
    marginLeft: "auto !important"
  }
});


const ExperienceTemplate = ({data, classes}) => {
  const {markdown} = data.file;
  let {startDate, endDate, link} = markdown.info;
  endDate = endDate === "Invalid date" ? "Current" : endDate;


  return (
    <App showContactForm>
      <WaveJumbotron>
        <DynamicPageHeader
          title={markdown.info.title}
          subTitle={markdown.info.subTitle}
          text={markdown.info.short}
          image={data.image !== null ? data.image.progressive.fluid : markdown.info.image}
        />
      </WaveJumbotron>
      <Container>
        <div className={"container-fluid lg-mg-top"}>
          <Paper elevation={0}>
            <CardActions>
              {link &&
              <Button color={"primary"} variant={"contained"} href={link}>View Demo</Button>
              }
              <Tooltip
                title={`I started work ${startDate} and ${endDate === "Current" ? "currently work here" : `finished ${endDate}`}`}>
                <Chip className={classes.alignRight} clickable color={"secondary"} icon={<CalendarIcon/>}
                      label={`${startDate}-${endDate}`}/>
              </Tooltip>
            </CardActions>
            <CardContent>
              <Typography>
                <div dangerouslySetInnerHTML={{__html: markdown.html}}/>
              </Typography>
            </CardContent>
          </Paper>
        </div>
      </Container>
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
