import React from "react";
import PropTypes from "prop-types";
import SectionHeading from "../common/SectionHeading";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {Send} from "@material-ui/icons";
import ListExperienceView from "./ListExperienceView";


const ExperienceView = ({featuredOnly, headerComponent: HeaderComponent}) => {

  return <>
    <Container>
      <HeaderComponent title={"Experience"} subTitle={"What I've done and where I've been"}/>
      <ListExperienceView featuredOnly={featuredOnly}/>
      <Button
        variant="outlined"
        color="default"
        endIcon={<Send/>}
        href={"/experience"}
      >
        View All
      </Button>
    </Container>

  </>;
};
ExperienceView.defaultProps = {
  headerComponent: SectionHeading
};

ExperienceView.propTypes = {
  featuredOnly: PropTypes.bool,
  headerComponent: PropTypes.elementType
};

export default ExperienceView;
