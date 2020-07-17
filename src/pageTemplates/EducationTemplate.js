import React from "react";
import {graphql} from "gatsby";
import App from "../App";
import PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import withStyles from "@material-ui/core/styles/withStyles";
import WaveJumbotron from "../components/common/WaveJumbotron";
import DynamicPageHeader from "../shared/components/DynamicPageHeader";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";
import CardActions from "@material-ui/core/CardActions";

const styles = theme => ({
  header: {
    padding: theme.spacing(4)
  },
  alignRight: {
    marginLeft: "auto !important"
  }
});

const EducationTemplate = ({data, classes}) => {
  const {markdown} = data.file;
  let {startDate, endDate} = markdown.info;
  endDate = endDate === "Invalid date" ? "Current" : endDate;

  return (
    <App showContactForm underConstruction>
      <WaveJumbotron>
        <DynamicPageHeader
          title={markdown.info.title}
          subTitle={markdown.info.subTitle}
          text={markdown.info.short}
        />
      </WaveJumbotron>
      <Container>
        <div className={"container-fluid lg-mg-top"}>
          <Paper elevation={0}>
            <CardActions>
              <Tooltip
                title={`I started my education ${startDate} and ${endDate === "Current" ? "currently study here" : `completed it ${endDate}`}`}>
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
