import React from "react";
import PropTypes from "prop-types";
import ReportList from "./ReportList";
import Page from "../Page";
import Card from "@material-ui/core/Card";

class AdminConsole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static get propTypes() {
        return {
            // classes: PropTypes.object.isRequired,
            reports: PropTypes.array.isRequired,
            deleteReport: PropTypes.func.isRequired,
        };
    }

    render() {
        return (
            <Page>
                <ReportList reports={this.props.reports} deleteReport={this.props.deleteReport}></ReportList>
            </Page>
        );
    }
}
export default AdminConsole;
