"use strict";

import React from "react";
import PropTypes from "prop-types";

import Post from "../components/Post/Post";
import PostService from "../services/PostService";

export default class PostView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.match.params.id,
            post: {},
            loading: true,
        };

        this.getPost = this.getPost.bind(this);
    }

    static get propTypes() {
        return {
            history: PropTypes.object,
            match: PropTypes.object.isRequired,
        };
    }

    componentDidMount() {
        this.getPost();
    }

    async getPost() {
        try {
            let response = await PostService.getPost(this.state.postId);
            this.setState({
                post: response.data.data,
                loading: false,
            });
        } catch (err) {
            // TODO: TOAST ERROR
            console.error(err);
        }
    }

    render() {
        return <Post post={this.state.post} loading={this.state.loading} />;
    }
}
