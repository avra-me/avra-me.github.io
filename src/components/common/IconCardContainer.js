import React from "react";
import PropTypes from "prop-types";
import {Grid} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";


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

function IconCardContainer(props) {
  const {children} = props;
  const isLgUp = useMediaQuery(theme => theme.breakpoints.up("up"));
  const isMdUp = useMediaQuery(theme => theme.breakpoints.up("md"));
  const isSmUp = useMediaQuery(theme => theme.breakpoints.up("sm"));
  return (
    <Container>
      <Grid container spacing={isLgUp ? 5 : isMdUp ? 4 : isSmUp ? 3 : 2} justify={"center"} alignItems={"stretch"}>
        {children}
      </Grid>
    </Container>
  );
}

IconCardContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default withStyles(styles)(IconCardContainer);
