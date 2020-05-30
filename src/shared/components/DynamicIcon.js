import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import React from "react";

const DynamicIcon = props => {
  const {icon, ...passThrough} = props;
  return <Icon {...passThrough} >{icon}</Icon>;
};

DynamicIcon.propTypes = {
  icon: PropTypes.string
};

export default DynamicIcon;