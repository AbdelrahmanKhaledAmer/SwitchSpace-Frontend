"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Components
import SearchFilter from "../components/Post/SearchAndFilter/SearchFilter";
import Loading from "../components/Loading";

// Services
import PostService from "../services/PostService";
import CategoryService from "../services/CategoryService";
export default class SearchFilterView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Loading state
            loading: true, // when true => loading state
            posts: [],
            categories: [],
            subcategories: [],
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
        await this.getSubcategories();
        this.setState({loading: false});
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
        } catch (err) {
            console.log(err);
        }
    }

    async getSubcategories() {
        let subcategories = [];
        for (let i = 0; i < this.state.categories.length; i++) {
            for (let j = 0; j < this.state.categories[i].subcategories.length; j++) {
                subcategories.push(this.state.categories[i].subcategories[j]);
            }
        }
        this.setState({subcategories: subcategories});
    }
    render() {
        return this.state.loading == true ? (
            <Loading loading={this.state.loading} />
        ) : (
            <SearchFilter
                posts={this.state.posts}
                onSubmit={this.getSearchPosts}
                categories={this.state.categories}
                subcategories={this.state.subcategories}></SearchFilter>
        );
    }
}
