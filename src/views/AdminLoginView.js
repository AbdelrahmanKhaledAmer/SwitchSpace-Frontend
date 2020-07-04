"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Components
import UserLogin from "../components/UserAuth/UserLogin";
// Services
import AdminAuthService from "../services/AdminAuthService";

export default class AdminLoginView extends React.Component {
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

    async login(admin) {
        try {
            await AdminAuthService.login(admin);
            // TODO:this.props.history.push("/");
            console.log("logged in succesfully");
        } catch (err) {
            console.error(err);
            this.setState({
                error: err,
            });
        }
    }

    render() {
        return <UserLogin onSubmit={user => this.login(user)} isAdmin={true} error={this.state.error}></UserLogin>;
    }
}
