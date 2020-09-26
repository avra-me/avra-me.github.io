import React from "react";
import WaveBorder from "../shared/components/WaveBorder";
import ThemeModifier, {RootThemeProvider} from "../components/common/sourced/SourcedThemeProvider";
import {CssBaseline, withStyles} from "@material-ui/core";
import GlobalStyles from "../GlobalStyles";
import {NavigationContext} from "../shared/contexts/NavigationAppearContext";
import Monogram from "../shared/components/Monogram";
import {graphql, useStaticQuery} from "gatsby";
import PropTypes from "prop-types";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

const generateGradientString = (theme) => {
  console.log(theme.palette)
  const points = ["light", "main", "dark"].map(
    (name, i) =>
      `${theme.palette.secondary[name]} ${theme.palette.wavePoints[i]}%`
  );
  return `linear-gradient(${theme.palette.waveAngle}deg, ${points.join(
    ", "
  )} ) !important`;
};

const styles = (theme) => {
  return ({
    body: {
      background: generateGradientString(theme),
      width: "100%", height: "100vh"
    },
    waveAreaTop: {
      fill: theme.palette.background.default,
      background: "inherit",
      height: "20vh"
    },
    waveAreaBottom: {
      fill: theme.palette.background.default,
      background: "inherit",
      // position: "absolute",
      // bottom: 0,
      height: "20vh"
    },
    brandBody: {
      display: "flex",
      justifyContent: "center"
    },
    brandIcon: {
      height: "60vh",
      maxWidth: "100vw"
    }
  });
};

const Avatar = withStyles(styles)(({classes, site}) => (<div className={classes.body}>
  <WaveBorder flip className={classes.waveAreaTop}/>
  <div className={classes.brandBody}>
    <img className={classes.brandIcon} src={site.logo} alt={"icon"}/>
  </div>
  <WaveBorder className={classes.waveAreaBottom}/>
</div>));

const Index = () => {
    let {site} = useStaticQuery(getLogo);

    return <NavigationContext visible={false}>
      <RootThemeProvider>
        <CssBaseline/>
        <GlobalStyles/>
        <ThemeProvider>
          <Avatar site={site}/>
        </ThemeProvider>
      </RootThemeProvider>
    </NavigationContext>;
  }
;
Index.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
  children: PropTypes.node,
};

export default Index;

const getLogo = graphql`
query getLogo {
site: contentYaml {
logo
}

}

`;
