import React from "react";
import PropTypes from "prop-types";
import {Box, Grid, Typography, withStyles} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import WaveJumbotron from "./WaveJumbotron";

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
  brand: {
    height: "auto",
    width: "75px",
    overflow: "inherit",
  },
  title: {
    marginBottom: theme.spacing(4)
  },
  waveArea: {
    background: generateGradientString(theme),
  }
});

function WaveJumbotronHeader(props) {
  const {classes, title, subTitle, monogram} = props;

  return <span className={clsx(classes.waveArea, "section")} id={"wave-box"}>
     <WaveJumbotron>
        <Grid
          item
          xs={12}
          style={{margin: "auto", alignItems: "center"}}
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
        <Grid
          item
          xs={12}
          container
          className="row"
          alignItems={"center"}
          justify={"center"}
          classes={{root: "lg-p-top"}}
        >
          <Grid item xs={12} className={classes.title}>
            <Typography variant="h2" component={"div"} align={"center"}>
              <b>{title}</b>
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Hidden smDown implementation={"css"}>
              <Typography variant={"h4"}  align={"center"}>{subTitle}</Typography>
            </Hidden>
          </Grid>
        </Grid>
       </WaveJumbotron>
    </span>;
}

WaveJumbotronHeader.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  monogram: PropTypes.string,
};

export default withStyles(styles, {withTheme: true})(WaveJumbotronHeader);
