"use strict";

import React from "react";

import AdminConsole from "../components/Admin/AdminConsole";

import AdminService from "../services/AdminService";
import PropTypes from "prop-types";
import {toast} from "react-toastify";

export default class AdminView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: [],
        };
        this.notify = this.notify.bind(this);
    }

    async componentDidMount() {
        await this.getReports();
        // this.setState({reports: reports});
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
    async getReports() {
        try {
            const reports = await AdminService.getReports();
            console.log(reports);
            this.setState({reports: reports.data.data});
        } catch (err) {
            console.error(err);
            this.notify(err);
            this.setState({
                error: err,
            });
        }
    }
    async deleteReport(id) {
        console.log("hey");
        console.log(id);
        try {
            await AdminService.deleteReport(id);
            console.log("allGood");
        } catch (err) {
            console.error(err);
            this.notify(err);
            this.setState({
                error: err,
            });
        }
    }

    async deletePost(id) {
        try {
            await AdminService.deletePost(id);
        } catch (err) {
            console.error(err);
            this.notify(err);
            this.setState({
                error: err,
            });
        }
    }

    render() {
        return <AdminConsole reports={this.state.reports} deleteReport={this.deleteReport}></AdminConsole>;
    }
}
