"use strict";

import React from "react";
import Styled from "styled-components";
import PropTypes from "prop-types";

class PlainFooter extends React.Component {
    constructor(props) {
        super(props);
    }
    // need to defince prop type for every function
    static get propTypes() {
        return {
            className: PropTypes.string,
        };
    }

    render() {
        return (
            <div className={this.props.className}>
                <hr />
                <p>© {new Date().getFullYear()} SwitchSpace. All rights reserved.</p>
            </div>
        );
    }
}

export const Footer = Styled(PlainFooter)`
    max-height: 35px;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    background: white;
    > p {
        text-align: center;
        margin-top: 4px;
    }
`;
