import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Box,
  Card,
  Grid,
  Hidden,
  isWidthUp,
  Typography,
  withStyles,
  withWidth,
} from "@material-ui/core";
import WaveBorder from "../../shared/components/WaveBorder";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const ReactMarkdown = require("react-markdown");

const styles = (theme) => ({
  extraLargeButtonLabel: {
    fontSize: theme.typography.body1.fontSize,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.h6.fontSize,
    },
  },
  extraLargeButton: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  card: {
    boxShadow: theme.shadows[4],
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(5.5),
      paddingBottom: theme.spacing(5.5),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("lg")]: {
      width: "auto",
    },
  },
  wrapper: {
    color: theme.palette.common.white,
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(2),
    zIndex: 20,
  },
  image: {
    maxWidth: "100%",
    verticalAlign: "middle",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
  },
  container: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(12),
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(9),
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(6),
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
    },
  },
  containerFix: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "none !important",
    },
  },
  waveBorder: {
    paddingTop: theme.spacing(4),
    zIndex: 20,
  },
  speech: {
    display: "inline-flex",
    position: "relative",
    borderRadius: theme.spacing(1),
    background: theme.palette.secondary.light,
    "&:after": {
      content: "''",
      position: "absolute",
      bottom: "0",
      left: "50%",
      width: 0,
      height: 0,
      border: `${theme.spacing(1)}px solid transparent`,
      borderTopColor: theme.palette.secondary.light,
      borderBottom: 0,
      borderLeft: 0,
      marginLeft: `-${theme.spacing(0.5)}px`,
      marginBottom: `-${theme.spacing(1)}px`,
    },
  },
  speechText: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
});

function HeadSection(props) {
  const { classes, theme, width, details } = props;
  const { name, caption, greeting, prefix } = details;
  return (
    <Fragment>
      <div className={classNames("lg-p-top", classes.wrapper)}>
        <div className={classNames("container-fluid", classes.container)}>
          <Box display="flex" justifyContent="center" className="row">
            {/*<Card*/}
            {/*  className={classes.card}*/}
            {/*  data-aos-delay="200"*/}
            {/*  data-aos="zoom-in"*/}
            {/*>*/}
            <div className={classNames(classes.containerFix, "container")}>
              <Box justifyContent="space-between" className="row">
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{ margin: "auto", alignItems: "center" }}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    style={{ margin: "auto", alignItems: "center" }}
                    height="100%"
                  >
                    {/*<Box mb={4}>*/}
                    {/*  <div className={classes.speech}>*/}
                    {/*    <Typography*/}
                    {/*      variant={isWidthUp("lg", width) ? "h6" : "body1"}*/}
                    {/*      className={classes.speechText}*/}
                    {/*    >*/}
                    {/*      {greeting}*/}
                    {/*    </Typography>*/}
                    {/*  </div>*/}
                    {/*</Box>*/}
                    <Box mb={4}>
                      <Typography variant="h2">
                        <b>
                          {prefix}
                          {name}
                        </b>
                      </Typography>
                    </Box>
                    <Box mb={2}>
                      <ReactMarkdown source={caption} />
                    </Box>
                  </Box>
                </Grid>
                {/*<Hidden smDown>*/}
                {/*  <Divider orientation="vertical" flexItem/>*/}
                {/*  <Grid item md={6}>*/}
                {/*    <img*/}
                {/*      src={headerImage}*/}
                {/*      className={classes.image}*/}
                {/*      alt="header example"*/}
                {/*    />*/}
                {/*  </Grid>*/}

                {/*</Hidden>*/}
                {/*<Grid item xs={12} md={5}>*/}
                {/*  /!*<ButtonGroup variant="contained" fullWidth>*!/*/}
                {/*  /!*  <Button color={"primary"}>Download Resume.DOCX</Button>*!/*/}
                {/*  /!*  <Button color={"secondary"}>Download Resume.PDF</Button>*!/*/}
                {/*  /!*</ButtonGroup>*!/*/}
                {/*</Grid>*/}
              </Box>
            </div>

            {/*</Card>*/}
          </Box>
        </div>
      </div>

      <WaveBorder
        upperColor={theme.palette.secondary.main}
        lowerColor="#FFFFFF"
        className={classes.waveBorder}
        animationNegativeDelay={2}
      />
    </Fragment>
  );
}

HeadSection.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.string,
  theme: PropTypes.object,
  details: PropTypes.object.isRequired,
};

export default withWidth()(
  withStyles(styles, { withTheme: true })(HeadSection)
);
