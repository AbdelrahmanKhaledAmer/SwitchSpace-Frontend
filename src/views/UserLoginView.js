"use strict";

import React from "react";

import UserLogin from "../components/UserLogin";

import UserAuthService from "../services/UserAuthService";
import PropTypes from "prop-types";
import {toast} from "react-toastify";

export default class UserLoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.notify = this.notify.bind(this);
    }
    // need to defince prop type for every function
    static get propTypes() {
        return {
            history: PropTypes.object,
        };
    }
    notify(message) {
        let customId;

        customId = "toast-error";
        toast.error(message, {
            position: "bottom-right",
            toastId: customId,
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    async login(user) {
        try {
            await UserAuthService.login(user.email, user.password);
            this.props.history.push("/");
        } catch (err) {
            console.error(err);
            this.notify(err);
            this.setState({
                error: err,
            });
        }
    }

    render() {
        return <UserLogin onSubmit={user => this.login(user)} error={this.state.error}></UserLogin>;
    }
}
