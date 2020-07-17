"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Components
import PostStepper from "../components/Post/CreatePost/PostStepper";
import Notification from "../components/Notification";
import Loading from "../components/Loading";
// Services
import CategoryService from "../services/CategoryService";
import PostService from "../services/PostService";

export default class PostCreateView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Loading state
            loading: true, // when true => loading state
            categories: [],
            notify: false,
            notificationMsg: undefined,
            notificationSeverity: undefined,
        };

        this.populateCategories = this.populateCategories.bind(this);
        this.createPost = this.createPost.bind(this);
        this.handleNotificationClose = this.handleNotificationClose.bind(this);
        this.notify = this.notify.bind(this);
    }

    static get propTypes() {
        return {
            history: PropTypes.object,
        };
    }

    async componentDidMount() {
        await this.populateCategories();
        this.setState({loading: false});
    }

    async populateCategories() {
        try {
            let response = await CategoryService.getCategories();
            this.setState({categories: response.data.data});
        } catch (err) {
            this.notify(err, "error");
        }
    }

    async createPost(postData) {
        try {
            await PostService.createPost(postData);
            this.props.history.push("/");
        } catch (err) {
            this.notify(err, "error");
        }
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
                <PostStepper categories={this.state.categories} submit={this.createPost} />
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
