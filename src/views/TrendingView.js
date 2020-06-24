"use strict";

import React from "react";
import Trending from "../components/Trending";
import TrendingService from "../services/TrendingService";

import PropTypes from "prop-types";

export default class TrendingView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subcategories: [],
            posts: [],
        };

        this.getPostsBySubcategory = this.getPostsBySubcategory.bind(this);
        this.populateGraph = this.populateGraph.bind(this);

        this.populateGraph();
    }

    static get propTypes() {
        return {
            history: PropTypes.object,
        };
    }

    async populateGraph() {
        try {
            let response = await TrendingService.getTrendingSubcategories();
            this.setState({subcategories: response.data.data});
        } catch (err) {
            console.log(err);
        }
    }

    async getPostsBySubcategory(subcategory) {
        try {
            let response = await TrendingService.getPostsBySubcategory(subcategory);
            this.setState({posts: response.data.data});
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return <Trending data={this.state.subcategories} posts={this.state.posts} onCategoryClick={this.getPostsBySubcategory}></Trending>;
    }
}
