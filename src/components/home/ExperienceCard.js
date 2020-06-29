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

const styles = (theme) => ({
  root: {
    height: "100%",
    background: theme.palette.background.default,
    marginBottom: theme.spacing(10)
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
    top: 0,
    zIndex: 10
  },
  dividerBottom: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    zIndex: 10
  },
  wavyBorder: {
    height: "30%",
    minHeight: "30%",
  },
  mediaItem: {
    position: "relative",
    flexGrow: 1
  }
});

const ExperienceCard = ({classes, data, flip, delay}) => {
  const theme = useTheme();
  const {slug, title, subTitle, image, short, excerpt, link, svg} = data;
  return <Fragment key={slug}>
    <Grid>
      <Card elevation={0} className={classes.root}
            data-aos={"fade-up"}
            data-aos-once={true}
            data-aos-duration={1000}
            data-aos-delay={delay}
      >
        <Grid container spacing={4} direction={flip ? "row" : "row-reverse"}
              justify={"center"}>
          <Grid item xs={8} sm={4} md={2} className={classes.mediaGrid}>
            <Grid item style={{height: "100%"}} container alignItems={"center"}>

              <Grid item className={classes.mediaItem}>
                <Grid item className={classes.dividerTop}>
                  <WaveBorder background={theme.palette.background.default} pause flip/>
                </Grid>
                {
                  typeof image === "string" ?
                    <img src={image} className={classes.media} alt={title}/> :
                    <Img
                      fluid={image}
                      className={classes.media}
                      alt={title}
                    />
                }
                <Grid item className={classes.dividerBottom}>
                  <WaveBorder className={classes.wavyBorder} background={theme.palette.background.default} pause/>
                </Grid>
              </Grid>
            </Grid>

          </Grid>

          <Grid item xs={12} sm={6} md={8}>
            <CardContent>
              <Typography gutterBottom={false} variant={"h4"} color={"textPrimary"}>{title}</Typography>
              <Typography gutterBottom={true} variant={"h5"} color={"textSecondary"}>{subTitle}</Typography>
              <Typography variant={"h5"}>
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
      </Card>
    </Grid>
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
