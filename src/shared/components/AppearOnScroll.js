import PropTypes from "prop-types";
import {useInView} from "react-intersection-observer";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";

const AppearOnScroll = (props) => {
  const {children, viewportRef, offScreenProperties, onScreenProperties, animationDisabled, animationDisabledState, delay, duration, repeat, ...rest} = props;

  const viewListenerOptions = {
    rootMargin: "-10px 0px",
    triggerOnce: repeat
  };


  if (viewportRef) {
    viewListenerOptions.root = viewportRef;
  }

  const [ref, inView] = useInView(viewListenerOptions);

  const [visible, setIsVisible] = useState(inView);

  useEffect(() => {
    if (repeat) {
      setIsVisible(inView);
    } else {
      if (inView) {
        setIsVisible(true);
      }
    }
  }, [inView]);

  const animations = {
    hidden: offScreenProperties,
    popIn: onScreenProperties,
  };

  const animationState = (animationDisabled && animationDisabledState) || (visible ? "popIn" : "hidden");

  return <motion.div
    ref={ref}
    initial={false}
    animate={animationState}
    variants={animations}
    transition={{duration, delay}}
    {...rest}
  >
    {children}
  </motion.div>;
};

AppearOnScroll.defaultProps = {
  delay: 0,
  duration: .5,
  offScreenProperties: {opacity: 0, y: "30%"},
  onScreenProperties: {opacity: 1, y: 0}
};

AppearOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
  offScreenProperties: PropTypes.object,
  onScreenProperties: PropTypes.object,
  duration: PropTypes.number,
  delay: PropTypes.number,
  animationDisabled: PropTypes.bool,
  animationDisabledState: PropTypes.oneOf(["popIn", "hidden"]),
  repeat: PropTypes.bool,
  viewportRef: PropTypes.any
};

export default AppearOnScroll;
