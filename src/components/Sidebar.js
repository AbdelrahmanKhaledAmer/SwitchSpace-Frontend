"use strict";
// React
import React from "react";
import propTypes from "prop-types";
// Material UI Core
import {makeStyles} from "@material-ui/core/styles";
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

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: "auto",
    },
    listIcon: {
        color: "#659dbd",
    },
    DrawerHeader: {
        color: "#fbeec1",
        backgroundColor: "#659dbd",
        textAlign: "center",
        borderRadius: "0 0 0.5em 0",
    },
    nested: {
        paddingLeft: "10%",
        // color: "Blue",
    },
});

export default function Sidebar({isOpen, isAuthorized, sidebarToggle, expanded, expandToggle}) {
    const classes = useStyles();

    const getCategories = function () {
        // TODO: GET <<N>> TRENDING CATEGORIES FROM BACKEND
        const categories = [
            {id: 1, title: "Category A"},
            {id: 2, title: "Category B"},
            {id: 3, title: "Category C"},
        ];
        return (
            <List>
                <ListItem button onClick={expandToggle}>
                    <ListItemIcon className={classes.listIcon}>
                        <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Categories" />
                    <ListItemIcon className={classes.listIcon}>{expanded ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
                </ListItem>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
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
    };

    const loggedOutList = (
        <div
            className={classes.list}
            role="presentation"
            // onClick={sidebarToggle} // TODO:
            onKeyDown={sidebarToggle}>
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
            {getCategories()}
            <Divider />
        </div>
    );

    const loggedInList = (
        <div
            className={classes.list}
            role="presentation"
            // onClick={sidebarToggle} //TODO: UNCOMMENT WHEN FUNCTIONALITY IS COMPLETE
            onKeyDown={sidebarToggle}>
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
            {getCategories()}
            <Divider />
        </div>
    );

    return (
        <div>
            {
                <Drawer anchor="left" open={isOpen} onClose={sidebarToggle}>
                    <div className={classes.DrawerHeader}>
                        <List>
                            <ListItem>
                                <ListItemIcon className={classes.DrawerHeader}>
                                    <SwapHorizIcon />
                                </ListItemIcon>
                                <ListItemText primary="SwitchSpace" secondary="Quick Menu" />
                            </ListItem>
                        </List>
                    </div>
                    {isAuthorized ? loggedInList : loggedOutList}
                </Drawer>
            }
        </div>
    );
}

Sidebar.propTypes = {
    isOpen: propTypes.bool.isRequired,
    isAuthorized: propTypes.bool.isRequired,
    sidebarToggle: propTypes.func.isRequired,
    expanded: propTypes.bool.isRequired,
    expandToggle: propTypes.func.isRequired,
};
