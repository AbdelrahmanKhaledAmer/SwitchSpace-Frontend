"use strict";

import React from "react";
import PropTypes from "prop-types";
import Page from "./Page";
import UserInfo from "./UserInfo";

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            userInfo: PropTypes.object.isRequired,
        };
    }

    render() {
        return (
            <Page>
                <UserInfo userInfo={this.props.userInfo} />
            </Page>
            // TODO: add create review button
            // TODO: add posts and reviews tabs/buttons
            // TODO: show list of posts or reviews based on the tab/button selected
        );
    }
}

export default UserProfile;
