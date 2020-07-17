import {TextField} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/AlternateEmail";
import Button from "@material-ui/core/Button";
import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import PropTypes from "prop-types";

const ContactForm = ({emailField, messageField, submitButton}) => {

  return <form data-netlify="true" name={"contact-form"} method="post"
               netlify-honeypot="totally-a-field" action={"/?sent_message=1"}>
    <TextField type="hidden" name="totally-a-field"/>
    <FormControl fullWidth variant={"filled"} color={"secondary"}>
      <InputLabel htmlFor="email-contact-form-field">{emailField.title}</InputLabel>
      <FilledInput
        id={"email-contact-form-field"}
        name="email"
        placeholder={emailField.placeholder}
        type={"email"}
        required
        endAdornment={
          <InputAdornment position="end">
            <EmailIcon/>
          </InputAdornment>
        }
      />
    </FormControl>
    <FormControl fullWidth variant={"filled"} color={"secondary"}>
      <InputLabel htmlFor="message-contact-form-field">{messageField.title}</InputLabel>
      <FilledInput
        id={"message-contact-form-field"}
        name="message"
        multiline
        placeholder={messageField.placeholder}
        inputProps={{"aria-label": "Have something you want to discuss? I'm always interested in taking my next career step!"}}
        rows={4}
        fullWidth
        required
      />
    </FormControl>
    <FormControl fullWidth>
      <Button
        variant="outlined"
        type="submit"
      >
        {submitButton.title}
      </Button>
    </FormControl>
  </form>;
};

ContactForm.defaultProps = {
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

ContactForm.propTypes = {
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

export default ContactForm;
