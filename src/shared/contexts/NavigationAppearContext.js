// ============================
// Root Theme Provider
// ============================
import React, {useState} from "react";
import PropTypes from "prop-types";

export const NavigationAppearContext = React.createContext({
  isVisible: undefined,
  setIsVisible: () => {
  }
});

export const NavigationContext = ({children, visible}) => {

  const [isVisible, setIsVisible] = useState(visible);

  return <NavigationAppearContext.Provider value={{isVisible, setIsVisible}}>
    {children}
  </NavigationAppearContext.Provider>;
};

NavigationContext.defaultProps = {
  visible: false
};

NavigationContext.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
};
