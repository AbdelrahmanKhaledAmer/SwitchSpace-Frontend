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

export default class PostView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.match.params.id,
            post: {},
            categories: [],
            loading: true,
            userId: "",
        };

        this.getPost = this.getPost.bind(this);
        this.submitReport = this.submitReport.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.endLoading = this.endLoading.bind(this);
        this.editPost = this.editPost.bind(this);
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
            // TODO: TOAST ERROR
            console.error(err);
        }
        this.endLoading();
    }

    async getCategories() {
        try {
            let response = await CategoryService.getCategories();
            this.setState({
                categories: response.data.data,
            });
        } catch (err) {
            // TODO: TOAST ERROR
            console.error(err);
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
            // TODO: TOAST ERROR
            console.error(err);
        }
    }

    async editPost(post) {
        try {
            await PostService.editPost(post, this.state.postId);
            window.location.reload(false);
        } catch (err) {
            // TODO: TOAST ERROR
            console.error(err);
        }
    }

    render() {
        return (
            <Post
                post={this.state.post}
                userId={this.state.userId}
                loading={this.state.loading}
                submitReport={this.submitReport}
                categories={this.state.categories}
                editPost={this.editPost}
            />
        );
    }
}
