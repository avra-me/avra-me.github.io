import React from "react";
import PropTypes from "prop-types";
import {Grid, isWidthUp, Typography, withWidth} from "@material-ui/core";
import calculateSpacing from "./calculateSpacing";
import IconCard from "./IconCard";
import Icon from "@material-ui/core/Icon";
import ErrorBoundary from "../ErrorBoundary";

const iconSize = 30;

function IconSection(props) {
  const { header, values, width, isDemo } = props;
  return (
    <div>
      <div className="container-fluid lg-p-top">
        <Typography variant="h3" align="center" className="lg-mg-bottom">
          {header}
        </Typography>
        <div className="container-fluid">
          <Grid container spacing={calculateSpacing(width)}>
            {values.map((element, i) => {
              let ItemIcon = <ErrorBoundary variant={"circle"}><Icon style={{fontSize: iconSize}}>{element.icon}</Icon></ErrorBoundary>;
              return <Grid
                  item
                  xs={6}
                  md={4}
                  data-aos={isDemo ? undefined : "zoom-in-up"}
                  data-aos-delay={
                    isWidthUp("md", width) ? Math.min(Math.floor(i / 3) * 200, 600) : Math.min(Math.floor(i / 2) * 100, 600)
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
  width: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  isDemo: PropTypes.bool
};

export default withWidth()(IconSection);
