"use strict";

import React from "react";

import PostStepper from "../components/PostCreation/PostStepper";
import CategoryService from "../services/CategoryService";
import PostService from "../services/PostService";
import CircularProgress from "@material-ui/core/CircularProgress";

import PropTypes from "prop-types";

export default class UserLoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            loading: false,
        };

        this.populateCategories = this.populateCategories.bind(this);
        this.createPost = this.createPost.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
        this.renderComponent = this.renderComponent.bind(this);
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
            console.log(err);
        }
    }

    async createPost(postData) {
        try {
            await PostService.createPost(postData);
            this.props.history.push("/");
        } catch (err) {
            // TODO: TOAST ERROR
            console.log(err);
        }
    }

    renderLoading() {
        return (
            <div>
                <CircularProgress />
                <CircularProgress color="secondary" />
            </div>
        );
    }

    renderComponent() {
        return <PostStepper categories={this.state.categories} submit={this.createPost}></PostStepper>;
    }

    render() {
        return <div>{this.state.loading ? this.renderLoading() : this.renderComponent()}</div>;
    }
}
