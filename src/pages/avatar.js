import React from "react";
import WaveBorder from "../shared/components/WaveBorder";
import {RootThemeProvider} from "../components/common/sourced/SourcedThemeProvider";
import {CssBaseline, withStyles} from "@material-ui/core";
import GlobalStyles from "../GlobalStyles";
import {NavigationContext} from "../shared/contexts/NavigationAppearContext";
import {graphql, useStaticQuery} from "gatsby";
import PropTypes from "prop-types";

const generateGradientString = (theme) => {
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
      width: "100%", height: "100%"
    },
    waveAreaTop: {
      fill: theme.palette.background.default,
      background: "inherit",
      height: "20vh"
    },
    waveAreaBottom: {
      fill: theme.palette.background.default,
      background: "inherit",
      height: "20vh"
    },
    brandBody: {
      display: "flex",
      justifyContent: "center"
    },
    brandIcon: {
      height: "50vh",
      margin: "5vh",
      maxWidth: "100%"
    }
  });
};

const Avatar = withStyles(styles)(({classes, site}) => (<div className={classes.body}>
  <WaveBorder flip className={classes.waveAreaTop}/>
  <div className={classes.brandBody}>
    <img className={classes.brandIcon} src={site.monogram} alt={"icon"}/>
  </div>
  <WaveBorder className={classes.waveAreaBottom}/>
</div>));

const Index = () => {
    let {site} = useStaticQuery(getLogo);

    return <NavigationContext visible={false}>
      <RootThemeProvider>
        <CssBaseline/>
        <GlobalStyles/>
        <>
          <Avatar site={site}/>
        </>
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
query getMonogram {
  site: homeYaml {
    monogram
  }
}
`;
