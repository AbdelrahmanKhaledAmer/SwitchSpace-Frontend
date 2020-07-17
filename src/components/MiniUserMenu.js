"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
// Material UI Core
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
// Material UI Icons
import SettingsIcon from "@material-ui/icons/Settings";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// Service
import UserAuthService from "../services/UserAuthService";
import AdminAuthService from "../services/AdminAuthService";

class MiniUserMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            darkMode: Boolean(window.localStorage["dark"]),
        };

        this.toggleTheme = this.toggleTheme.bind(this);
    }

    static get propTypes() {
        return {
            anchorEl: PropTypes.object,
            handleMenuClose: PropTypes.func.isRequired,
            history: PropTypes.object.isRequired,
        };
    }

    // Toggle dark mode
    toggleTheme() {
        if (window.localStorage["dark"]) {
            window.localStorage.removeItem("dark");
        } else {
            window.localStorage["dark"] = true;
        }
        this.setState({darkMode: Boolean(window.localStorage["dark"])}, window.location.reload(false));
    }

    render() {
        if (AdminAuthService.isAdminUser()) {
            return (
                <Menu
                    anchorEl={this.props.anchorEl}
                    anchorOrigin={{vertical: "top", horizontal: "right"}}
                    id="primary-account-menu"
                    keepMounted
                    transformOrigin={{vertical: "top", horizontal: "right"}}
                    open={Boolean(this.props.anchorEl)}
                    onClose={this.props.handleMenuClose}>
                    <MenuItem
                        onClick={() => {
                            this.props.history.push("/admin/reports");
                            this.props.handleMenuClose();
                        }}>
                        <Grid container item spacing={2} justify="flex-start">
                            <Grid item>
                                <AccountBoxIcon />
                            </Grid>
                            <Grid item>
                                <Typography color="inherit" variant="body1">
                                    Reports
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
                    <MenuItem
                        onClick={() => {
                            this.props.handleMenuClose();
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
        return (
            <Menu
                anchorEl={this.props.anchorEl}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                id="primary-account-menu"
                keepMounted
                transformOrigin={{vertical: "top", horizontal: "right"}}
                open={Boolean(this.props.anchorEl)}
                onClose={this.props.handleMenuClose}>
                <MenuItem elevation={5}>
                    <Grid container spacing={3} alignItems="center" justify="center" direction="column">
                        <Grid container item alignItems="center" justify="center">
                            <Avatar variant="rounded" src={`${process.env.MEDIA_SERVER_URL}profilePics/${UserAuthService.getCurrentUser().id}`} />
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
                        this.props.handleMenuClose();
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
                        this.props.handleMenuClose();
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
                <MenuItem
                    onClick={() => {
                        this.props.handleMenuClose();
                        UserAuthService.logout();
                        this.props.history.push("/");
                        window.location.reload();
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
}
export default withRouter(MiniUserMenu);
