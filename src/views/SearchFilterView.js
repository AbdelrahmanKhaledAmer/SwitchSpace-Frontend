"use strict";

import React from "react";
import SearchFilter from "../components/SearchFilter";
import PropTypes from "prop-types";

export default class SearchFilterView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.search = this.search.bind(this);
    }
    // need to defince prop type for every function
    static get propTypes() {
        return {
            history: PropTypes.object,
        };
    }
    search() {
        console.log("search query submitted");
    }

    render() {
        return <SearchFilter onSubmit={this.search}></SearchFilter>;
    }
}
