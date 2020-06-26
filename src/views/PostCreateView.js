"use strict";

import React from "react";

import PostStepper from "../components/PostCreation/PostStepper";
import CategoryService from "../services/CategoryService";

import PropTypes from "prop-types";

export default class UserLoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };

        this.populateCategories = this.populateCategories.bind(this);
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

    render() {
        return <PostStepper categories={this.state.categories}></PostStepper>;
    }
}
