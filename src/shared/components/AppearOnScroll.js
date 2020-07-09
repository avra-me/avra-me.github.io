import PropTypes from "prop-types";
import {useInView} from "react-intersection-observer";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";

const AppearOnScroll = (props) => {
  const {children, ref, offScreenProperties, onScreenProperties, animationDisabled, delay, duration, repeat, ...rest} = props;
  const [newRef, inView] = useInView({
    rootMargin: "-100px 0px",
    root: ref
  });

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

  return <motion.div
    ref={newRef}
    initial={false}
    animate={visible || animationDisabled ? "popIn" : "hidden"}
    variants={animations}
    transition={{duration: duration, delay: delay}}
    {...rest}
  >
    {children}
  </motion.div>;
};

AppearOnScroll.defaultProps = {
  delay: 0,
  duration: 1,
  offScreenProperties: {opacity: 0, y: "40%"},
  onScreenProperties: {opacity: 1, y: 0}
};

AppearOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
  offScreenProperties: PropTypes.object,
  onScreenProperties: PropTypes.object,
  duration: PropTypes.number,
  delay: PropTypes.number,
  animationDisabled: PropTypes.bool,
  repeat: PropTypes.bool,
  ref: PropTypes.element
};

export default AppearOnScroll;
