"use strict";
// React
import React from "react";
import propTypes from "prop-types";
// Material UI Core
import {fade, withStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
// Material UI Icons
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CategoryIcon from "@material-ui/icons/Category";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
//Services
import UserAuthService from "../services/UserAuthService";

const styles = theme => ({
    list: {
        width: 250,
    },
    fullList: {
        width: "auto",
    },
    listIcon: {
        // color: "#659dbd",
    },
    DrawerHeader: {
        // color: "#fbeec1",
        backgroundColor: theme.palette.type === "dark" ? theme.palette.primary.dark : theme.palette.primary.light,
        textAlign: "center",
        borderRadius: "0 0 5px 0",
    },
    nested: {
        paddingLeft: "10%",
        // color: "Blue",
    },
});

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
    }
    static get propTypes() {
        return {
            isOpen: propTypes.bool.isRequired,
            isAuthorized: propTypes.bool.isRequired,
            sidebarToggle: propTypes.func.isRequired,
            expanded: propTypes.bool.isRequired,
            expandToggle: propTypes.func.isRequired,
            classes: propTypes.object.isRequired,
        };
    }
    getCategories() {
        //         // TODO: GET <<N>> TRENDING CATEGORIES FROM BACKEND
        const {classes} = this.props;
        const categories = [
            {id: 1, title: "Category A"},
            {id: 2, title: "Category B"},
            {id: 3, title: "Category C"},
        ];
        return (
            <List>
                <ListItem button onClick={this.props.expandToggle}>
                    <ListItemIcon className={classes.listIcon}>
                        <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Categories" />
                    <ListItemIcon className={classes.listIcon}>{this.props.expanded ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
                </ListItem>
                <Collapse in={this.props.expanded} timeout="auto" unmountOnExit>
                    <List className={classes.nested}>
                        {categories.map(category => (
                            <ListItem button key={category.id}>
                                <ListItemIcon className={classes.listIcon}>
                                    <CategoryIcon /> {/* TODO: CHANGE ICON */}
                                </ListItemIcon>
                                <ListItemText primary={category.title} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </List>
        );
    }

    loggedOutList() {
        const {classes} = this.props;
        return (
            <div
                className={classes.list}
                role="presentation"
                // onClick={sidebarToggle} // TODO:
                onKeyDown={this.props.sidebarToggle}>
                <List>
                    <ListItem button>
                        <ListItemIcon className={classes.listIcon}>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon className={classes.listIcon}>
                            <SwapHorizIcon /> {/* TODO: GET BETTER ICON */}
                        </ListItemIcon>
                        <ListItemText primary="Register" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon className={classes.listIcon}>
                            <TrendingUpIcon />
                        </ListItemIcon>
                        <ListItemText primary="Trending" />
                    </ListItem>
                </List>
                <Divider />
                {this.getCategories()}
                <Divider />
            </div>
        );
    }
    loggedInList() {
        const {classes} = this.props;

        return (
            <div
                className={classes.list}
                role="presentation"
                // onClick={sidebarToggle} //TODO: UNCOMMENT WHEN FUNCTIONALITY IS COMPLETE
                onKeyDown={this.props.sidebarToggle}>
                <List>
                    <ListItem button>
                        <ListItemIcon className={classes.listIcon}>
                            <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon className={classes.listIcon}>
                            <CreditCardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Upgrade" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon className={classes.listIcon}>
                            <TrendingUpIcon />
                        </ListItemIcon>
                        <ListItemText primary="Trending" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon className={classes.listIcon}>
                            <AddBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="New Post" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon className={classes.listIcon}>
                            <MeetingRoomIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
                <Divider />
                {this.getCategories()}
                <Divider />
            </div>
        );
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                {
                    <Drawer anchor="left" open={this.props.isOpen} onClose={this.props.sidebarToggle}>
                        <div className={classes.DrawerHeader}>
                            <List>
                                <ListItem>
                                    <ListItemIcon className={classes.DrawerHeader}>
                                        <SwapHorizIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="SwitchSpace" />
                                </ListItem>
                            </List>
                        </div>
                        {UserAuthService.isAuthenticated() ? this.loggedInList() : this.loggedOutList()}
                    </Drawer>
                }
            </div>
        );
    }
}

export default withStyles(styles)(Sidebar);

// export default function Sidebar({isOpen, sidebarToggle, expanded, expandToggle}) {
//     const classes = useStyles();

// Sidebar.propTypes = {
//     isOpen: propTypes.bool.isRequired,
//     isAuthorized: propTypes.bool.isRequired,
//     sidebarToggle: propTypes.func.isRequired,
//     expanded: propTypes.bool.isRequired,
//     expandToggle: propTypes.func.isRequired,
// };
