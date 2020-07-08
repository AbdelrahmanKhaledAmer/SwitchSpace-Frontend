"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Components
import Post from "../components/Post/PostDetails/Post";
// Services
import PostService from "../services/PostService";
import ReportService from "../services/ReportService";
import UserAuthService from "../services/UserAuthService";
import CategoryService from "../services/CategoryService";
import Notification from "../components/Notification";
import AdminAuthService from "../services/AdminAuthService";

export default class PostView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.match.params.id,
            post: {},
            categories: [],
            loading: true,
            notify: false, // when true notification appears
            notificationMsg: undefined, // must have value when notification appears
            notificationSeverity: undefined, // values in "success", "error", "info", "warning"
            userId: "",
        };

        this.getPost = this.getPost.bind(this);
        this.submitReport = this.submitReport.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.endLoading = this.endLoading.bind(this);
        this.editPost = this.editPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.notify = this.notify.bind(this);
        this.handleNotificationClose = this.handleNotificationClose.bind(this);
    }

    static get propTypes() {
        return {
            history: PropTypes.object,
            match: PropTypes.object.isRequired,
        };
    }

    componentDidMount() {
        this.getPost();
        this.getCategories();
        let user = UserAuthService.getCurrentUser();
        this.setState({
            userId: user.id,
        });
    }

    async getPost() {
        try {
            let response = await PostService.getPost(this.state.postId);
            this.setState({
                post: response.data.data,
            });
        } catch (err) {
            this.props.history.push(`/404`);
        }
    }

    async getCategories() {
        try {
            let response = await CategoryService.getCategories();
            this.setState({
                categories: response.data.data,
            });
        } catch (err) {
            this.notify(err, "error");
        }
        this.endLoading();
    }

    endLoading() {
        if (this.state.post._id && this.state.categories.length > 0) {
            this.setState({
                loading: false,
            });
        }
    }

    async submitReport(report) {
        try {
            let body = {
                complaint: report,
                postId: this.state.postId,
            };
            await ReportService.createReport(body);
        } catch (err) {
            this.notify(err, "error");
        }
    }

    async editPost(post) {
        try {
            await PostService.editPost(post, this.state.postId);
            window.location.reload(false);
        } catch (err) {
            this.notify(err, "error");
        }
    }

    async deletePost() {
        try {
            await PostService.deletePost(this.state.postId);
            if (AdminAuthService.isAdminUser(this.state.userId)) {
                this.props.history.push(`/admin/reports`);
            } else {
                this.props.history.push(`/profile/${this.state.userId}`);
            }
        } catch (err) {
            this.notify(err, "error");
        }
    }
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
                <Post
                    post={this.state.post}
                    userId={this.state.userId}
                    loading={this.state.loading}
                    submitReport={this.submitReport}
                    categories={this.state.categories}
                    editPost={this.editPost}
                    deletePost={this.deletePost}
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
