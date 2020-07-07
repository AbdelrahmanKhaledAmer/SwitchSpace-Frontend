"use strict";
// React
import React from "react";
import propTypes from "prop-types";
import {withRouter} from "react-router-dom";
// Material UI Core
import {withStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
// Icons
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import AddBoxIcon from "@material-ui/icons/AddBox";
//import CategoryIcon from "@material-ui/icons/Category";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import accessories from "../../public/assets/categories/accessories.svg";
import clothing from "../../public/assets/categories/clothes.svg";
import electronics from "../../public/assets/categories/electronics.svg";
import media from "../../public/assets/categories/media.svg";
import sports from "../../public/assets/categories/sports.svg";
import vehichel from "../../public/assets/categories/vehichel.svg";
import other from "../../public/assets/categories/other.svg";
import categories from "../../public/assets/categories/categories.svg";

//Services
import UserAuthService from "../services/UserAuthService";
import CategoryService from "../services/CategoryService";

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
    headerText: {
        color: theme.palette.header.textColor(),
    },
    icons: {
        width: "20px",
    },
});

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            icons: [accessories, clothing, electronics, media, sports, vehichel, other],
            categoriesIcons: [],
        };
        this.getCategories = this.getCategories.bind(this);
        this.renderCategories = this.renderCategories.bind(this);
        this.matchcategoryIcon = this.matchcategoryIcon.bind(this);
    }
    static get propTypes() {
        return {
            isOpen: propTypes.bool.isRequired,
            sidebarToggle: propTypes.func.isRequired,
            expanded: propTypes.bool.isRequired,
            expandToggle: propTypes.func.isRequired,
            classes: propTypes.object.isRequired,
            history: propTypes.object.isRequired,
        };
    }

    async componentDidMount() {
        await this.getCategories();
        this.matchcategoryIcon();
    }
    async getCategories() {
        try {
            const categories = await CategoryService.getCategories();
            this.setState({categories: categories.data.data});
        } catch (err) {
            console.log(err);
        }
    }
    matchcategoryIcon() {
        let catIcons = this.state.categories.map((k, i) => [k, this.state.icons[i]]);
        this.setState({categoriesIcons: catIcons});
        console.log(this.state.categoriesIcons);
    }
    renderCategories() {
        //         // TODO: GET <<N>> TRENDING CATEGORIES FROM BACKEND
        const {classes} = this.props;
        return (
            <List>
                <ListItem button onClick={this.props.expandToggle}>
                    <ListItemIcon className={classes.listIcon}>
                        <img className={classes.icons} src={categories} />
                    </ListItemIcon>
                    <ListItemText primary="Categories" />
                    <ListItemIcon className={classes.listIcon}>{this.props.expanded ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
                </ListItem>
                <Collapse in={this.props.expanded} timeout="auto" unmountOnExit>
                    <List className={classes.nested}>
                        {this.state.categoriesIcons.map(categoryIcon => (
                            <ListItem
                                button
                                key={categoryIcon[0]._id}
                                onClick={() => {
                                    this.props.history.replace(`/search?wantedCategory=${categoryIcon[0].title}`);
                                    // TODO: ask
                                    window.location.reload(false);
                                }}>
                                <ListItemIcon className={classes.listIcon}>
                                    <img className={classes.icons} src={categoryIcon[1]} />
                                </ListItemIcon>
                                <ListItemText primary={categoryIcon[0].title} />
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
                    <ListItem button onClick={() => this.props.history.push("/login")}>
                        <ListItemIcon className={classes.listIcon}>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                    </ListItem>
                    <ListItem button onClick={() => this.props.history.push("/signup")}>
                        <ListItemIcon className={classes.listIcon}>
                            <SwapHorizIcon /> {/* TODO: GET BETTER ICON */}
                        </ListItemIcon>
                        <ListItemText primary="Signup" />
                    </ListItem>
                </List>
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
                    <ListItem button onClick={() => this.props.history.push(`/profile/${UserAuthService.getCurrentUser().id}`)}>
                        <ListItemIcon className={classes.listIcon}>
                            <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button onClick={() => this.props.history.push("/subscriptions")}>
                        <ListItemIcon className={classes.listIcon}>
                            <CreditCardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Upgrade" />
                    </ListItem>

                    <ListItem button onClick={() => this.props.history.push("/create")}>
                        <ListItemIcon className={classes.listIcon}>
                            <AddBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="New Post" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            UserAuthService.logout();
                            this.props.history.push("/");
                        }}>
                        <ListItemIcon className={classes.listIcon}>
                            <MeetingRoomIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
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
                                <ListItem button onClick={() => this.props.history.push("/")}>
                                    <ListItemIcon className={classes.headerText}>
                                        <SwapHorizIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography className={classes.headerText} variant="h6">
                                            SWITCH SPACE
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </div>
                        {UserAuthService.isAuthenticated() ? this.loggedInList() : this.loggedOutList()}
                        <ListItem button onClick={() => this.props.history.push("/trending")}>
                            <ListItemIcon className={classes.listIcon}>
                                <TrendingUpIcon />
                            </ListItemIcon>
                            <ListItemText primary="Trending" />
                        </ListItem>
                        <Divider />
                        {this.renderCategories()}
                        <Divider />
                    </Drawer>
                }
            </div>
        );
    }
}
export default withRouter(withStyles(styles)(Sidebar));
