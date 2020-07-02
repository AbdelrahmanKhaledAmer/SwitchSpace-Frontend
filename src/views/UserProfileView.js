"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Components
import Loading from "../components/Loading";
import UserProfile from "../components/UserProfile/UserProfile";
// Services
import PostService from "../services/PostService";
import UserService from "../services/UserService";
import UserAuthService from "../services/UserAuthService";

export default class UserProfileView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
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
            // TODO: add feedback for the error
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

            //TODO: notify and update tab
        } catch (err) {
            //TODO: handle notification
            console.log(err);
        }
        this.setState({loading: false});
    }

    handleTabChange(event, newValue) {
        this.setState({
            selectedTab: newValue,
        });
    }

    render() {
        return (
            <div>
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
            </div>
        );
    }
}
