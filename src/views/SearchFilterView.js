"use strict";

import React from "react";
import SearchFilter from "../components/SearchFilter";
import PropTypes from "prop-types";
import PostService from "../services/PostService";
export default class SearchFilterView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
        this.getSearchPosts = this.getSearchPosts.bind(this);
    }
    // need to defince prop type for every function
    static get propTypes() {
        return {
            history: PropTypes.object,
        };
    }

    async getSearchPosts(itemWanted, itemOwned, wantedCategory, wantedCondition, ownedCategory, ownedCondition, lon, lat, raduis) {
        try {
            let response = await PostService.getSearchPosts(
                itemWanted,
                itemOwned,
                wantedCategory,
                wantedCondition,
                ownedCategory,
                ownedCondition,
                lon,
                lat,
                raduis
            );
            this.setState({posts: response.data.data});
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return <SearchFilter posts={this.state.posts} onSubmit={this.getSearchPosts}></SearchFilter>;
    }
}
