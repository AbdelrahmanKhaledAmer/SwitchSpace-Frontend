"use strict";
//React
import React from "react";
import PropTypes from "prop-types";
// Components
import AdminConsole from "../components/Admin/AdminConsole";
// Services
import AdminService from "../services/AdminService";

export default class AdminView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: [],
            loading: true,
        };
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
            console.error(err);
        }
        this.setState({loading: false});
    }
    // delete reports
    async deleteReport(id) {
        this.setState({loading: true});
        try {
            await AdminService.deleteReport(id);
        } catch (err) {
            console.error(err);
        }
        this.setState({loading: false});
        // refresh reports from thebackend
        this.getReports();
    }

    // async deletePost(id) {
    //     try {
    //         await AdminService.deletePost(id);
    //     } catch (err) {
    //         console.error(err);
    //         this.setState({
    //             error: err,
    //         });
    //     }
    // }

    render() {
        return <AdminConsole loading={this.state.loading} reports={this.state.reports} deleteReport={this.deleteReport}></AdminConsole>;
    }
}
