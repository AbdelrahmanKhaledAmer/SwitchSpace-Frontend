"use strict";
//React
import React from "react";
import PropTypes from "prop-types";
// Components
import Loading from "../components/Loading";
import Notification from "../components/Notification";
import AdminConsole from "../components/Admin/AdminConsole";
// Services
import AdminService from "../services/AdminService";

export default class AdminView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: [],
            loading: true,
            // Loading state
            // Notification State => can be passed as Props to children components
            // send notify as a function prop with it if you want in-component notification
            notify: false, // when true notification appears
            notificationMsg: undefined, // must have value when notification appears
            notificationSeverity: undefined, // values in "success", "error", "info", "warning"};
        };
        // Bind notification functions
        this.notify = this.notify.bind(this);
        this.handleNotificationClose = this.handleNotificationClose.bind(this);

        this.deleteReport = this.deleteReport.bind(this);
        this.getReports = this.getReports.bind(this);
    }

    async componentDidMount() {
        await this.getReports();
    }

    // need to defince prop type for every function
    static get propTypes() {
        return {
            history: PropTypes.object,
        };
    }

    // view all reports
    async getReports() {
        this.setState({loading: true});
        try {
            const reports = await AdminService.getReports();
            this.setState({reports: reports.data.data});
        } catch (err) {
            this.notify(err, "error");
        }
        this.setState({loading: false});
    }
    // delete reports
    async deleteReport(id) {
        this.setState({loading: true});
        try {
            await AdminService.deleteReport(id);
        } catch (err) {
            this.notify(err, "error");
        }
        this.setState({loading: false});
        // refresh reports from thebackend
        this.getReports();
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
                <AdminConsole loading={this.state.loading} reports={this.state.reports} deleteReport={this.deleteReport}></AdminConsole>
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
