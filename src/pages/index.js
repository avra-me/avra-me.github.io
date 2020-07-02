import React from "react";
import App from "../App";
import SourcedHomeJumbotron from "../components/home/SourcedHomeJumbotron";
import SourcedProfessionalSummary from "../components/home/SourcedProfessionalSummary";
import ListExperienceView from "../components/home/ListExperienceView";
import ListEducationView from "../components/home/ListEducationView";

const Index = () => (
  <App>
    <SourcedHomeJumbotron/>
    <SourcedProfessionalSummary/>
    <ListExperienceView featuredOnly/>
    <ListEducationView/>
  </App>
);

export default Index;
