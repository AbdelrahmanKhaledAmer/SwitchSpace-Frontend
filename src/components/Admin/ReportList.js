"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import {withStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
// Components
import ReportListItem from "./ReportListItem";

const styles = {
    scrollableCard: {
        // marginTop: theme.spacing(10),
        // maxHeight: "90vh",
        // overflowY: "scroll",
        backgroundColor: "transparent",
    },
};

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
            <List className={classes.scrollableCard}>
                {this.props.reports.map(report => (
                    <ReportListItem key={report._id} report={report} deleteReport={this.props.deleteReport} />
                ))}
            </List>
        );
    }
}
export default withStyles(styles)(ReportList);
