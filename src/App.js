import React from "react";
import PropTypes from "prop-types";
import {CssBaseline} from "@material-ui/core";
import GlobalStyles from "./GlobalStyles";
import SourcedFooter from "./components/footer/SourcedFooter";
import {RootThemeProvider} from "./components/common/sourced/SourcedThemeProvider";
import SourcedNavigation from "./components/navigation/SourcedNavigation";
import {NavigationContext} from "./shared/contexts/NavigationAppearContext";
import NoSsr from "@material-ui/core/NoSsr";
import AlertManager from "./components/common/AlertManager";
import {Helmet} from "react-helmet";
import {graphql, useStaticQuery} from "gatsby";


const App = (props) => {
  const {children, showContactForm, underConstruction} = props;
  let {site} = useStaticQuery(getMetadata);


  return (
    <NavigationContext visible={false}>
      <Helmet>
        <title>{site.title}</title>
        <meta property="og:url" content={site.siteUrl}/>
        <meta property="og:type" content={"profile"}/>
        <meta property="og:title" content={site.title}/>
        <meta property="og:description" content={site.author.summary}/>
        <meta property="profile:gender" content={site.author.gender}/>
        <meta property="profile:first_name" content={site.author.first_name}/>
        <meta property="profile:last_name" content={site.author.last_name}/>
        <meta property="profile:username" content={site.siteUrl}/>
        {site.icons.map(({size, path}) => <link key={size} rel="icon" sizes={size} href={path + "?v=1"}/>)}
        <meta property="og:image" content={site.sitePreview}/>
      </Helmet>
      <RootThemeProvider>
        <CssBaseline/>
        <GlobalStyles/>
        <SourcedNavigation aosAnchor={"wave-box"}/>
        {children}
        <SourcedFooter showContactForm={showContactForm}/>
        <NoSsr>
          <AlertManager underConstruction={underConstruction}/>
        </NoSsr>

      </RootThemeProvider>
    </NavigationContext>
  );
};

App.propTypes = {
  children: PropTypes.node,
  showContactForm: PropTypes.bool,
  underConstruction: PropTypes.bool,
};

const getMetadata = graphql`
query getSiteMetadata {
  site: contentYaml {
    title
    siteUrl
    description
    sitePreview
    icons {
      size
      path 
    }
    author {
      first_name
      last_name
      gender
      summary
    }
  }
}
`;

export default App;
