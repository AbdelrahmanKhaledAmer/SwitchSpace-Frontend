"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Components
import UserLogin from "../components/UserAuth/UserLogin";
// Services
import AdminAuthService from "../services/AdminAuthService";
// MISC
import {toast} from "react-toastify";

export default class AdminLoginView extends React.Component {
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
    async login(admin) {
        try {
            await AdminAuthService.login(admin);
            // TODO:this.props.history.push("/");
            console.log("logged in succesfully");
        } catch (err) {
            console.error(err);
            this.notify(err);
            this.setState({
                error: err,
            });
        }
    }

    render() {
        return <UserLogin onSubmit={user => this.login(user)} isAdmin={true} error={this.state.error}></UserLogin>;
    }
}
