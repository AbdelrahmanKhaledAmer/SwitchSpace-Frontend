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
            // subcategories: [],
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
        this.setState({loading: false});
    }

    async getSearchPosts(body) {
        try {
            console.log(body);
            let response = await PostService.getSearchPosts(body);
            console.log(response.data.data);
            this.setState({posts: response.data.data});
        } catch (err) {
            console.log(err);
        }
    }
    // get all categories and sub categories with there mapping in search
    async getCategories() {
        try {
            let response = await CategoryService.getCategories();
            // get subcategories and push any in each of them
            let categories = response.data.data;
            let subcategories = [];
            for (let i = 0; i < categories.length; i++) {
                // only get title and value
                let current = categories[i].subcategories;
                current = current.map(subCategory => ({
                    title: subCategory.title,
                    value: subCategory.title,
                }));
                // append to all sub categories list
                subcategories = subcategories.concat(current);
                // push any to each of the categories
                current.push({title: "Any", value: ""});
                // update my categories
                categories[i].subcategories = current;
            }
            // add Any to my list of all sub categories
            subcategories.push({title: "Any", value: ""});
            /// get values of categories
            categories = categories.map(category => ({
                title: category.title,
                value: category.title,
                subcategories: category.subcategories,
            }));
            categories.push({title: "Any", value: "", subcategories: subcategories});
            this.setState({categories: categories});
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return this.state.loading == true ? (
            <Loading loading={this.state.loading} />
        ) : (
            <SearchFilter posts={this.state.posts} onSubmit={this.getSearchPosts} categories={this.state.categories}></SearchFilter>
        );
    }
}
