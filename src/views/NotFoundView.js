"use strict";
// React
import React from "react";

// component
import NotFound404 from "../components/NotFound404";
export default class NotFoundView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <NotFound404 />;
    }
}
