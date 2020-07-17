import React, {useContext} from "react";
import {ThemeTypeContext} from "./sourced/SourcedThemeProvider";

import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import {AnimatePresence, motion} from "framer-motion";
import Tooltip from "@material-ui/core/Tooltip";
import CircleMenuButton from "../../shared/components/CircleMenuButton";

const animations = {
  start: {
    x: 40,
    y: 15,
    opacity: 0,
    position: "absolute",
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    position: "unset",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100
    }
  },
  hide: {x: "-40px", y: "10px", opacity: 0, position: "absolute"}
};

const LightMode = () => <motion.animate
  initial={"start"}
  animate={"visible"}
  variants={animations}
  exit={"hide"}
  style={{lineHeight: 0}}
>
  <WbSunnyIcon/>
</motion.animate>;

const DarkMode = () => {
  return <motion.animate
    initial={"start"}
    animate={"visible"}
    variants={animations}
    exit={"hide"}
    style={{lineHeight: 0}}
  >
    <NightsStayIcon/>
  </motion.animate>;
};


function ChangeThemeButton() {
  const {value: themeType, onToggle} = useContext(ThemeTypeContext);

  const buttonContext = (themeType === "light" ? "Enable" : "Disable") + " Dark Mode";


  return <Tooltip title={buttonContext}>

    <CircleMenuButton aria-label={buttonContext} onClick={onToggle}>
      <AnimatePresence>
        {themeType === "light" ? <LightMode key={"light"}/> : <DarkMode key={"dark"}/>}
      </AnimatePresence>
    </CircleMenuButton>
  </Tooltip>;
}

ChangeThemeButton.order = 100;
ChangeThemeButton.key = "ChangeTheme";

ChangeThemeButton.propTypes = {};

export default (ChangeThemeButton);
