import React, {useState} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {useLocation} from "@reach/router";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const styles = (theme) => ({
  root: {
    height: "100%",
    zIndex: -99
  },
  dark: {
    background: theme.palette.secondary.dark
  },
  fixScrollBug: {
    position: "absolute",
    bottom: -theme.spacing(1),
    height: theme.spacing(2),
    left: 0,
    width: "100%",
    zIndex: 10
  },
  before: {
    position: "relative"
  },
  wrapBeforeContent: {
    zIndex: 20,
    position: "inherit"
  },
  waveSection: {
    background: theme.palette.background.paper,
  },
  waveSvg: {
    "& *": {
      fill: theme.palette.secondary.dark
    }
  }
});
const AlertManager = ({underConstruction}) => {
  const location = useLocation();
  const locationUrl = new URL(location.href);

  const [showSuccess, setShowSuccess] = useState(locationUrl.searchParams.has("sent_message"));

  const onHideSentNotification = () => {
    locationUrl.searchParams.delete("sent_message");
    window.history.pushState({}, document.title, locationUrl.toString());
    setShowSuccess(false);
  };

  return <>
    <Snackbar open={underConstruction} anchorOrigin={{vertical: "bottom", horizontal: "left"}}>
      <Alert severity="warning">
        The content for this page is still being built out, feel free to provide feedback using the contact form!
      </Alert>
    </Snackbar>
    <Snackbar open={showSuccess} onClose={onHideSentNotification} autoHideDuration={5000}
              anchorOrigin={{vertical: "bottom", horizontal: "left"}}>
      <Alert severity="success" onClose={onHideSentNotification}>
        Your message has been sent!
      </Alert>
    </Snackbar>
  </>;
};

AlertManager.propTypes = {
  classes: PropTypes.object.isRequired,
  underConstruction: PropTypes.bool,
};


export default withStyles(styles)(AlertManager);
