"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Components
import SearchFilter from "../components/Post/SearchAndFilter/SearchFilter";
import Notification from "../components/Notification";
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
            notify: false, // when true notification appears
            notificationMsg: undefined, // must have value when notification appears
            notificationSeverity: undefined, // values in "success", "error", "info", "warning"};
        };
        // Bind notification functions
        this.notify = this.notify.bind(this);
        this.handleNotificationClose = this.handleNotificationClose.bind(this);

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
    // Notify the user on with a msg and severity => uses the state variables
    notify(msg, notificationSeverity) {
        this.setState({notify: true, notificationMsg: msg, notificationSeverity: notificationSeverity});
    }

    // Reset notification state must bbe included in every view and passed to Notification Component
    handleNotificationClose() {
        this.setState({notify: false, notificationMsg: undefined});
    }
    // execute search query
    async getSearchPosts(body) {
        try {
            let response = await PostService.getSearchPosts(body);
            this.setState({posts: response.data.data});
        } catch (err) {
            this.notify(err, "error");
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
            this.notify(err, "error");
        }
    }

    render() {
        return (
            <React.Fragment>
                <Notification
                    notify={this.state.notify}
                    notificationMsg={this.state.notificationMsg}
                    severity={this.state.notificationSeverity}
                    handleClose={this.handleNotificationClose}
                />
                {this.state.loading == true ? (
                    <Loading loading={this.state.loading} />
                ) : (
                    <SearchFilter posts={this.state.posts} onSubmit={this.getSearchPosts} categories={this.state.categories}></SearchFilter>
                )}
            </React.Fragment>
        );
    }
}
