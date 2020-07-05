"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
// Material UI Core
import {withStyles} from "@material-ui/core/styles";
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
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
import {Grid, FormControl, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
// Material UI Icons
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// Service
import UserAuthService from "../services/UserAuthService";

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    appBar: {
        // backgroundColor: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
        backgroundColor: theme.palette.header.backgroundColor(),
        borderRadius: "0 0 5px 5px",
    },
    button: {
        marginRight: theme.spacing(2),
        // backgroundColor: "#",
        // color: "#659dbd",
    },
    search: {
        // position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.secondary.main,
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
    headerText: {
        color: theme.palette.header.textColor(),
    },
});

class QuickNavMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            darkMode: Boolean(window.localStorage["dark"]),
            searchQuery: "",
        };
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
        this.renderLoggedIn = this.renderLoggedIn.bind(this);
        this.renderLoggedOut = this.renderLoggedOut.bind(this);
        this.renderMenu = this.renderMenu.bind(this);
        this.toggleTheme = this.toggleTheme.bind(this);
        this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
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
        this.setState({darkMode: Boolean(window.localStorage["dark"])}, window.location.reload(false));
        window.location.reload(false);
    }
    // close menu item
    handleMenuClose() {
        this.setState({anchorEl: null});
    }
    onSearchQueryChange(e) {
        const val = e.currentTarget.value;
        this.setState({searchQuery: val});
    }
    renderMenu() {
        return (
            <Menu
                anchorEl={this.state.anchorEl}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                id="primary-account-menu"
                keepMounted
                transformOrigin={{vertical: "top", horizontal: "right"}}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleMenuClose}>
                <MenuItem elevation={5}>
                    <Grid container spacing={3} alignItems="center" justify="center" direction="column">
                        <Grid container item alignItems="center" justify="center">
                            {/* TODO: get user image */}
                            <Avatar
                                variant="rounded"
                                src={`${process.env.MEDIA_SERVER_URL}profilePics/${UserAuthService.getCurrentUser().id}?versionId=null`}
                            />
                        </Grid>
                        <Grid container item spacing={2} alignItems="center" justify="center" direction="column">
                            <Grid item>
                                <Typography color="inherit" variant="h6">
                                    {UserAuthService.getCurrentUser().name}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography color="inherit" variant="body1">
                                    {UserAuthService.getCurrentUser().email}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        this.props.history.push(`/profile/${UserAuthService.getCurrentUser().id}`);
                        this.handleMenuClose();
                    }}>
                    <Grid container item spacing={2} justify="flex-start">
                        <Grid item>
                            <AccountBoxIcon />
                        </Grid>
                        <Grid item>
                            <Typography color="inherit" variant="body1">
                                Profile
                            </Typography>
                        </Grid>
                    </Grid>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        this.props.history.push(`/profile/${UserAuthService.getCurrentUser().id}?tab=settings`);
                        this.handleMenuClose();
                    }}>
                    <Grid container item spacing={2} justify="flex-start">
                        <Grid item>
                            <SettingsIcon color="inherit" />
                        </Grid>
                        <Grid item>
                            <Typography color="inherit" variant="body1">
                                Settings
                            </Typography>
                        </Grid>
                    </Grid>
                </MenuItem>
                <MenuItem>
                    <Grid container item spacing={2} justify="flex-start">
                        <FormControlLabel
                            control={<Switch checked={this.state.darkMode} onChange={this.toggleTheme} name="Dark Mode" />}
                            label="Dark Mode"
                        />
                    </Grid>
                </MenuItem>
                {/* TODO: TESTING ONLY */}
                <MenuItem
                    onClick={() => {
                        this.handleMenuClose();
                        UserAuthService.logout();
                        this.props.history.push("/");
                    }}>
                    <Grid container item spacing={2} justify="flex-start">
                        <Grid item>
                            <ExitToAppIcon color="inherit" />
                        </Grid>
                        <Grid item>
                            <Typography color="inherit" variant="body1">
                                Logout
                            </Typography>
                        </Grid>
                    </Grid>
                </MenuItem>
            </Menu>
        );
    }

    renderLoggedIn() {
        return (
            <div>
                <IconButton aria-label="show 4 new mails">
                    {this.props.unreadMessages == 0 ? (
                        <Avatar variant="rounded">
                            <MessageOutlinedIcon />
                        </Avatar>
                    ) : (
                        <Badge badgeContent={this.props.unreadMessages}>
                            <Avatar variant="rounded">
                                <MessageOutlinedIcon />
                            </Avatar>
                        </Badge>
                    )}
                </IconButton>
                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}>
                    {/* TODO get user profile image */}
                    <Avatar
                        variant="rounded"
                        alt="Remy Sharp"
                        src={`${process.env.MEDIA_SERVER_URL}profilePics/${UserAuthService.getCurrentUser().id}?versionId=null`}
                    />
                </IconButton>
            </div>
        );
    }

    renderLoggedOut() {
        const {classes} = this.props;
        return (
            <div>
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
            </div>
        );
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.grow}>
                <AppBar className={classes.appBar} variant="elevation">
                    <Toolbar>
                        <Grid container spacing={1} direction="row" justify="space-between" alignItems="stretch">
                            <Grid container item xs={2} alignItems="center" justify="flex-start">
                                <Grid item>
                                    <IconButton className={classes.headerText} edge="start" onClick={this.props.sidebarToggle}>
                                        <MenuIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Button
                                        onClick={() => {
                                            this.props.history.push("/");
                                        }}>
                                        {/* <Typography variant="h6" color="secondary"> */}
                                        <Typography className={classes.headerText} variant="h6">
                                            Switch Space
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>

                            <Grid item xs={5}>
                                <FormControl fullWidth className={classes.margin} variant="outlined">
                                    <TextField
                                        placeholder="Search"
                                        variant="outlined"
                                        className={classes.search}
                                        onChange={this.onSearchQueryChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment
                                                    position="end"
                                                    onClick={() => {
                                                        this.props.history.push(`/search?itemWanted=${this.state.searchQuery}`);
                                                        //TODO ask
                                                        window.location.reload(false);
                                                    }}>
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
