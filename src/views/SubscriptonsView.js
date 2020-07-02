"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Components
import Loading from "../components/Loading";
import Subscriptions from "../components/Payment/Subscriptions";
// Services
import UserService from "../services/UserService";
// MISC
// import {toast} from "react-toastify";

class SubscriptionsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        // this.notify = this.notify.bind(this);
    }
    // need to defince prop type for every function
    static get propTypes() {
        return {
            history: PropTypes.object,
            // classes: PropTypes.object.isRequired,
        };
    }
    // notify(message, type) {
    //     let customId;
    //     const options = {
    //         position: "bottom-right",
    //         toastId: customId,
    //         autoClose: 5000,
    //         hideProgressBar: true,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //     };
    //     if (type == "success") {
    //         customId = "toast-success";
    //         toast.success(message, options);
    //     } else {
    //         customId = "toast-error";
    //         toast.error(message, options);
    //     }
    // }
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
        // this.setState({loading: false});
    }

    render() {
        // return <Payment onSubmit={user => this.alterSubscription(user)} error={this.state.error}></Payment>;
        return (
            <div>
                <Loading loading={this.state.loading} />
                <Subscriptions onSubmit={user => this.alterSubscription(user)} error={this.state.error}></Subscriptions>
            </div>
        );
    }
}

export default SubscriptionsView;
