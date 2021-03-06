import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import CardHeader from "@material-ui/core/CardHeader";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import WaveCard from "../common/WaveCard";
import AppearOnScroll from "../../shared/components/AppearOnScroll";

const styles = theme => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1)
  },
  content: {
    flexGrow: 1
  }
});

const EducationCard = ({classes, flip, data, delay}) => {
  const {title, subTitle, short, slug} = data;

  return <Grid item xs={12} sm={6}>
    <AppearOnScroll delay={delay}>
      <WaveCard
        inverse={flip}
        className={classes.root}
      >
        <CardHeader title={title} subheader={subTitle} titleTypographyProps={{color: "textPrimary"}}/>
        <CardContent className={classes.content}>
          <Typography color="textSecondary" component="p">
            {short}
          </Typography>
        </CardContent>
        <CardActions>
          <Button href={`/education/${slug}`}>Read More</Button>
        </CardActions>
      </WaveCard>
    </AppearOnScroll>
  </Grid>;
};

EducationCard.defaultProps = {
  delay: 0
};

EducationCard.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string,
    subTitle: PropTypes.string,
    short: PropTypes.string,
    slug: PropTypes.string,
  }).isRequired,
  flip: PropTypes.bool.isRequired,
  delay: PropTypes.number
};

export default withStyles(styles)(EducationCard);
