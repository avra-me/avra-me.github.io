import React from "react";
import PropTypes from "prop-types";
import {Box, Grid, Hidden, IconButton, TextField, Typography, withStyles,} from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import WaveBorder from "../../shared/components/WaveBorder";
import transitions from "@material-ui/core/styles/transitions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import {ThemeProvider} from "@material-ui/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
    footerInner: {
        backgroundColor: theme.palette.common.darkBlack,
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
});

function Footer(props) {
    const {classes, theme, config} = props;
    const {header, caption, icons, context} = config;
    return (
        <ThemeProvider theme={createMuiTheme({palette: {type: "dark"}})}>
            <footer className="lg-p-top">
                <WaveBorder
                    background={theme.palette.common.darkBlack}
                />
                <Paper className={classes.footerInner}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={6} lg={4}>
                            <form data-netlify="true" name={"contact-form"} method="post"
                                  netlify-honeypot="totally-a-field" action={"/?sent_message=1"}>
                                <input type="hidden" name="totally-a-field"/>
                                <Box display="flex" flexDirection="column">
                                    <Box mb={1}>
                                        <TextField
                                            name="message"
                                            multiline
                                            placeholder="Get in touch"
                                            inputProps={{"aria-label": "Get in Touch"}}
                                            variant="filled"
                                            rows={4}
                                            fullWidth
                                            required
                                        />
                                    </Box>
                                    <Button
                                        variant="outlined"
                                        type="submit"
                                    >
                                        Send Message
                                    </Button>
                                </Box>
                            </form>
                        </Grid>
                        <Hidden mdDown>
                            <Grid item xs={12} md={6} lg={4}>
                                <Box display="flex" justifyContent="center">
                                    <div>
                                        {context.map((info, index) => (
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
                        <Grid item xs={12} md={6} lg={4}>
                            <Typography variant="h6" paragraph color={"textPrimary"}>
                                {header}
                            </Typography>
                            <Typography color={"textSecondary"} paragraph>
                                {caption}
                            </Typography>
                            <Box display="flex">
                                {icons.map((socialIcon, index) => (
                                    <Box key={index} mr={index !== icons.length - 1 ? 1 : 0}>
                                        <IconButton
                                            aria-label={socialIcon.label}
                                            className={classes.socialIcon}
                                            href={socialIcon.link}
                                        >
                                            <Avatar className={classes.infoAvatar} src={socialIcon.icon} alt={"i"} aria-label={"icon"}/>
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
    theme: PropTypes.object.isRequired,
    config: PropTypes.shape({
        header: PropTypes.string,
        caption: PropTypes.string,
        context: PropTypes.arrayOf(
            PropTypes.shape({
                icon: PropTypes.string,
                label: PropTypes.string,
                link: PropTypes.string
            })
        ),
        icons: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            link: PropTypes.string,
            icon: PropTypes.string,
        }))
    }).isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(Footer);
