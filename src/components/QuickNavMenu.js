"use strict";
// React
import React from "react";
import propTypes from "prop-types";
// Material UI Core
import {fade, makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
// Material UI Icons
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ChatIcon from "@material-ui/icons/Chat";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: "#659dbd",
        borderRadius: "0 0 0.75em 0.75em",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    button: {
        marginRight: theme.spacing(2),
        backgroundColor: "#fbeec1",
        color: "#659dbd",
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
        color: "#fbeec1",
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    root: {
        display: "flex",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: "auto",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function QuickNavMenu({title, isAuthorized, sidebarToggle, unreadMessages, authorizationToggle}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: "top", horizontal: "right"}}
            open={isMenuOpen}
            onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            {/* TODO: TESTING ONLY */}
            <MenuItem
                onClick={() => {
                    handleMenuClose();
                    authorizationToggle();
                }}>
                Logout
            </MenuItem>{" "}
        </Menu>
    );

    const renderLoggedIn = (
        <div>
            <IconButton aria-label="show 4 new mails" color="inherit">
                {unreadMessages == 0 ? (
                    <ChatIcon />
                ) : (
                    <Badge badgeContent={unreadMessages} color="secondary">
                        <ChatIcon />
                    </Badge>
                )}
            </IconButton>
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit">
                <AccountCircle />
            </IconButton>
        </div>
    );

    const renderLoggedOut = (
        <div>
            <Button
                variant="contained"
                onClick={authorizationToggle} // TODO: TESTING ONLY
                className={classes.button}>
                Register
            </Button>
            <Button
                variant="contained"
                onClick={authorizationToggle} // TODO: TESTING ONLY
                className={classes.button}>
                Login
            </Button>
        </div>
    );

    return (
        <div className={classes.grow}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={sidebarToggle}>
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {title}
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{"aria-label": "search"}}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>{isAuthorized ? renderLoggedIn : renderLoggedOut}</div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
}

QuickNavMenu.propTypes = {
    title: propTypes.string.isRequired,
    isAuthorized: propTypes.bool.isRequired,
    sidebarToggle: propTypes.func.isRequired,
    unreadMessages: propTypes.number.isRequired,
    authorizationToggle: propTypes.func,
};
