import React from "react";
import PropTypes from "prop-types";
import {fade, withStyles} from "@material-ui/core";

const styles = {
  flip: {
    transform: "scale(1,-1)"
  },
  reverse: {
    transform: "scale(-1,1)"
  },
  waves: {
    position: "relative",
    width: "100%",
    marginBottom: -7
  },
  "@keyframes moveForever": {
    from: {transform: "translate3d(-90px, 0, 0)"},
    to: {transform: "translate3d(85px, 0, 0)"},
  },
  parallax: {
    "& > use": {
      animation: "$moveForever 4s cubic-bezier(0.62, 0.5, 0.38, 0.5) infinite",
    }
  },
};

/**
 *  https://codepen.io/csspoints/pen/WNeOEqd
 */
function WaveBorder(props) {
  const id = String(Math.random());
  const randomDelay = Math.random() * 4;
  const {
    className,
    classes,
    background,
    flip,
    pause,
    reverse,
    ...rest
  } = props;
  // eslint-disable-next-line react/prop-types
  const addWave = ({y, delay, duration, opacity = 1, x = 48, pause = false}) => <use
    href={`#${id}`}
    x={x}
    y={y}
    fill={fade(background, opacity)}
    style={{
      animationPlayState: pause ? "paused" : "running",
      animationDelay: `${delay}s`,
      animationDuration: `${duration*2}s`
    }}
  />;

  const svgClasses = [classes.waves, className];
  if (flip) {
    svgClasses.push(classes.flip);
  }
  if (reverse) {
    svgClasses.push(classes.reverse);
  }

  return (
    <div {...rest}>
      <svg className={svgClasses.join(" ")} xmlns="http://www.w3.org/2000/svg"
           viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
        <defs>
          <path id={id} d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
        </defs>
        <g className={classes.parallax}>
          {addWave({y: 0, delay: -(randomDelay + 2), duration: 9, opacity: 0.7, pause})}
          {addWave({y: 3, delay: -(randomDelay + 3), duration: 12, opacity: 0.5, pause})}
          {addWave({y: 5, delay: -(randomDelay + 4), duration: 19, opacity: 0.3, pause})}
          {addWave({y: 6, delay: -(randomDelay + 5), duration: 25, opacity: 1, x: 50, pause})}
        </g>
      </svg>

    </div>
  );
}

WaveBorder.propTypes = {
  className: PropTypes.string,
  background: PropTypes.string.isRequired,
  flip: PropTypes.bool,
  reverse: PropTypes.bool,
  pause: PropTypes.bool,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WaveBorder);
