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
import Badge from "@material-ui/core/Badge";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Avatar from "@material-ui/core/Avatar";
// Material UI Icons
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
// Components
import MiniUserMenu from "./MiniUserMenu";
// Service
import UserAuthService from "../services/UserAuthService";

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: theme.palette.header.backgroundColor(),
        borderRadius: "0 0 5px 5px",
    },
    button: {
        marginRight: theme.spacing(2),
        backgroundColor: theme.palette.button.backgroundColor(),
        color: theme.palette.button.textColor(),
        "&:hover": {
            backgroundColor: theme.palette.button.hover.backgroundColor(),
        },
    },
    search: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.secondary.main,
        marginLeft: 0,
        width: "100%",
    },
    searchIcon: {
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
        this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
    }

    static get propTypes() {
        return {
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

    // close menu item
    handleMenuClose() {
        this.setState({anchorEl: null});
    }

    onSearchQueryChange(e) {
        const val = e.currentTarget.value;
        this.setState({searchQuery: val});
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
                    <Avatar
                        variant="rounded"
                        alt="Remy Sharp"
                        src={`${process.env.MEDIA_SERVER_URL}profilePics/${UserAuthService.getCurrentUser().id}`}
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
                            this.props.history.push("/signup");
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
                <MiniUserMenu anchorEl={this.state.anchorEl} handleMenuClose={this.handleMenuClose} />
            </div>
        );
    }
}
export default withRouter(withStyles(styles)(QuickNavMenu));
