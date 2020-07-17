import React from "react";
import PropTypes from "prop-types";
import {Box, Grid, Hidden, IconButton, TextField, Typography, withStyles,} from "@material-ui/core";
import WaveBorder from "../../shared/components/WaveBorder";
import transitions from "@material-ui/core/styles/transitions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import {ThemeProvider} from "@material-ui/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Paper from "@material-ui/core/Paper";
import useTheme from "@material-ui/core/styles/useTheme";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/AlternateEmail";
import FormControl from "@material-ui/core/FormControl";
import ContactForm from "../../shared/components/ContactForm";

const styles = (theme) => ({
  footerInner: {
    backgroundColor: theme.palette.grey["900"],
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(10),
      paddingLeft: theme.spacing(16),
      paddingRight: theme.spacing(16),
      paddingBottom: theme.spacing(10),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(10),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
      paddingBottom: theme.spacing(10),
    },
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
    color: theme.palette.common.white,
  },
  footerLinks: {
    marginTop: theme.spacing(2.5),
    marginBot: theme.spacing(1.5),
    color: theme.palette.common.white,
  },
  infoIcon: {
    color: `${theme.palette.common.white} !important`,
    backgroundColor: "#33383b",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  infoAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  socialIcon: {
    fill: theme.palette.common.white,
    backgroundColor: "#33383b",
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  link: {
    cursor: "Pointer",
    color: theme.palette.common.white,
    transition: transitions.create(["color"], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeIn,
    }),
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
  whiteBg: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
  },
  border: {
    height: "7vw",
    minHeight: "7vw",
  }
});

function Footer(props) {
  const {classes, disabled, title, subTitle, attributionIcons, socialIcons, contactForm} = props;
  if (disabled) {
    return null;
  }
  const theme = useTheme();

  const gridSizing = {xs: 12, md: 6};
  if (contactForm) {
    gridSizing.lg = 4;
  }
  return (
    <ThemeProvider theme={createMuiTheme({palette: {type: "dark"}})}>
      <footer className="lg-p-top">
        <WaveBorder
          background={theme.palette.grey["900"]}
          className={classes.border}
        />
        <Paper square className={classes.footerInner}>
          <Grid container spacing={5}>
            {contactForm && <Grid item {...gridSizing}>
              <ContactForm/>
            </Grid>}
            <Hidden smDown={!contactForm} mdDown={contactForm}>
              <Grid item {...gridSizing}>
                <Box display="flex" justifyContent="center">
                  <div>
                    {socialIcons.map((info, index) => (
                      <Box display="flex" mb={1} key={index}>
                        <Box mr={2}>
                          <IconButton
                            className={classes.infoIcon}
                            tabIndex={-1}
                            disabled={info.link === undefined}
                            href={info.link}
                          >
                            <Avatar className={classes.infoAvatar} src={info.icon} alt={"i"} aria-label={"icon"}/>
                          </IconButton>
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                        >
                          <Typography variant="subtitle1" color={"textSecondary"}>
                            {info.label}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </div>
                </Box>
              </Grid>
            </Hidden>
            <Grid item {...gridSizing}>
              <Typography variant="h6" paragraph color={"textPrimary"}>
                {title}
              </Typography>
              <Typography color={"textSecondary"} paragraph>
                {subTitle}
              </Typography>
              <Box display="flex">
                {attributionIcons.map((button, index) => (
                  <Box key={index} mr={index !== attributionIcons.length - 1 ? 1 : 0}>
                    <IconButton
                      aria-label={button.label}
                      className={classes.socialIcon}
                      href={button.link}
                    >
                      <Avatar className={classes.infoAvatar} src={button.icon} alt={"i"} aria-label={"icon"}/>
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </footer>
    </ThemeProvider>
  );
}

Footer.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  disabled: PropTypes.bool,
  contactForm: PropTypes.bool,
  socialIcons: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    link: PropTypes.string,
    icon: PropTypes.string,
  })),
  attributionIcons: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    link: PropTypes.string,
    icon: PropTypes.string,
  })),
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(Footer);
