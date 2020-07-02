"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import Snackbar from "@material-ui/core/Snackbar";
// Material UI Lab
import Alert from "@material-ui/lab/Alert";

export default class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // need to defince prop type for every function
    static get propTypes() {
        return {
            notify: PropTypes.bool.isRequired,
            handleClose: PropTypes.func.isRequired,
            notificationMsg: PropTypes.string,
            severity: PropTypes.string,
            autoHideDuration: PropTypes.number,
        };
    }

    render() {
        return (
            <Snackbar
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                open={this.props.notify}
                onClose={this.props.handleClose}
                autoHideDuration={this.props.autoHideDuration ? this.props.autoHideDuration : 6000}>
                <Alert
                    onClose={this.props.handleClose}
                    severity={this.props.severity ? this.props.severity : "success"}
                    elevation={5}
                    variant="filled">
                    {this.props.notificationMsg ? this.props.notificationMsg : ""}
                </Alert>
            </Snackbar>
        );
    }
}
