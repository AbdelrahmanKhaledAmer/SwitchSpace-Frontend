"use strict";

import React from "react";

import Subscriptions from "../components/Subscriptions";

import UserService from "../services/UserService";
import PropTypes from "prop-types";
import {toast} from "react-toastify";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 2,
        color: "#fff",
    },
});
class PaymentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.notify = this.notify.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
    }
    // need to defince prop type for every function
    static get propTypes() {
        return {
            history: PropTypes.object,
            classes: PropTypes.object.isRequired,
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
    async alterSubscription(request) {
        this.setState({loading: true});
        try {
            await UserService.changeSubscriptionTier(request);
            // this.props.history.push("/");
        } catch (err) {
            console.error(err);
            this.notify(err);
            this.setState({
                error: err,
            });
        }
        this.setState({loading: false});
    }

    renderLoading() {
        const {classes} = this.props;
        return (
            <Backdrop className={classes.backdrop} open={this.state.loading}>
                <CircularProgress color="primary" />
            </Backdrop>
        );
    }
    render() {
        // return <Payment onSubmit={user => this.alterSubscription(user)} error={this.state.error}></Payment>;
        return (
            <div>
                {this.state.loading ? this.renderLoading() : null}
                <Subscriptions onSubmit={user => this.alterSubscription(user)} error={this.state.error}></Subscriptions>
            </div>
        );
    }
}

export default withStyles(styles)(PaymentView);
