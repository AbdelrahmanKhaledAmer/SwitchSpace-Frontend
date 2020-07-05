"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Components
import Loading from "../components/Loading";
import Notification from "../components/Notification";
import UserSignup from "../components/UserAuth/UserSignup";
// Services
import UserAuthService from "../services/UserAuthService";

export default class UserSignupView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Loading state
            loading: false, // when true => loading state
            // Notification State => can be passed as Props to children components
            // send notify as a function prop with it if you want in-component notification
            notify: false, // when true notification appears
            notificationMsg: undefined, // must have value when notification appears
            notificationSeverity: undefined, // values in "success", "error", "info", "warning"};
        };
        // Bind notification functions
        this.notify = this.notify.bind(this);
        this.handleNotificationClose = this.handleNotificationClose.bind(this);
    }

    // need to defince prop type for every function
    static get propTypes() {
        return {
            history: PropTypes.object,
        };
    }

    async signup(user) {
        this.setState({loading: true});

        const data = new FormData();
        for (let key in user) {
            data.append(key, user[key]);
        }
        try {
            await UserAuthService.register(data);
            //TODO: email verification
            this.props.history.push("/");
        } catch (err) {
            this.notify(err, "error");
        }
        this.setState({loading: false});
    }

    // Notify the user on with a msg and severity => uses the state variables
    notify(msg, notificationSeverity) {
        this.setState({notify: true, notificationMsg: msg, notificationSeverity: notificationSeverity});
    }

    // Reset notification state must bbe included in every view and passed to Notification Component
    handleNotificationClose() {
        this.setState({notify: false, notificationMsg: undefined});
    }

    render() {
        return (
            <React.Fragment>
                <Loading loading={this.state.loading} />
                <UserSignup onSubmit={user => this.signup(user)}></UserSignup>
                <Notification
                    notify={this.state.notify}
                    notificationMsg={this.state.notificationMsg}
                    severity={this.state.notificationSeverity}
                    handleClose={this.handleNotificationClose}
                />
            </React.Fragment>
        );
    }
}
