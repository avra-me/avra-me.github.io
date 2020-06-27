import React from "react";
import PropTypes from "prop-types";
import {Grid, Typography} from "@material-ui/core";
import IconCard from "./IconCard";
import Icon from "@material-ui/core/Icon";
import ErrorBoundary from "../ErrorBoundary";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import withStyles from "@material-ui/core/styles/withStyles";

const iconSize = 30;

const styles = (theme) => ({
  header: {
    marginBottom: `${theme.spacing(8)}px`,
    [theme.breakpoints.down("md")]: {
      marginBottom: `${theme.spacing(7)}px`,
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: `${theme.spacing(6)}px`,
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: `${theme.spacing(5)}px`,
    }
  }
});

function IconSection(props) {
  const {children} = props;
  const isLgUp = useMediaQuery(theme => theme.breakpoints.up("up"));
  const isMdUp = useMediaQuery(theme => theme.breakpoints.up("md"));
  const isSmUp = useMediaQuery(theme => theme.breakpoints.up("sm"));
  return (
    <div>
      <div className="container-fluid section">
        <Grid container spacing={isLgUp ? 5 : isMdUp ? 4 : isSmUp ? 3 : 2} justify={"center"} alignItems={"stretch"}>
          {children}
        </Grid>
      </div>
    </div>
  );
}

IconSection.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
};

export default withStyles(styles)(IconSection);
