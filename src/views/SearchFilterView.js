"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Components
import SearchFilter from "../components/Post/SearchAndFilter/SearchFilter";
// Services
import PostService from "../services/PostService";
import CategoryService from "../services/CategoryService";
export default class SearchFilterView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            categories: [],
        };
        this.getSearchPosts = this.getSearchPosts.bind(this);
        this.getCategories = this.getCategories.bind(this);
    }
    // need to defince prop type for every function
    static get propTypes() {
        return {
            history: PropTypes.object,
        };
    }
    async componentDidMount() {
        await this.getCategories();
    }

    async getSearchPosts(itemWanted, itemOwned, wantedCategory, wantedCondition, ownedCategory, ownedCondition, lng, lat, raduis) {
        try {
            let response = await PostService.getSearchPosts(
                itemWanted,
                itemOwned,
                wantedCategory,
                wantedCondition,
                ownedCategory,
                ownedCondition,
                lng,
                lat,
                raduis
            );
            this.setState({posts: response.data.data});
        } catch (err) {
            console.log(err);
        }
    }
    async getCategories() {
        try {
            let response = await CategoryService.getCategories();
            this.setState({categories: response.data.data});
            console.log(this.state.categories);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return <SearchFilter posts={this.state.posts} onSubmit={this.getSearchPosts} categories={this.state.categories}></SearchFilter>;
    }
}
