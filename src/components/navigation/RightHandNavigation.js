import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {Link} from "@reach/router";
import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
    menuButtonText: {
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.h6.fontWeight,
    },
    link: {
        "&:after": {
            content: "\"\"",
            display: "block",
            height: "2px",
            background: `linear-gradient(270deg, ${theme.palette.primary.dark} 0, ${theme.palette.primary.main} 86%, ${theme.palette.primary.light} 100%)`,
            borderRadius: "1px",
            transition: "width .2s ease-in-out",
            left: 0,
            bottom: 0,
            width: 0,
            position: "absolute"
        },
        "&:hover": {
            backgroundColor: "transparent",
            "&::after": {
                width: "100%"
            }
        }
    },
    disabledLink: {
        fontWeight: "bold",
    },
    noDecoration: {
        textDecoration: "none !important",
    }
});


const RightHandNavigation = ({menuLinks, classes, onDrawerOpen, onDrawerClose}) => {
    const isLinkActive = element => ({isCurrent}) => ({
        children: (<Button
            color="default"
            size="large"
            classes={{
                text: classes.menuButtonText,
                root: classes.link +  (isCurrent ? " " + classes.disabledLink : "")
            }}
            disableRipple
        >
            {element.name}
        </Button>)
    });

    return <div>
        <Hidden mdUp>
            <IconButton
                onClick={onDrawerOpen}
                aria-label="Open Navigation"
            >
                <MenuIcon color="primary"/>
            </IconButton>
        </Hidden>
        <Hidden smDown >
            {menuLinks.map((element) => {
                if (element.link) {
                    return (
                        <Link
                            key={element.name}
                            to={element.link}
                            className={classes.noDecoration}
                            getProps={isLinkActive(element)}
                            onClick={onDrawerClose}
                        />
                    );
                }
                return (
                    <Button
                        color="default"
                        size="large"
                        onClick={element.onClick}
                        classes={{
                            text: classes.menuButtonText,
                            root: classes.link
                        }}
                        key={element.name}
                    >
                        {element.name}
                    </Button>
                );
            })}
        </Hidden>
    </div>;
};

RightHandNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
    menuLinks: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
    })).isRequired,
    onDrawerOpen: PropTypes.func.isRequired,
    onDrawerClose: PropTypes.func
};

export default withStyles(styles)(RightHandNavigation);
