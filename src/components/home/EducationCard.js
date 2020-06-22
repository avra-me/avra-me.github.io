import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import WaveBorder from "../../shared/components/WaveBorder";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import {ThemeProvider} from "@material-ui/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import CardHeader from "@material-ui/core/CardHeader";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  root: {
    height: "100%"
  },
  dark: {
    background: theme.palette.secondary.dark
  }
});
const demo = [
  {
    id: '1234',
    where: "2016",
    what: "Associate Degree in Information Technology",
    more: "A heavily practical focused degree that left me with an appreciation for how internet infrastructure works."
  },
  {
    id: '456445',
    where: "2018",
    what: "Bachelor of Computer Science",
    more: "In 2019 I completed my bachelor of computer science with a capstone that had me build a visual web interface for a big data platform."
  }
];

const EducationCard = ({classes}) => {
  const theme = useTheme();

  return <div className="container-fluid section">
    <Typography variant="h3" align="center" className={["lg-mg-bottom", classes.text].join(" ")}>
      My Education
    </Typography>
    <Grid container spacing={4} alignItems={"stretch"} direction="row" justify={"center"}>
      {demo.map(({id, where, what, more}, i) => {
        const isEven = i % 2 === 0;
        return <Grid item key={i} xs>
          <Card className={classes.root}>
            <ThemeProvider theme={createMuiTheme({palette: {type: !isEven ? "dark" : "light"}})}>
              <CardMedia>
                {isEven && <WaveBorder flip background={theme.palette.secondary.dark}/>}
                {!isEven && <WaveBorder background={theme.palette.secondary.dark}/>}
              </CardMedia>

              <CardHeader title={what} subheader={where} titleTypographyProps={{color: "textPrimary"}}
                          className={!isEven ? classes.dark : ""}/>
              <CardContent className={[classes.content, !isEven ? classes.dark : ""].join(" ")}>
                <Typography variant="body2" color="textSecondary" component="p">
                  {more}
                </Typography>
              </CardContent>
              <CardActions className={!isEven ? classes.dark : ""}>
                <Button href={`/projects/${id}`}>Read More</Button>
              </CardActions>
            </ThemeProvider>
          </Card>
        </Grid>;
      })}
    </Grid>
  </div>;
};

EducationCard.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(EducationCard);
