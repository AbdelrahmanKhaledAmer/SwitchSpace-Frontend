"use strict";

import React from "react";
import {withStyles} from "@material-ui/core/styles";

import PropTypes from "prop-types";
// import Grid from "@material-ui/core/Grid";
import CheckoutForm from "./CheckoutForm";
// import CardSection from "./CardSection";
import {loadStripe} from "@stripe/stripe-js";
import {Elements, ElementsConsumer} from "@stripe/react-stripe-js";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Zoom from "@material-ui/core/Zoom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
// set card options
const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#659dbd",
    },

    centerFold: {
        textAlign: "center",
    },
});

class Payment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.submitHandler = this.submitHandler.bind(this);
    }

    async submitHandler(tokenID) {
        const request = {
            stripeToken: tokenID,
            tier: this.props.tier.name,
        };
        console.log(request);
        // submit from the view
        this.props.onSubmit(request);
        event.preventDefault();
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            onSubmit: PropTypes.func.isRequired,
            tier: PropTypes.object.isRequired,
            modalOpen: PropTypes.bool.isRequired,
            onClose: PropTypes.func.isRequired,
        };
    }

    render() {
        return (
            <Dialog
                aria-labelledby="form-dialog-title"
                open={this.props.modalOpen}
                onClose={() => this.props.onClose()}
                TransitionComponent={Zoom}
                transitionDuration={500}>
                <DialogTitle id="form-dialog-title">
                    {"Change tiers to "}
                    {this.props.tier.name}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>To renew or change your subscription please enter the credit card information below</DialogContentText>

                    <Elements stripe={stripePromise}>
                        <ElementsConsumer>
                            {({stripe, elements}) => (
                                <CheckoutForm price={this.props.tier.price} onSubmit={this.submitHandler} stripe={stripe} elements={elements} />
                            )}
                        </ElementsConsumer>
                    </Elements>
                </DialogContent>
            </Dialog>
        );
    }
}

export default withStyles(styles)(Payment);