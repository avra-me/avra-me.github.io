import React from "react";
import PropTypes from "prop-types";
import {Grid, isWidthUp, Typography, withWidth} from "@material-ui/core";
import calculateSpacing from "./calculateSpacing";
import IconCard from "./IconCard";
import Icon from "@material-ui/core/Icon";

const iconSize = 30;

// const features = [
//   {
//     color: "#00C853",
//     headline: "Software Architecture",
//     text:
//       "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
//     icon: <BuildIcon style={{ fontSize: iconSize }} />,
//     mdDelay: "0",
//     smDelay: "0",
//   },
//   {
//     color: "#6200EA",
//     headline: "Time Management",
//     text:
//       "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
//     icon: <CalendarTodayIcon  />,
//     mdDelay: "200",
//     smDelay: "200",
//   },
//   {
//     color: "#0091EA",
//     headline: "Communication",
//     text:
//       "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
//     icon:  <HeadsetMicIcon style={{ fontSize: iconSize }} />,
//     mdDelay: "400",
//     smDelay: "0",
//   },
//   {
//     color: "#DD2C00",
//     headline: "Natural Language and Machine Learning",
//     text:
//       "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
//     icon: <BarChartIcon style={{ fontSize: iconSize }} />,
//     mdDelay: "200",
//     smDelay: "0",
//   },
//   {
//     color: "#304FFE",
//     headline: "Cloud Platforms",
//     text:
//       "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
//     icon: <CloudIcon style={{ fontSize: iconSize }} />,
//     mdDelay: "0",
//     smDelay: "0",
//   },
//   {
//     color: "#C51162",
//     headline: "Software Development",
//     text:
//       "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
//     icon: <CodeIcon style={{ fontSize: iconSize }} />,
//     mdDelay: "200",
//     smDelay: "200",
//   }
// ];

function IconSection(props) {
  const { values, width } = props;
  return (
    <div>
      <div className="container-fluid lg-p-top">
        <Typography variant="h3" align="center" className="lg-mg-bottom">
          My Skills
        </Typography>
        <div className="container-fluid">
          <Grid container spacing={calculateSpacing(width)}>
            {values.map((element, i) => (
              <Grid
                item
                xs={6}
                md={4}
                data-aos="zoom-in-up"
                data-aos-delay={
                  isWidthUp("md", width) ? Math.floor(i/3)*400 :  Math.floor(i/2)*200
                }
                key={element.headline}
              >
                <IconCard
                  Icon={<Icon style={{ fontSize: iconSize }}>{element.icon}</Icon>}
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

IconSection.propTypes = {
  width: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withWidth()(IconSection);
