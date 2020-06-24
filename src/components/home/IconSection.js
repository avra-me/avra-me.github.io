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
  const {header, values, isDemo, classes} = props;
  const isLgUp = useMediaQuery(theme => theme.breakpoints.up("up"));
  const isMdUp = useMediaQuery(theme => theme.breakpoints.up("md"));
  const isSmUp = useMediaQuery(theme => theme.breakpoints.up("sm"));
  return (
    <div>
      <div className="container-fluid section">
        <Typography variant="h3" align="center" className={classes.header}>
          {header}
        </Typography>
        <div className="container-fluid">
          <Grid container spacing={isLgUp ? 5 : isMdUp ? 4 : isSmUp ? 3 : 2}>
            {values.map((element, i) => {
              let ItemIcon = <ErrorBoundary variant={"circle"}><Icon style={{fontSize: iconSize}}>{element.icon}</Icon></ErrorBoundary>;
              return <Grid
                item
                xs={6}
                md={4}
                data-aos={isDemo ? undefined : "zoom-in-up"}
                data-aos-once={true}
                data-aos-duration={1000}
                data-aos-delay={
                  isMdUp ? Math.min(Math.floor(i / 3) * 200, 300) : Math.min(Math.floor(i / 2) * 200, 600)
                }
                key={element.headline}
              >
                <ErrorBoundary variant={"rect"} width={200} height={200}>
                  <IconCard
                    Icon={ItemIcon}
                    color={element.color}
                    headline={element.headline}
                    text={element.text}
                  />
                </ErrorBoundary>
              </Grid>;
            })}
          </Grid>
        </div>
      </div>

    </div>
  );
}

IconSection.propTypes = {
  header: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  isDemo: PropTypes.bool,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IconSection);
