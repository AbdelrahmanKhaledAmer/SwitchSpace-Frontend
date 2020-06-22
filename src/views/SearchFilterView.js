"use strict";

import React from "react";
import SearchFilter from "../components/SearchFilter";
import PropTypes from "prop-types";

export class SearchFilterView extends React.Component {
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
        return <SearchFilter></SearchFilter>;
    }
}
