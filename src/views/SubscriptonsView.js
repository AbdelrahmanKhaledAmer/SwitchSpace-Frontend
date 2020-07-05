"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Components
import Loading from "../components/Loading";
import Notification from "../components/Notification";
import Subscriptions from "../components/Payment/Subscriptions";
// Services
import UserService from "../services/UserService";
export default class SubscriptionsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Loading state
            loading: false, // when true => loading state
            // Notification State => can be passed as Props to children components
            // send notify as a function prop with it if you want in-component notification
            notify: false, // when true notification appears
            notificationMsg: undefined, // must have value when notification appears
            notificationSeverity: undefined, // values in "success", "error", "info", "warning"
        };
        // Bind notification functions
        this.notify = this.notify.bind(this);
        this.handleNotificationClose = this.handleNotificationClose.bind(this);
        this.alterSubscription = this.alterSubscription.bind(this);
    }

    // need to defince prop type for every prop
    static get propTypes() {
        return {
            history: PropTypes.object,
        };
    }

    // Notify the user on with a msg and severity => uses the state variables
    notify(msg, notificationSeverity) {
        this.setState({notify: true, notificationMsg: msg, notificationSeverity: notificationSeverity});
    }

    // Reset notification state must bbe included in every view and passed to Notification Component
    handleNotificationClose() {
        this.setState({notify: false, notificationMsg: undefined});
    }

    async alterSubscription(request) {
        this.setState({loading: true});
        try {
            await UserService.changeSubscriptionTier(request);
            this.notify("Subscription changed successfully", "success");
        } catch (err) {
            this.notify(err, "error");
        }
        this.setState({loading: false});
    }

    render() {
        return (
            <React.Fragment>
                <Loading loading={this.state.loading} />
                <Subscriptions onSubmit={this.alterSubscription} notify={this.notify}></Subscriptions>
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
