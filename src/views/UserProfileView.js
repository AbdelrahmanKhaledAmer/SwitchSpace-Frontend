"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import CircularProgress from "@material-ui/core/CircularProgress";
import {withStyles} from "@material-ui/core/styles";
// Components
import UserProfile from "../components/UserProfile/UserProfile";
// Services
import PostService from "../services/PostService";
import UserService from "../services/UserService";
import UserAuthService from "../services/UserAuthService";

const styles = {
    centered: {
        position: "fixed",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-50px",
    },
};

class UserProfileView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pageLoading: true,
            selectedTab: "posts",
            userId: this.props.match.params.id,
            tabs: [
                {
                    label: "Posts",
                    value: "posts",
                },
                {
                    label: "Reviews",
                    value: "reviews",
                },
            ],
            isMyProfile: false,
            myEmail: undefined,
            userInfo: {},
        };

        this.handleTabChange = this.handleTabChange.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            match: PropTypes.object.isRequired,
        };
    }

    async componentDidMount() {
        const currentUser = UserAuthService.getCurrentUser();
        const tabs = this.state.tabs;
        let isMyProfile = false;
        if (currentUser.id == this.state.userId) {
            isMyProfile = true;
            tabs.push({
                label: "Settings",
                value: "settings",
            });
        }
        try {
            const postsResp = await PostService.getUserPosts(this.state.userId);
            const userInfoResp = await UserService.getUserInfo(this.state.userId);

            this.setState({
                pageLoading: false,
                userInfo: userInfoResp.data.data,
                posts: postsResp.data.data,
                isMyProfile: isMyProfile,
                myEmail: currentUser.email,
                tabs: tabs,
            });
        } catch (err) {
            // TODO: add feedback for the error
            console.log(err);
        }
    }
    async updateProfile(user) {
        const data = new FormData();
        for (let key in user) {
            data.append(key, user[key]);
        }
        try {
            await UserService.updateProfile(data);

            //TODO: notify and update tab
            this.setState({selectedTab: "posts"});
        } catch (err) {
            //TODO: handle notification
            console.log(err);
        }
    }

    handleTabChange(event, newValue) {
        this.setState({
            selectedTab: newValue,
        });
    }

    render() {
        const {classes} = this.props;

        // TODO: use a common loader for all components
        if (this.state.pageLoading) {
            return (
                <div>
                    <CircularProgress size={100} className={classes.centered} />
                </div>
            );
        }

        return (
            <UserProfile
                tabs={this.state.tabs}
                isMyProfile={this.state.isMyProfile}
                myEmail={this.state.myEmail}
                selectedTab={this.state.selectedTab}
                onTabChange={this.handleTabChange}
                onProfileUpdate={this.updateProfile}
                userInfo={this.state.userInfo}
                posts={this.state.posts}
            />
        );
    }
}

export default withStyles(styles)(UserProfileView);
