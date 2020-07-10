import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Box, Grid, Typography, withStyles} from "@material-ui/core";
import WaveBorder from "../../shared/components/WaveBorder";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import SourcedNavigation from "../navigation/SourcedNavigation";
import ThemeModifier from "./sourced/SourcedThemeProvider";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {NavigationAppearContext} from "../../shared/contexts/NavigationAppearContext";
import {useInView} from "react-intersection-observer";

const generateGradientString = (theme) => {
  const points = ["light", "main", "dark"].map(
    (name, i) =>
      `${theme.palette.secondary[name]} ${theme.palette.wavePoints[i]}%`
  );
  return `linear-gradient(${theme.palette.waveAngle}deg, ${points.join(
    ", "
  )} ) !important`;
};

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
    background: "transparent",
    boxShadow: "none",
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
    background: "inherit",
    zIndex: 20,
  },
  image: {
    maxWidth: "100%",
    verticalAlign: "middle",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
  },
  container: {
    paddingTop: theme.spacing(6),
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
    height: theme.spacing(20),
    minHeight: theme.spacing(20),
    fill: theme.palette.background.default,
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
  waveArea: {
    background: generateGradientString(theme),
  },
  captionText: {
    fontSize: "32px",
  },
  brand: {
    height: "auto",
    width: "75px",
    overflow: "inherit",
  },
  title: {
    marginBottom: theme.spacing(4)
  }
});

function WaveJumbotron(props) {
  const {classes, title, subTitle, monogram} = props;
  const [ref, inView] = useInView({rootMargin: "-100px 0px"});
  const {setIsVisible} = useContext(NavigationAppearContext);
  useEffect(() => {
    setIsVisible(!inView);
  }, [inView]);

  return (
    <span className={clsx(classes.waveArea, "section")} id={"wave-box"}>
      <ThemeModifier isDarkMode>
        <SourcedNavigation
          position={"absolute"}
          useDarkPalette
          backgroundColor={"inherit"}
        />
        <div className={classNames("lg-p-top", classes.wrapper)}>
          <Grid
            item
            xs={12}
            md={12}
            style={{margin: "auto", alignItems: "center"}}
            className={"lg-p-top"}
          >
            <Box
              display="flex"
              flexDirection="column"
              style={{margin: "auto", alignItems: "center"}}
              height="100%"
            >
              <Button href={"#"}>
                {monogram && (
                  <Avatar
                    variant={"square"}
                    className={classes.brand}
                    src={monogram}
                    alt={""}
                  />
                )}
              </Button>
            </Box>
          </Grid>
          <Container className={classes.container}>
              <div className={classNames(classes.containerFix)}>
                <Grid
                  container
                  className="row"
                  alignItems={"center"}
                  justify={"center"}
                >
                  <Grid item xs={12} className={classes.title}>
                    <Typography variant="h2" component={"div"} align={"center"}>
                      <b>{title}</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Hidden smDown implementation={"css"}>
                      <Typography className={classes.captionText} align={"center"}>{subTitle}</Typography>
                    </Hidden>
                  </Grid>
                </Grid>
              </div>
          </Container>
          <WaveBorder className={classes.waveBorder}/>
        </div>
      </ThemeModifier>
      <div ref={ref} className={"lg-p-top"}/>
    </span>
  );
}

WaveJumbotron.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  monogram: PropTypes.string,
};

export default withStyles(styles, {withTheme: true})(WaveJumbotron);
