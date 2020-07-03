"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
// Material UI Core
import {fade, withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
// Material UI Icons
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ChatIcon from "@material-ui/icons/Chat";
import {Grid, FormControl} from "@material-ui/core";
// Service
import UserAuthService from "../services/UserAuthService";

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    appBar: {
        // backgroundColor: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
        backgroundColor: theme.palette.type === "dark" ? theme.palette.primary.dark : theme.palette.primary.light,
        borderRadius: "0 0 5px 5px",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    button: {
        marginRight: theme.spacing(2),
        // backgroundColor: "#",
        // color: "#659dbd",
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
        // color: "#fbeec1",
    },
    search: {
        // position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.type === "dark" ? fade(theme.palette.common.white, 0.8) : fade(theme.palette.common.white, 0.6),
        marginLeft: 0,
        width: "100%",
        // [theme.breakpoints.up("sm")]: {
        //     marginLeft: theme.spacing(1),
        //     width: "auto",
        // },
    },
    searchIcon: {
        // padding: theme.spacing(0, 2),
        height: "100%",
        position: "relative",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
});

class QuickNavMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
        };
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
        this.renderLoggedIn = this.renderLoggedIn.bind(this);
        this.renderLoggedOut = this.renderLoggedOut.bind(this);
        this.renderMenu = this.renderMenu.bind(this);
        this.toggleTheme = this.toggleTheme.bind(this);
    }

    static get propTypes() {
        return {
            title: PropTypes.string.isRequired,
            isAuthorized: PropTypes.bool.isRequired,
            sidebarToggle: PropTypes.func.isRequired,
            unreadMessages: PropTypes.number.isRequired,
            history: PropTypes.object.isRequired,
            authorizationToggle: PropTypes.func,
            classes: PropTypes.object.isRequired,
        };
    }

    handleProfileMenuOpen(event) {
        this.setState({anchorEl: event.currentTarget});
    }
    // toggle dark mode
    toggleTheme() {
        if (window.localStorage["dark"]) {
            window.localStorage.removeItem("dark");
        } else {
            window.localStorage["dark"] = true;
        }
        window.location.reload(false);
    }
    handleMenuClose() {
        this.setState({anchorEl: null});
    }
    renderMenu() {
        return (
            <Menu
                anchorEl={this.state.anchorEl}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                id="primary-search-account-menu"
                keepMounted
                transformOrigin={{vertical: "top", horizontal: "right"}}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleMenuClose}>
                <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
                <MenuItem onClick={this.handleMenuClose}>Settings</MenuItem>
                <MenuItem>
                    <FormControlLabel
                        control={<Switch checked={!!window.localStorage["dark"]} onChange={this.toggleTheme} name="Dark Mode" />}
                        label="Dark Mode"
                    />
                </MenuItem>
                {/* TODO: TESTING ONLY */}
                <MenuItem
                    onClick={() => {
                        this.handleMenuClose();
                        UserAuthService.logout();
                    }}>
                    Logout
                </MenuItem>
            </Menu>
        );
    }

    renderLoggedIn() {
        return (
            <div>
                <IconButton aria-label="show 4 new mails">
                    {this.props.unreadMessages == 0 ? (
                        <ChatIcon />
                    ) : (
                        <Badge badgeContent={this.props.unreadMessages}>
                            <ChatIcon />
                        </Badge>
                    )}
                </IconButton>
                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}>
                    <AccountCircle />
                </IconButton>
            </div>
        );
    }

    renderLoggedOut() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                {/* <Grid item xs={6}> */}
                <ListItem alignItems="center">
                    <Button
                        variant="contained"
                        onClick={() => {
                            this.props.history.push("/register");
                        }}
                        className={classes.button}>
                        Register
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => {
                            this.props.history.push("/login");
                        }}
                        className={classes.button}>
                        Login
                    </Button>
                </ListItem>
            </React.Fragment>
        );
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.grow}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Grid container spacing={1} direction="row" justify="space-between" alignItems="stretch">
                            <Grid item xs={2}>
                                <IconButton edge="start" onClick={this.props.sidebarToggle}>
                                    <MenuIcon />
                                </IconButton>
                            </Grid>

                            <Grid item xs={5}>
                                <FormControl fullWidth className={classes.margin} variant="outlined">
                                    <TextField
                                        placeholder="Search"
                                        variant="outlined"
                                        className={classes.search}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={this.props.sidebarToggle}>
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid container item spacing={1} xs={2} justify="flex-end" alignItems="stretch">
                                {UserAuthService.isAuthenticated() ? this.renderLoggedIn() : this.renderLoggedOut()}
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                {this.renderMenu()}
            </div>
        );
    }
}
export default withRouter(withStyles(styles)(QuickNavMenu));
