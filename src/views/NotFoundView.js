"use strict";
// React
import React from "react";
import PropTypes from "prop-types";

// component
import NotFound404 from "../components/NotFound404";

export default class NotFoundView extends React.Component {
    constructor(props) {
        super(props);
    }
    static get propTypes() {
        return {
            history: PropTypes.object,
        };
    }

    render() {
        return <NotFound404 />;
    }
}
