import React, {useContext} from "react";
import {ThemeTypeContext} from "./sourced/SourcedThemeProvider";

import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import {AnimatePresence, motion} from "framer-motion";
import Tooltip from "@material-ui/core/Tooltip";
import CircleMenuButton from "../../shared/components/CircleMenuButton";

const LightMode = () => <motion.animate
  initial={{opacity: 0, duration: 1000}}
  animate={{opacity: 1}}
  exit={{opacity: 0, duration: 1000}}
  transition={{duration: 1}}
>
  <WbSunnyIcon/>
</motion.animate>;

const DarkMode = () => {
  return <motion.span
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0, duration: 1000}}
    transition={{duration: 1}}

  >
    <NightsStayIcon/>
  </motion.span>;
};


function ChangeThemeButton() {
  const {value: themeType, onToggle} = useContext(ThemeTypeContext);

  const buttonContext = (themeType === "light" ? "Enable" : "Disable") + " Dark Mode";


  return <Tooltip title={buttonContext}>
    <span>
    <CircleMenuButton aria-label={buttonContext} onClick={onToggle}>
      <AnimatePresence>
        {themeType === "light" ? <LightMode/> : <DarkMode/>}
      </AnimatePresence>
    </CircleMenuButton>
    </span>
  </Tooltip>;
}

ChangeThemeButton.order = 100;
ChangeThemeButton.key = "ChangeTheme";

ChangeThemeButton.propTypes = {};

export default (ChangeThemeButton);
