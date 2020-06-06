import React, {memo, useCallback, useState} from "react";
import PropTypes from "prop-types";
import {Link} from "@reach/router";
import {AppBar, Box, Button, Hidden, IconButton, Toolbar, withStyles,} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import BookIcon from "@material-ui/icons/Book";
import NavigationDrawer from "../../shared/components/NavigationDrawer";
import {ThemeProvider} from "@material-ui/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import NoSsr from "@material-ui/core/NoSsr";

const styles = (theme) => ({
    appBar: {
        boxShadow: "none",
        backgroundColor: "transparent",
    },
    appBarBack: {
        boxShadow: "none",
        backgroundColor: theme.palette.secondary.main
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    menuButtonText: {
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.h6.fontWeight,
    },
    brandText: {
        fontFamily: "'Baloo Bhaijaan', cursive",
        fontWeight: 400,
    },
    brandIcon: {
        height: theme.typography.h4.fontSize,
        filter: "invert(100%) sepia(100%) saturate(2%) hue-rotate(209deg) brightness(101%) contrast(101%)"
    },
    noDecoration: {
        textDecoration: "none !important",
    },
});

function NavBar(props) {
    const {
        classes,
        siteBrand, 
        isDemo
    } = props;

    const [selectedTab,] = useState(null);
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
    const handleMobileDrawerOpen = useCallback(() => {
        setIsMobileDrawerOpen(true);
    }, [setIsMobileDrawerOpen]);

    const handleMobileDrawerClose = useCallback(() => {
        setIsMobileDrawerOpen(false);
    }, [setIsMobileDrawerOpen]);

    // TODO: Link this to CRM
    const menuItems = [
        {
            link: "/",
            name: "Home",
            icon: <HomeIcon className="text-white"/>,
        },
        {
            link: "/blog",
            name: "My Blog",
            icon: <BookIcon className="text-white"/>,
        },
    ];

    const Brand = () => {
        return <Button color="default" href={"/"}>
            <img className={classes.brandIcon} src={siteBrand} alt={"icon"}/>
        </Button>;

    };

    const MenuButtons = () => {
        return <div>
            <Hidden mdUp>
                <IconButton
                    className={classes.menuButton}
                    onClick={handleMobileDrawerOpen}
                    aria-label="Open Navigation"
                >
                    <MenuIcon color="primary"/>
                </IconButton>
            </Hidden>
            <Hidden smDown>
                {menuItems.map((element) => {
                    if (element.link) {
                        return (
                            <Link
                                key={element.name}
                                to={element.link}
                                className={classes.noDecoration}
                                onClick={handleMobileDrawerClose}
                            >
                                <Button
                                    color="default"
                                    size="large"
                                    classes={{text: classes.menuButtonText}}
                                >
                                    {element.name}
                                </Button>
                            </Link>
                        );
                    }
                    return (
                        <Button
                            color="default"
                            size="large"
                            onClick={element.onClick}
                            classes={{text: classes.menuButtonText}}
                            key={element.name}
                        >
                            {element.name}
                        </Button>
                    );
                })}
            </Hidden>
        </div>;

    };
    
    if(isDemo){
        return  <AppBar position="absolute" className={classes.appBarBack}
        >
            <ThemeProvider theme={createMuiTheme({palette: {type: "dark"}})}>
                <Toolbar className={classes.toolbar}>
                    <Box height={1}>
                        <Brand/>
                    </Box>
                    <MenuButtons/>
                </Toolbar>
            </ThemeProvider>
        </AppBar>;
    }

    return (
        <div className={classes.root}>
            <NoSsr>
                <AppBar position="fixed" className={classes.appBarBack}
                        data-aos-anchor="#wave-box"
                        data-aos-once="false"
                        data-aos-duration={100}
                        data-aos-anchor-placement="top-top"
                        data-aos="fade-down"
                >
                    <ThemeProvider theme={createMuiTheme({palette: {type: "dark"}})}>
                        <Toolbar className={classes.toolbar}>
                            <Box height={1}>
                                <Brand/>
                            </Box>
                            <MenuButtons/>
                        </Toolbar>
                    </ThemeProvider>
                </AppBar>
            </NoSsr>
            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Box height={1}/>
                    <ThemeProvider theme={createMuiTheme({palette: {type: "dark"}})}>
                        <MenuButtons/>
                    </ThemeProvider>
                </Toolbar>
            </AppBar>
            <NavigationDrawer
                menuItems={menuItems}
                anchor="right"
                open={isMobileDrawerOpen}
                selectedItem={selectedTab}
                onClose={handleMobileDrawerClose}
            />
        </div>
    );
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    siteBrand: PropTypes.string,
    isDemo: PropTypes.bool
};

export default withStyles(styles, {withTheme: true})(memo(NavBar));
