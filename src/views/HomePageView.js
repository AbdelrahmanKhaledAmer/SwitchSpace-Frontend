"use strict";
//React
import React from "react";
import PropTypes from "prop-types";
// Components
import HomePage from "../components/HomePage";
import Loading from "../components/Loading";
import Notification from "../components/Notification";
// Services
import CategoryService from "../services/CategoryService";

export default class HomePageView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            loading: true,
            notify: false,
            notificationMsg: undefined,
            notificationSeverity: undefined,
        };

        this.handleNotificationClose = this.handleNotificationClose.bind(this);
        this.notify = this.notify.bind(this);
    }

    static get propTypes() {
        return {
            history: PropTypes.object,
        };
    }

    async componentDidMount() {
        try {
            let response = await CategoryService.getCategories();
            this.setState({
                loading: false,
                categories: response.data.data,
            });
        } catch (err) {
            this.notify(err, "error");
        }
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
                <HomePage categories={this.state.categories} />
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
