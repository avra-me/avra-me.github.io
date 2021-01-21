import { Grid } from "@material-ui/core";
import React from "react";
import SectionHeading from "../../components/common/SectionHeading";
import PropTypes from "prop-types";
import ContactForm from "./ContactForm";
import Container from "@material-ui/core/Container";
import AppearOnScroll from "./AppearOnScroll";

const ContactFormSection = ({ title, subTitle, ...rest }) => {
  return (
    <Container>
      <Grid container alignItems={"center"} justify={"center"}>
        <Grid
          item
          container
          xs={12}
          alignItems={"center"}
          justify={"center"}
          direction={"column"}
        >
          <Grid item xs={12} md={6} lg={4}>
            <SectionHeading title={title} subTitle={subTitle} align={"center"} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <AppearOnScroll duration={2}>
            <ContactForm {...rest} />
          </AppearOnScroll>
        </Grid>
      </Grid>
    </Container>
  );
};

ContactFormSection.defaultProps = {
  emailField: {
    title: "Your Email",
    placeholder: "your.email@example.com",
  },
  messageField: {
    title: "Your Message",
    placeholder: "Hi Avrami, I wanted to reach out to you because...",
  },
  submitButton: {
    title: "Send Message",
  },
};

ContactFormSection.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  emailField: PropTypes.shape({
    title: PropTypes.string,
    placeholder: PropTypes.string,
  }),
  messageField: PropTypes.shape({
    title: PropTypes.string,
    placeholder: PropTypes.string,
  }),
  submitButton: PropTypes.shape({
    title: PropTypes.string,
  }),
};

export default ContactFormSection;
