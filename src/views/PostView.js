"use strict";

import React from "react";
import Post from "../components/Post/PostDetails";

import PropTypes from "prop-types";

export default class PostView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static get propTypes() {
        return {
            history: PropTypes.object,
        };
    }

    render() {
        return <Post onSubmit={user => this.login(user)} error={this.state.error}></Post>;
    }
}
