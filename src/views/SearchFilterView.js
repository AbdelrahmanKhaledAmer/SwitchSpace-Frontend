"use strict";

import React from "react";
import SearchFiler from "../components/SearchFilter";
import PropTypes from "prop-types";

export class SearchFilerView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // need to defince prop type for every function
    static get propTypes() {
        return {
            history: PropTypes.object,
        };
    }

    render() {
        return <SearchFiler></SearchFiler>;
    }
}
