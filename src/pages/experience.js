import React from "react";
import App from "../App";
import PropTypes from "prop-types";
import ListExperienceView from "../components/home/ListExperienceView";
import Container from "@material-ui/core/Container";
import WaveJumbotronHeader from "../components/common/WaveJumbotron";
import {graphql, useStaticQuery} from "gatsby";

const ExperienceHome = () => {
  const data = useStaticQuery(siteLogoData);
  return (
    <App showContactForm>
      <WaveJumbotronHeader
        title={"Experience"}
        subTitle={"What I've done and where I've been"}
        monogram={data.site.logo}
      />
      <Container>
        <ListExperienceView/>
      </Container>
    </App>
  );
};

ExperienceHome.propTypes = {
  data: PropTypes.object,
};

const siteLogoData = graphql`
  query getSiteLogoForExpHome {
    site: contentYaml {
      logo
    }
  }
`;

export default ExperienceHome;
