"use strict";

import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
// import Grid from "@material-ui/core/Grid";
import ReportListItem from "./ReportListItem";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    scrollableCard: {
        marginTop: theme.spacing(10),
        maxHeight: "90vh",
        overflowY: "scroll",
        backgroundColor: "transparent",
    },
});

class ReportList extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            reports: PropTypes.array.isRequired,
            classes: PropTypes.object.isRequired,
            deleteReport: PropTypes.func.isRequired,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <Card elevation={5} className={classes.scrollableCard}>
                {this.props.reports.map(report => (
                    <ReportListItem key={report._id} report={report} deleteReport={this.props.deleteReport} />
                ))}
            </Card>
        );
    }
}
export default withStyles(styles)(ReportList);
