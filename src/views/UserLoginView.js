"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Components
import UserLogin from "../components/UserAuth/UserLogin";
// Services
import UserAuthService from "../services/UserAuthService";
export default class UserLoginView extends React.Component {
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
    async login(user) {
        try {
            await UserAuthService.login(user.email, user.password);
            this.props.history.push("/");
        } catch (err) {
            console.error(err);
            this.setState({
                error: err,
            });
        }
    }

    render() {
        return <UserLogin onSubmit={user => this.login(user)} error={this.state.error}></UserLogin>;
    }
}
