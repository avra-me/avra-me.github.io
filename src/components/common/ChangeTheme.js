import React, {useContext} from "react";
import {ThemeTypeContext} from "./sourced/SourcedThemeProvider";
import IconButton from "@material-ui/core/IconButton";

import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import {AnimatePresence, motion} from "framer-motion";


const LightMode = () => <motion.div
  initial={{opacity: 0, duration: 1000}}
  animate={{opacity: 1}}
  exit={{opacity: 0, duration: 1000}}
  transition={{duration: 1}}
>
  <WbSunnyIcon/>
</motion.div>;

const DarkMode = () => {
  return <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0, duration: 1000}}
    transition={{duration: 1}}

  >
    <NightsStayIcon/>
  </motion.div>;
};


function ChangeThemeButton() {
  const {value: themeType, onToggle} = useContext(ThemeTypeContext);


  return <IconButton aria-label={"Toggle Dark Mode"} onClick={onToggle}>
    <AnimatePresence>
      {themeType === "light" ? <LightMode/> : <DarkMode/>}
    </AnimatePresence>
  </IconButton>;
}

ChangeThemeButton.order = 100;
ChangeThemeButton.key = "ChangeTheme";

ChangeThemeButton.propTypes = {};

export default ChangeThemeButton;
