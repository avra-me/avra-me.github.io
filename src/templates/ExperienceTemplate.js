import React from "react";
import {graphql} from "gatsby";
import App from "../App";
import theme from "../config/theme.json";
import footer from "../config/footer.json";
import navigation from "../config/navigation.json";
import HeadSection from "../components/home/HeadSection";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import NavBar from "../components/navigation/NavBar";
import CardHeader from "@material-ui/core/CardHeader";
// eslint-disable-next-line react/prop-types
const ExperienceTemplate = ({data}) => {
  const {markdown} = data.file;
  return (
    <App theme={theme} footer={footer} navigation={navigation}>
      <NavBar siteBrand={theme.logo} links={navigation.links}/>
      {/*<HeadSection navigation={navigation} details={{*/}
      {/*  name: markdown.info.title,*/}
      {/*  caption: markdown.info.short || markdown.excerpt*/}
      {/*}}/>*/}
      <div className={"container-fluid lg-mg-top"}>
        <Card variant={"outlined"}>
          <CardHeader title={markdown.info.title} subheader={markdown.info.short || markdown.excerpt} avatar={markdown.info.image}/>
          <CardContent dangerouslySetInnerHTML={{__html: markdown.html}}>
          </CardContent>
        </Card>
      </div>
    </App>
  );
};

ExperienceTemplate.propTypes = {
  data: PropTypes.shape({
    file: PropTypes.shape({
      markdown: PropTypes.shape({
        id: PropTypes.string,
        excerpt: PropTypes.string,
        html: PropTypes.string,
        info: PropTypes.shape({
          title: PropTypes.string,
          image: PropTypes.string,
          subTitle: PropTypes.string,
          date: PropTypes.string,
          short: PropTypes.string,
          featured: PropTypes.string
        })
      })
    }),
    slug: PropTypes.string,
    type: PropTypes.string
  })
};

export default ExperienceTemplate;

export const pageQuery = graphql`
query ExperiencePostBySlug($slug: String!= "2020-06-24-junior-integration-developer") {
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
      }
    }
  }
}
`;
