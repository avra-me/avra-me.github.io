import React from "react";
import App from "../App";
import SourcedHomeJumbotron from "../components/home/SourcedHomeJumbotron";
import SourcedProfessionalSummary from "../components/home/SourcedProfessionalSummary";
import ListExperienceView from "../components/home/ListExperienceView";
import ListEducationView from "../components/home/ListEducationView";
import ContactFormSection from "../shared/components/ContactFormSection";

const Index = () => (
    <App>
      <SourcedHomeJumbotron/>
      <SourcedProfessionalSummary/>
      <ListExperienceView featuredOnly/>
      <ListEducationView/>
      <ContactFormSection title="Contact Me"
                          subTitle="Have something you want to discuss? I'm always interested in learning about opportunities!"/>
    </App>
  )
;

export default Index;
