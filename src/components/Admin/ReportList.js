"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import Typography from "@material-ui/core/Typography";
// Components
import ReportListItem from "./ReportListItem";

class ReportList extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            reports: PropTypes.array.isRequired,
            deleteReport: PropTypes.func.isRequired,
            msgForNoPosts: PropTypes.string.isRequired,
        };
    }

    render() {
        if (this.props.reports.length == 0) {
            return (
                <Typography variant="h5" align="center" color="inherit">
                    {this.props.msgForNoPosts}
                </Typography>
            );
        }

        return this.props.reports.map(report => <ReportListItem key={report._id} report={report} deleteReport={this.props.deleteReport} />);
        // return this.props.reports.map(report => <ReportListItem key={report._id} report={report} deleteReport={this.props.deleteReport} />);
    }
}

export default ReportList;
