import Grid from "@material-ui/core/Grid";
import React from "react";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import WaveBorder from "../../shared/components/WaveBorder";
import Img from "gatsby-image";

const styles = (theme) => ({
  root: {
    height: "100%"
  },
  mediaGrid: {
    position: "relative"
  },
  media: {
    width: "100%",
    margin: "auto"
  },
  dividerTop: {
    position: "absolute",
    top: -1,
    left: -1,
    right: -1,
    zIndex: 10
  },
  dividerBottom: {
    position: "absolute",
    bottom: -10,
    left: -1,
    right: -1,
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

const WavyImage = ({src, progressiveImage, alt, classes}) => {
  return <Grid item className={classes.root} container alignItems={"center"}>

    <Grid item className={classes.mediaItem}>
      <div className={classes.dividerTop}>
        <WaveBorder className={classes.wavyBorder} pause flip/>
      </div>
      {
        progressiveImage ?
          <Img
            fluid={progressiveImage}
            className={classes.media}
            alt={alt}
          /> :
          <img src={src} className={classes.media} alt={alt}/>
      }
      <div className={classes.dividerBottom}>
        <WaveBorder className={classes.wavyBorder} pause/>
      </div>
    </Grid>
  </Grid>;
};

WavyImage.defaultProps = {
  delay: 0
};

WavyImage.propTypes = {
  classes: PropTypes.object,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string,
  progressiveImage: PropTypes.object
};

export default withStyles(styles)(WavyImage);
