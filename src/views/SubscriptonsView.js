"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {withStyles} from "@material-ui/core";
// Components
import Subscriptions from "../components/Payment/Subscriptions";
// Services
import UserService from "../services/UserService";
// MISC
import {toast} from "react-toastify";

const styles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 2,
        color: "#fff",
    },
});
class SubscriptionsView extends React.Component {
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
    notify(message, type) {
        let customId;
        const options = {
            position: "bottom-right",
            toastId: customId,
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        };
        if (type == "success") {
            customId = "toast-success";
            toast.success(message, options);
        } else {
            customId = "toast-error";
            toast.error(message, options);
        }
    }
    async alterSubscription(request) {
        this.setState({loading: true});
        try {
            await UserService.changeSubscriptionTier(request);
            // this.props.history.push("/");
            this.notify("Subscription changed successfully", "success");
            this.props.history.push("/");
        } catch (err) {
            console.error(err);
            this.notify(err, "error");
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

export default withStyles(styles)(SubscriptionsView);
