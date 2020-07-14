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
import ReviewService from "../services/ReviewService";
// MISC
import queryString from "query-string";

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
            userInfo: {_id: "", name: "", commRate: 0, descriptionRate: 0, conditionRate: 0, profilePicture: {}, reviews: []},
            modalOpen: false,
        };

        // Bind notification functions
        this.notify = this.notify.bind(this);
        this.handleNotificationClose = this.handleNotificationClose.bind(this);
        // Bind service functions
        this.handleTabChange = this.handleTabChange.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.reviewUser = this.reviewUser.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.deactivateAccount = this.deactivateAccount.bind(this);
    }

    static get propTypes() {
        return {
            //router props
            history: PropTypes.object.isRequired,
            location: PropTypes.object.isRequired,
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

            //check whether the user is routed to settings iff my profile and loggedin
            const searchParams = queryString.parse(this.props.location.search);
            if (searchParams.tab === "settings") {
                this.setState({selectedTab: "settings"});
            }
        }
        try {
            const postsResp = await PostService.getUserPosts(this.state.userId);
            const userInfoResp = await UserService.getUserInfo(this.state.userId);

            this.setState({
                userInfo: userInfoResp.data.data,
                posts: postsResp.data.data,
                isMyProfile: isMyProfile,
                myEmail: currentUser.email,
                tabs: tabs,
            });
        } catch (err) {
            // reroute after timeout
            const cb = () => setTimeout(() => this.props.history.push("/"), 3000);
            this.notify(err, "error", cb);
        }
        this.setState({loading: false});
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
        }
        this.setState({loading: false});
    }

    async reviewUser(review) {
        try {
            await ReviewService.reviewUser(review);
            // get updated user info
            const userInfoResp = await UserService.getUserInfo(this.state.userId);
            this.setState({
                userInfo: userInfoResp.data.data,
            });
            this.handleModalClose();
            this.notify("Review submitted successfully", "success");
        } catch (err) {
            this.notify(err, "error");
        }
    }

    async deactivateAccount() {
        try {
            await UserService.deactivateAccount();
            UserAuthService.logout();
            this.props.history.push("/");
        } catch (err) {
            this.notify(err, "error");
        }
    }

    handleTabChange(event, newValue) {
        this.setState({
            selectedTab: newValue,
        });
    }

    // Notify the user with a msg and severity => uses the state variables
    notify(msg, notificationSeverity) {
        this.setState({notify: true, notificationMsg: msg, notificationSeverity: notificationSeverity});
    }
    handleModalClose() {
        this.setState({modalOpen: false});
    }

    handleModalOpen() {
        this.setState({modalOpen: true});
    }

    // Reset notification state must be included in every view and passed to Notification Component
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
                    onUserReview={this.reviewUser}
                    onModalOpen={this.handleModalOpen}
                    onModalClose={this.handleModalClose}
                    onAccountRemove={this.deactivateAccount}
                    modalOpen={this.state.modalOpen}
                    userInfo={this.state.userInfo}
                    posts={this.state.posts}
                    onNotify={this.notify}
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
