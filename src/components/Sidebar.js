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
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccessoriesIcon from "../../public/assets/categories/accessories.svg";
import ClothingIcon from "../../public/assets/categories/clothes.svg";
import ElectronicsIcon from "../../public/assets/categories/electronics.svg";
import MediaIcon from "../../public/assets/categories/media.svg";
import SportsIcon from "../../public/assets/categories/sports.svg";
import VehiclesIcon from "../../public/assets/categories/vehicles.svg";
import OtherIcon from "../../public/assets/categories/other.svg";
import CategoriesIcon from "../../public/assets/categories/categories.svg";
import ProfileIcon from "../../public/assets/general/profile.svg";
import UpgradeIcon from "../../public/assets/general/upgrade.svg";
import CreatePostIcon from "../../public/assets/general/newPost.svg";
import LogoutIcon from "../../public/assets/general/logout.svg";
import TrendingIcon from "../../public/assets/general/trend.svg";
//Services
import UserAuthService from "../services/UserAuthService";
import CategoryService from "../services/CategoryService";
// Assets
import logoLight from "../../public/assets/logo/02_2_light.png";
import logoDark from "../../public/assets/logo/02_2_dark.png";

const styles = theme => ({
    list: {
        width: 250,
    },
    fullList: {
        width: "auto",
    },
    listIcon: {
        color: window.localStorage["dark"] ? "white" : "",
    },
    DrawerHeader: {
        backgroundColor: theme.palette.header.backgroundColor(),
        textAlign: "center",
        borderRadius: "0 0 5px 0",
    },
    nested: {
        paddingLeft: "10%",
    },
    headerText: {
        color: theme.palette.header.textColor(),
    },
    icons: {
        width: "20px",
        fill: theme.palette.header.backgroundColor(),
    },
});

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            icons: [AccessoriesIcon, ClothingIcon, ElectronicsIcon, MediaIcon, SportsIcon, VehiclesIcon, OtherIcon],
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
    }

    renderCategories() {
        const {classes} = this.props;
        return (
            <List>
                <ListItem button onClick={this.props.expandToggle}>
                    <ListItemIcon className={classes.listIcon}>
                        <img className={classes.icons} src={CategoriesIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Categories" />
                    <ListItemIcon className={classes.listIcon}>{this.props.expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</ListItemIcon>
                </ListItem>
                <Collapse in={this.props.expanded} timeout="auto" unmountOnExit>
                    <List className={classes.nested}>
                        {this.state.categoriesIcons.map(categoryIcon => (
                            <ListItem
                                button
                                key={categoryIcon[0]._id}
                                onClick={() => {
                                    this.props.history.replace(`/search?wantedCategory=${categoryIcon[0].title}`);
                                    window.location.reload(false);
                                }}>
                                <ListItemIcon className={classes.listIcon}>
                                    {/* <SvgIcon className={classes.icons} component={Acc} viewBox="0 0 600 476.6" /> */}
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
            <div className={classes.list} role="presentation" onKeyDown={this.props.sidebarToggle}>
                <List>
                    <ListItem button onClick={() => this.props.history.push("/login")}>
                        <ListItemIcon className={classes.listIcon}>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                    </ListItem>
                    <ListItem button onClick={() => this.props.history.push("/signup")}>
                        <ListItemIcon className={classes.listIcon}>
                            <SwapHorizIcon />
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
            <div className={classes.list} role="presentation" onKeyDown={this.props.sidebarToggle}>
                <List>
                    <ListItem button onClick={() => this.props.history.push(`/profile/${UserAuthService.getCurrentUser().id}`)}>
                        <ListItemIcon className={classes.listIcon}>
                            <img className={classes.icons} src={ProfileIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button onClick={() => this.props.history.push("/subscriptions")}>
                        <ListItemIcon className={classes.listIcon}>
                            <img className={classes.icons} src={UpgradeIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Upgrade" />
                    </ListItem>

                    <ListItem button onClick={() => this.props.history.push("/create")}>
                        <ListItemIcon className={classes.listIcon}>
                            <img className={classes.icons} src={CreatePostIcon} />
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
                            <img className={classes.icons} src={LogoutIcon} />
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
                                    <img src={window.localStorage["dark"] ? logoDark : logoLight} width="150px"></img>
                                </ListItem>
                            </List>
                        </div>
                        {UserAuthService.isAuthenticated() ? this.loggedInList() : this.loggedOutList()}
                        <ListItem button onClick={() => this.props.history.push("/trending")}>
                            <ListItemIcon className={classes.listIcon}>
                                <img className={classes.icons} src={TrendingIcon} />
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
