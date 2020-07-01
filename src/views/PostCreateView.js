"use strict";

import React from "react";

import PostStepper from "../components/Post/PostStepper";
import CategoryService from "../services/CategoryService";
import PostService from "../services/PostService";

import PropTypes from "prop-types";

export default class UserLoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        return <PostStepper categories={this.state.categories} submit={this.createPost} />;
    }
}
