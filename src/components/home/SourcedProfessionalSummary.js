import {graphql, useStaticQuery} from "gatsby";
import IconCardContainer from "../common/IconCardContainer";
import React from "react";
import IconCard from "../common/IconCard";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import LinkIcon from "@material-ui/icons/Link";
import Icon from "@material-ui/core/Icon";
import Chip from "@material-ui/core/Chip";
import {Typography} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import SectionHeading from "../common/SectionHeading";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

const styles = () => ({
  iconRoot: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
});

const SourcedProfessionalSummary = ({classes}) => {
  const {summaryValues, allTags, tagSectionConfig} = useStaticQuery(getProfessionalSummaryQuery);
  const isMdUp = useMediaQuery(theme => theme.breakpoints.up("md"));

  const cardData = summaryValues.edges.map(v => ({...v.node.markdown.info, html: v.node.markdown.html}));
  cardData.forEach(value =>
    value.links = allTags.values.reduce((links, {slug, category, markdown}) => {
      if (value.alias.filter(alias => markdown.info.tags.filter(tag => tag.toLowerCase() === alias).length > 0).length > 0) {
        links.push({
          ...markdown.info, link: `/${category}/${slug}`
        });
      }
      return links;
    }, [])
  );
  // eslint-disable-next-line react/prop-types
  const makeTags = ({link, title, subTitle}) => {
    return <Tooltip title={title}>
      <Button href={link} size={"small"} variant={"outlined"}>{subTitle}</Button>
    </Tooltip>
      ;
  };

  return <IconCardContainer>
    <Grid xs={12} item>
      <SectionHeading title={tagSectionConfig.title} subTitle={tagSectionConfig.subTitle} id={"professional-summary"}/>
    </Grid>
    {cardData.map((card, i) => {
      const delay = isMdUp ? Math.min(Math.floor(i) * 100, 300) : Math.min(Math.floor(i) * 100, 600);
      return <IconCard
        key={card.title}
        headline={card.title}
        icon={<Icon style={{fontSize: 30}}>{card.icon}</Icon>}
        color={card.color}
        animate
        animationDelay={delay}
        buttons={
          <Grid container alignItems={"flex-start"}>{card.links.map(makeTags)}</Grid>
        }
        className={classes.iconRoot}
        variant={"outlined"}
      >
        <Typography>
          <div dangerouslySetInnerHTML={{__html: card.html}}/>
        </Typography>
      </IconCard>;
    })}
  </IconCardContainer>;
};

const getProfessionalSummaryQuery = graphql`query getProfessionalSummary {
  summaryValues: allFile(filter: {sourceInstanceName: {eq: "content-v2"}, childMarkdownRemark: {frontmatter: {type: {eq: "tag"}}}}) {
    edges {
      node {
        markdown: childMarkdownRemark {
          html
          info: frontmatter {
            title
            alias
            icon
            color
          }
        }
      }
    }
  }
  allTags: allFile(filter: {sourceInstanceName: {in: ["education", "experience"]}}, sort: {fields: childMarkdownRemark___frontmatter___startDate, order: DESC}) {
    values:nodes {
       slug: name
       category: sourceInstanceName
       markdown: childMarkdownRemark {
          info:frontmatter {
            title
            subTitle
            tags
        }
      }
    }
  }
  tagSectionConfig: tagsYaml {
    title
    subTitle
  }
}`;

SourcedProfessionalSummary.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(SourcedProfessionalSummary);
