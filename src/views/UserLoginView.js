"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Components
import Loading from "../components/Loading";
import Notification from "../components/Notification";
import UserLogin from "../components/UserAuth/UserLogin";
// Services
import UserAuthService from "../services/UserAuthService";
export default class UserLoginView extends React.Component {
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
    async login(user) {
        this.setState({loading: true});
        console.log("trying");
        try {
            await UserAuthService.login(user.email, user.password);
            const cb = () =>
                setTimeout(() => {
                    this.setState({loading: false});
                    this.props.history.push("/");
                }, 3000); //time must be higher than notification time
            this.notify("login successful", "success", cb);
        } catch (err) {
            console.error(err);
            this.notify(err, "error");
            this.setState({loading: false});
        }
    }

    // Notify the user on with a msg and severity => uses the state variables
    notify(msg, notificationSeverity, callback) {
        this.setState({notify: true, notificationMsg: msg, notificationSeverity: notificationSeverity}, callback);
    }

    // Reset notification state must bbe included in every view and passed to Notification Component
    handleNotificationClose() {
        this.setState({notify: false, notificationMsg: undefined});
    }

    render() {
        return (
            <React.Fragment>
                <Loading loading={this.state.loading} />
                <UserLogin onSubmit={user => this.login(user)}></UserLogin>
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
