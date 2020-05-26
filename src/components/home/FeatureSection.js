import React from "react";
import PropTypes from "prop-types";
import {Grid, isWidthUp, Typography, withWidth} from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";
import BuildIcon from "@material-ui/icons/Build";
import BarChartIcon from "@material-ui/icons/BarChart";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import CloudIcon from "@material-ui/icons/Cloud";
import calculateSpacing from "./calculateSpacing";
import FeatureCard from "./FeatureCard";

const iconSize = 30;

const features = [
  {
    color: "#00C853",
    headline: "Software Architecture",
    text:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <BuildIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0",
  },
  {
    color: "#6200EA",
    headline: "Time Management",
    text:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <CalendarTodayIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200",
  },
  {
    color: "#0091EA",
    headline: "Communication",
    text:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon:  <HeadsetMicIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0",
  },
  {
    color: "#DD2C00",
    headline: "Natural Language and Machine Learning",
    text:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <BarChartIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "0",
  },
  {
    color: "#304FFE",
    headline: "Cloud Platforms",
    text:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <CloudIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0",
  },
  {
    color: "#C51162",
    headline: "Software Development",
    text:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <CodeIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200",
  }
];

function FeatureSection(props) {
  const { width } = props;
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container-fluid lg-p-top">
        <Typography variant="h3" align="center" className="lg-mg-bottom">
          My Skills
        </Typography>
        <div className="container-fluid">
          <Grid container spacing={calculateSpacing(width)}>
            {features.map((element) => (
              <Grid
                item
                xs={6}
                md={4}
                data-aos="zoom-in-up"
                data-aos-delay={
                  isWidthUp("md", width) ? element.mdDelay : element.smDelay
                }
                key={element.headline}
              >
                <FeatureCard
                  Icon={element.icon}
                  color={element.color}
                  headline={element.headline}
                  text={element.text}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

FeatureSection.propTypes = {
  width: PropTypes.string.isRequired,
};

export default withWidth()(FeatureSection);
