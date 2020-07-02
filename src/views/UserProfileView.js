"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Components
import Loading from "../components/Loading";
import Notification from "../components/Notification";
import UserProfile from "../components/UserProfile/UserProfile";
// Services
import PostService from "../services/PostService";
import UserService from "../services/UserService";
import UserAuthService from "../services/UserAuthService";

export default class UserProfileView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // Loading state
            loading: true, // when true => loading state
            // Notification State => can be passed as Props to children components
            // send notify as a function prop with it if you want in-component notification
            notify: false, // when true notification appears
            notificationMsg: undefined, // must have value when notification appears
            notificationSeverity: undefined, // values in "success", "error", "info", "warning"
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
            posts: [],
            isMyProfile: false,
            myEmail: "",
            userInfo: {name: "", commRate: 0, descriptionRate: 0, conditionRate: 0, profilePicture: {}, reviews: []},
        };
        // Bind notification functions
        this.notify = this.notify.bind(this);
        this.handleNotificationClose = this.handleNotificationClose.bind(this);
        // Bind service functions
        this.handleTabChange = this.handleTabChange.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
    }

    static get propTypes() {
        return {
            match: PropTypes.object.isRequired,
        };
    }

    async componentDidMount() {
        // get current user
        const currentUser = UserAuthService.getCurrentUser();
        const tabs = this.state.tabs;
        let isMyProfile = false;
        // my profile, not admin
        if (!currentUser.isAdmin && currentUser.id == this.state.userId) {
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
                loading: false,
                userInfo: userInfoResp.data.data,
                posts: postsResp.data.data,
                isMyProfile: isMyProfile,
                myEmail: currentUser.email,
                tabs: tabs,
            });
        } catch (err) {
            this.notify(err, "error");
            console.log(err);
        }
    }

    async updateProfile(user) {
        // TODO: reload and try get another token with the new username
        this.setState({loading: true});
        const data = new FormData();
        for (let key in user) {
            data.append(key, user[key]);
        }
        try {
            await UserService.updateProfile(data);
            this.notify("Your information was updated successfully", "success");
        } catch (err) {
            this.notify(err, "error");
            console.log(err);
        }
        this.setState({loading: false});
    }

    handleTabChange(event, newValue) {
        this.setState({
            selectedTab: newValue,
        });
    }

    // Notify the user on with a msg and severity => uses the state variables
    notify(msg, notificationSeverity) {
        this.setState({notify: true, notificationMsg: msg, notificationSeverity: notificationSeverity});
    }

    // Reset notification state must bbe included in every view and passed to Notification Component
    handleNotificationClose() {
        this.setState({notify: false, notificationMsg: undefined});
    }

    render() {
        return (
            <React.Fragment>
                <Loading loading={this.state.loading} />
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
                <Notification
                    notify={this.state.notify}
                    notificationMsg={this.state.notificationMsg}
                    severity={this.state.notificationSeverity}
                    handleClose={this.handleNotificationClose}
                />
            </React.Fragment>
        );
    }
}
