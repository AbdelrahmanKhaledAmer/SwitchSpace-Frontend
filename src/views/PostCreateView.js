"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Components
import PostStepper from "../components/Post/CreatePost/PostStepper";
// Services
import CategoryService from "../services/CategoryService";
import PostService from "../services/PostService";

import Loading from "../components/Loading";

export default class UserLoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Loading state
            loading: true, // when true => loading state
            categories: [],
        };

        this.populateCategories = this.populateCategories.bind(this);
        this.createPost = this.createPost.bind(this);
    }

    static get propTypes() {
        return {
            history: PropTypes.object,
        };
    }

    componentDidMount() {
        this.populateCategories();
        this.setState({loading: false});
    }

    async populateCategories() {
        try {
            let response = await CategoryService.getCategories();
            this.setState({categories: response.data.data});
        } catch (err) {
            // TODO: TOAST NETWORK ERROR
            console.error(err);
        }
    }

    async createPost(postData) {
        try {
            await PostService.createPost(postData);
            this.props.history.push("/");
        } catch (err) {
            // TODO: TOAST ERROR
            console.error(err);
        }
    }

    render() {
        return this.state.loading == true ? (
            <Loading loading={this.state.loading} />
        ) : (
            <PostStepper categories={this.state.categories} submit={this.createPost} />
        );
    }
}
