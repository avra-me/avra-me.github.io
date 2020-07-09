import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, {Fragment} from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import WaveBorder from "../../shared/components/WaveBorder";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Img from "gatsby-image"
import WavyImage from "../../shared/components/WavyImage";
import AppearOnScroll from "../../shared/components/AppearOnScroll";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
  root: {
    height: "100%",
    background: theme.palette.background.default,
    marginBottom: theme.spacing(2),
    "& :last-child": {
      marginBottom: 0
    }
  },
  dark: {
    background: theme.palette.secondary.dark
  },
  text: {
    paddingBottom: theme.spacing(3)
  },
  mediaGrid: {
    position: "relative"
  },
  media: {
    width: "100%",
    margin: "auto"
  },
  dividerTop: {
    width: "100%",
    position: "absolute",
    top: -1,
    zIndex: 10
  },
  dividerBottom: {
    width: "100%",
    position: "absolute",
    bottom: -1,
    zIndex: 10
  },
  wavyBorder: {
    height: "30%",
    minHeight: "30%",
    fill: theme.palette.background.default

  },
  mediaItem: {
    position: "relative",
    flexGrow: 1
  }
});

const ExperienceCard = ({classes, data, flip, delay}) => {
  const {slug, title, subTitle, image, short, excerpt, link} = data;
  return <Fragment key={slug}>

    <Paper elevation={0} className={classes.root}>
      <AppearOnScroll delay={delay} offScreenProperties={{opacity: 0, x: `${50 * (flip ? -1 : 1)}%`}}
                      onScreenProperties={{opacity: 1, x: 0}}>
        <Grid container spacing={4} direction={flip ? "row" : "row-reverse"}
              justify={"center"}>
          <Grid item xs={12} sm={4} md={2} className={classes.mediaGrid}>

            <WavyImage src={typeof image === "string" && image} progressiveImage={typeof image === "object" && image}
                       alt={title}/>
          </Grid>

          <Grid item xs={12} sm={8} md={10}>
            <CardContent>
              <Typography gutterBottom={false} variant={"h6"} color={"textPrimary"}>{title}</Typography>
              <Typography gutterBottom={true} variant={"body1"} color={"textSecondary"}>{subTitle}</Typography>
              <Typography variant={"body1"}>
                {short || excerpt}
              </Typography>
            </CardContent>
            <CardActions>
              <ButtonGroup variant="text">
                <Button href={`/experience/${slug}`}>
                  <Typography>
                    Read More
                  </Typography>
                </Button>
                {link && <Button href={link}>
                  <Typography>
                    View Demo
                  </Typography>
                </Button>}
              </ButtonGroup>
            </CardActions>
          </Grid>
        </Grid>
      </AppearOnScroll>

    </Paper>
  </Fragment>;
};

ExperienceCard.defaultProps = {
  delay: 0
};

ExperienceCard.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    svg: PropTypes.string,
    short: PropTypes.string,
    excerpt: PropTypes.string,
    link: PropTypes.string
  }),
  flip: PropTypes.bool,
  delay: PropTypes.number
};

export default withStyles(styles)(ExperienceCard);
