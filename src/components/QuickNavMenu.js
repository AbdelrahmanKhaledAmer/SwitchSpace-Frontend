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
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Avatar from "@material-ui/core/Avatar";
// Material UI Icons
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
// Components
import MiniUserMenu from "./MiniUserMenu";
import ChatMenuView from "../views/ChatMenuView";
// Service
import UserAuthService from "../services/UserAuthService";
// Assets
import logoLight from "../../public/assets/logo/02_2_light.png";
import logoDark from "../../public/assets/logo/02_2_dark.png";

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
    avatar: {
        boxShadow: theme.shadows[5],
    },
    chatMenuAvatar: {
        backgroundColor: theme.palette.button.backgroundColor(),
    },
});

class QuickNavMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userMenuAnchorEl: null,
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
            sidebarToggle: PropTypes.func.isRequired,
            unreadChats: PropTypes.number.isRequired,
            history: PropTypes.object.isRequired,
            authorizationToggle: PropTypes.func,
            classes: PropTypes.object.isRequired,
            chatMenuAnchorEl: PropTypes.object,
            onChatMenuOpen: PropTypes.func.isRequired,
            onChatMenuClose: PropTypes.func.isRequired,
            onChatSelect: PropTypes.func.isRequired,
        };
    }

    handleProfileMenuOpen(event) {
        this.setState({userMenuAnchorEl: event.currentTarget});
    }

    // close menu item
    handleMenuClose() {
        this.setState({userMenuAnchorEl: null});
    }

    onSearchQueryChange(e) {
        const val = e.currentTarget.value;
        this.setState({searchQuery: val});
    }

    renderLoggedIn() {
        const {classes} = this.props;
        return (
            <div>
                {
                    // show chat menu button only for normal users and not admins
                    UserAuthService.isNormalUser() && (
                        <IconButton onClick={this.props.onChatMenuOpen}>
                            <Badge badgeContent={this.props.unreadChats} color="error">
                                <Avatar className={classes.avatar} classes={{colorDefault: classes.chatMenuAvatar}} variant="rounded">
                                    <MessageOutlinedIcon />
                                </Avatar>
                            </Badge>
                        </IconButton>
                    )
                }
                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}>
                    <Avatar
                        className={classes.avatar}
                        variant="rounded"
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
                                        <img src={this.state.darkMode ? logoDark : logoLight} width="150px"></img>
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
                <MiniUserMenu anchorEl={this.state.userMenuAnchorEl} handleMenuClose={this.handleMenuClose} />
                {
                    // mount chat menu only for normal users and not admins
                    UserAuthService.isNormalUser() && (
                        <ChatMenuView
                            anchorEl={this.props.chatMenuAnchorEl}
                            onChatMenuClose={this.props.onChatMenuClose}
                            onChatSelect={this.props.onChatSelect}
                        />
                    )
                }
            </div>
        );
    }
}
export default withRouter(withStyles(styles)(QuickNavMenu));
