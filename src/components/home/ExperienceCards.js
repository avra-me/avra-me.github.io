import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import WaveBorder from "../../shared/components/WaveBorder";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
  },
  dividerTop: {
    position: "absolute",
    top: 0
  },
  dividerBottom: {
    position: "absolute",
    bottom: 0
  }
});
const demo = [
  {
    id: "1234",
    image: "/assets/tech-differentiates.svg",
    title: "Consultant / Software Developer",
    subTitle: "Deloitte",
    short: "As a software developer at Deloitte I built industry solutions for our insurance and banking customers. Our tools were used in the audit process, ingesting complicated documents using cutting edge techniques to simplify workflows for our customers."
  },{
    id: "1234",
    image: "/assets/Canvas_RMIT.jpg",
    title: "Junior Integration Developer",
    subTitle: "RMIT Project Rewire",
    short: "My role at within RMIT ITS largely involve integrating a new Learning Management System with legacy RMIT databases and services."
  }, {
    id: "5678",
    image: "/assets/project nebula.png",
    title: "Solution Architect",
    subTitle: "RMIT Library (Capstone)",
    short: "As the solution architect for project nebula, i leveraged my industry experience to build a robust interface for visualising the large-scaled dataset of the RMIT library"
  }
];

const ExperienceCards = ({classes}) => {
  const theme = useTheme();
  return <div className="container-fluid section">

    <Grid container spacing={10} className={["lg-p-top"].join(" ")}>
      {/*<Grid item >*/}
      {/*  <Typography variant="h3" align={"left"} color={"textPrimary"} >*/}
      {/*    Experience*/}
      {/*  </Typography>*/}
      {/*  <Typography variant="h6" align={"left"} color={"textSecondary"} >*/}
      {/*    I have over 3 years experience developing reliable software using modern methodologies*/}
      {/*  </Typography>*/}
      {/*</Grid>*/}

      {demo.map(({id, image, title, subTitle, short}, i) => {
        const isEven = i % 2 === 0;
        return <Grid container key={i}>
          <Card key={id} elevation={0} className={classes.root}>
            <Grid container spacing={4} direction={isEven ? "row" : "row-reverse"}
                  justify={"center"}>
              <Grid item xs={6} md={8}>
                <CardHeader title={title} subheader={subTitle}/>
                <CardContent>
                  {short}
                </CardContent>
                <CardActions>
                  <Button>Read More</Button>
                </CardActions>
              </Grid>

              <Grid item xs={4} md={2} className={classes.mediaGrid} direction={"row"}>
                <Grid item className={classes.dividerTop}>
                  <WaveBorder background={theme.palette.background.default} pause flip/>
                </Grid>
                <img
                  className={classes.media}
                  src={image}
                  alt={title}
                />
                <Grid item className={classes.dividerBottom}>
                  <WaveBorder background={theme.palette.background.default} pause/>
                </Grid>

              </Grid>
            </Grid>
          </Card>
        </Grid>;
      })}
    </Grid>
  </div>;
};

ExperienceCards.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(ExperienceCards);
