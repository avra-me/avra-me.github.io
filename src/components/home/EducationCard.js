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
import clsx from "clsx";

const styles = (theme) => ({
  root: {
    height: "100%"
  },
  dark: {
    background: theme.palette.secondary.dark
  }
});

const EducationCard = ({classes, flip, data, delay}) => {
  const theme = useTheme();
  const {title, subTitle, short, slug} = data;

  return <Grid item xs>
    <Card className={clsx(classes.root, !flip ? classes.dark : "")} data-aos={"fade-up"}
          data-aos-once={true}
          data-aos-duration={1000}
          data-aos-delay={delay}>
      <ThemeProvider theme={createMuiTheme({palette: {type: !flip ? "dark" : "light"}})}>
        <CardMedia style={{background: theme.palette.background.paper}}>
          {flip && <WaveBorder flip background={theme.palette.secondary.dark}/>}
          {!flip && <WaveBorder background={theme.palette.secondary.dark}/>}
        </CardMedia>

        <CardHeader title={title} subheader={subTitle} titleTypographyProps={{color: "textPrimary"}}/>
        <CardContent className={classes.content}>
          <Typography variant="body2" color="textSecondary" component="p">
            {short}
          </Typography>
        </CardContent>
        <CardActions>
          <Button href={`/education/${slug}`}>Read More</Button>
        </CardActions>
      </ThemeProvider>
    </Card>
  </Grid>;
};

EducationCard.defaultProps = {
  delay: 0
};

EducationCard.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  flip: PropTypes.bool.isRequired,
  delay: PropTypes.number
};

export default withStyles(styles)(EducationCard);
