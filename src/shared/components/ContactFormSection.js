import {Grid, TextField} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/AlternateEmail";
import Button from "@material-ui/core/Button";
import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import SectionHeading from "../../components/common/SectionHeading";
import Typography from "@material-ui/core/Typography";
import FilledInput from "@material-ui/core/FilledInput";
import PropTypes from "prop-types";
import ContactForm from "./ContactForm";

const ContactFormSection = ({title, subTitle, ...rest}) => {
  return <Grid container className={"container-fluid section"} alignItems={"center"} justify={"center"}>
    <Grid item container xs={12} alignItems={"center"} justify={"center"} direction={"column"}>
      <Grid item xs={12} md={6} lg={4}>
        <SectionHeading title={title}
                        subTitle={<Typography align={"center"} variant={"body1"}>{subTitle}</Typography>}/>

      </Grid>
    </Grid>
    <Grid item xs={12} md={6} lg={4}>
      <ContactForm {...rest}/>
    </Grid>
  </Grid>;
};

ContactFormSection.defaultProps = {
  emailField: {
    title: "Your Email",
    placeholder: "your.email@example.com"
  },
  messageField: {
    title: "Your Message",
    placeholder: "Hi Avrami, I wanted to reach out to you because..."
  },
  submitButton: {
    title: "Send Message"
  }
};

ContactFormSection.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  emailField: PropTypes.shape({
    title: PropTypes.string,
    placeholder: PropTypes.string
  }),
  messageField: PropTypes.shape({
    title: PropTypes.string,
    placeholder: PropTypes.string
  }),
  submitButton: PropTypes.shape({
    title: PropTypes.string,
  })
};

export default ContactFormSection;
