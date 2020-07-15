"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Components
import Trending from "../components/Trending";
import Loading from "../components/Loading";

// Services
import TrendingService from "../services/TrendingService";

export default class TrendingView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Loading state
            loading: true, // when true => loading state
            subcategories: [],
            posts: [],
        };

        this.getPostsBySubcategory = this.getPostsBySubcategory.bind(this);
        this.populateGraph = this.populateGraph.bind(this);
    }

    static get propTypes() {
        return {
            history: PropTypes.object,
        };
    }

    async componentDidMount() {
        await this.populateGraph();
        await this.getPostsBySubcategory(this.state.subcategories[0].title);
        this.setState({loading: false});
    }

    async populateGraph() {
        try {
            let response = await TrendingService.getTrendingSubcategories();
            await this.setState({subcategories: response.data.data});
        } catch (err) {
            // TODO: TOAST ERROR
            console.error(err);
        }
    }

    async getPostsBySubcategory(subcategory) {
        try {
            let response = await TrendingService.getPostsBySubcategory(subcategory);
            this.setState({posts: response.data.data});
        } catch (err) {
            // TODO: TOAST ERROR
            console.error(err);
        }
    }

    render() {
        return this.state.loading == true ? (
            <Loading loading={this.state.loading} />
        ) : (
            <Trending data={this.state.subcategories} posts={this.state.posts} onCategoryClick={this.getPostsBySubcategory}></Trending>
        );
    }
}
